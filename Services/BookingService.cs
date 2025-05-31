using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VenueBookingApi.Api.Data;
using VenueBookingApi.Api.Entities;
using VenueBookingApi.Api.Models;
using VenueBookingApi.Api.Repositories;

namespace VenueBookingApi.Api.Services
{
    public class BookingService : IBookingService
    {
        private readonly IGenericRepository<BookingRequest> _bookingRepository;
        private readonly IGenericRepository<Venue> _venueRepository;
        private readonly IGenericRepository<VenueAvailability> _venueAvailabilityRepository;
        private readonly ApplicationDbContext _context;
        private readonly INotificationService _notificationService;

        public BookingService(
            IGenericRepository<BookingRequest> bookingRepository,
            IGenericRepository<Venue> venueRepository,
            IGenericRepository<VenueAvailability> venueAvailabilityRepository,
            ApplicationDbContext context,
            INotificationService notificationService)
        {
            _bookingRepository = bookingRepository;
            _venueRepository = venueRepository;
            _venueAvailabilityRepository = venueAvailabilityRepository;
            _context = context;
            _notificationService = notificationService;
        }

        public async Task<BookingRequest?> CreateBookingAsync(BookingRequest bookingRequest, string userId)
        {
            var venue = await _venueRepository.GetByIdAsync(bookingRequest.VenueId);
            if (venue == null || venue.Status != "Approved")
            {
                return null;
            }

            if (venue.Capacity.HasValue && bookingRequest.GuestCount > venue.Capacity.Value)
            {
                return null;
            }

            bool isAvailable = await CheckVenueAvailability(venue, bookingRequest);
            if (!isAvailable)
            {
                return null;
            }

            bookingRequest.UserId = userId;
            bookingRequest.Status = "Pending";
            bookingRequest.CreatedAt = DateTime.UtcNow;
            bookingRequest.UpdatedAt = DateTime.UtcNow;

            await _bookingRepository.AddAsync(bookingRequest);
            await _bookingRepository.SaveChangesAsync();

            await _notificationService.CreateNotificationAsync(
                venue.OwnerId,
                "new-request",
                $"New booking request for {venue.Title}",
                false,
                new Dictionary<string, object>
                {
                    { "venueId", venue.Id.ToString() },
                    { "requestId", bookingRequest.Id.ToString() },
                    { "status", "pending" },
                    { "price", bookingRequest.CalculatedTotalPrice }
                });

            return bookingRequest;
        }

        private async Task<bool> CheckVenueAvailability(Venue venue, BookingRequest bookingRequest)
        {
            if (venue.Type == "wedding-hall")
            {
                return await CheckWeddingHallAvailability(venue, bookingRequest);
            }
            else
            {
                return await CheckChaletAvailability(venue, bookingRequest);
            }
        }

        private async Task<bool> CheckWeddingHallAvailability(Venue venue, BookingRequest bookingRequest)
        {
            var bookingDate = bookingRequest.StartDate.Date;

            var unavailableDates = await _context.VenueUnavailableDates
                .Where(ud => ud.VenueId == venue.Id && ud.Date == DateOnly.FromDateTime(bookingDate))
                .ToListAsync();

            if (unavailableDates.Any())
            {
                return false;
            }

            var startTime = bookingRequest.StartDate;
            var endTime = bookingRequest.EndDate;

            var dateAvailability = await _context.VenueAvailabilities
                .FirstOrDefaultAsync(va => va.VenueId == venue.Id && va.Date == DateOnly.FromDateTime(bookingDate));

            if (dateAvailability != null && dateAvailability.FullyBooked)
            {
                return false;
            }

            if (dateAvailability != null)
            {
                foreach (var slot in dateAvailability.TimeSlots)
                {
                    var unavailableStart = slot.StartTime;
                    var unavailableEnd = slot.EndTime;
                    if (startTime.TimeOfDay < unavailableEnd && endTime.TimeOfDay > unavailableStart)
                    {
                        return false;
                    }
                }
            }

            return true;
        }

        private async Task<bool> CheckChaletAvailability(Venue venue, BookingRequest bookingRequest)
        {
            var startDate = bookingRequest.StartDate.Date;
            var endDate = bookingRequest.EndDate.Date;

            string? duration = bookingRequest.DurationDescription;
            for (var date = startDate; date <= endDate; date = date.AddDays(1))
            {
                var unavailableDate = await _context.VenueUnavailableDates
                    .FirstOrDefaultAsync(ud => ud.VenueId == venue.Id && ud.Date == DateOnly.FromDateTime(date));

                if (unavailableDate != null)
                {
                    return false;
                }

                var dateAvailability = await _context.VenueAvailabilities
                    .FirstOrDefaultAsync(va => va.VenueId == venue.Id && va.Date == DateOnly.FromDateTime(date));

                if (dateAvailability != null)
                {
                    if (duration == "24" && dateAvailability.FullyBooked)
                    {
                        return false;
                    }

                    if (duration == "12" || duration == "12-morning" || duration == "12-evening")
                    {
                        bool isMorningBooking = duration == "12-morning" || (bookingRequest.StartDate.Hour < 12);
                        if (isMorningBooking && dateAvailability.AmBooked)
                        {
                            return false;
                        }
                        if (!isMorningBooking && dateAvailability.PmBooked)
                        {
                            return false;
                        }
                    }
                }
            }

            return true;
        }

        public async Task<BookingRequest?> GetBookingByIdAsync(Guid bookingId, string userId)
        {
            var booking = await _context.BookingRequests
                                        .Include(b => b.Venue)
                                        .FirstOrDefaultAsync(b => b.Id == bookingId);

            if (booking == null) return null;
            if (booking.UserId == userId || booking.Venue.OwnerId == userId)
            {
                return booking;
            }

            var user = await _context.Users.FindAsync(userId);
            if (user != null && await _context.UserRoles.AnyAsync(ur => ur.UserId == userId && ur.RoleId == "Admin"))
            {
                return booking;
            }

            return null;
        }

        public async Task<IEnumerable<BookingRequest>> GetBookingsByUserIdAsync(string userId)
        {
            return await _context.BookingRequests
                                 .Where(b => b.UserId == userId)
                                 .Include(b => b.Venue)
                                 .OrderByDescending(b => b.CreatedAt)
                                 .ToListAsync();
        }

        public async Task<IEnumerable<BookingRequest>> GetBookingsByVenueIdAsync(Guid venueId, string ownerId)
        {
            var venue = await _venueRepository.GetByIdAsync(venueId);
            var isAdmin = await _context.UserRoles.AnyAsync(ur => ur.UserId == ownerId && ur.RoleId == "Admin");

            if (venue == null || (venue.OwnerId != ownerId && !isAdmin))
            {
                throw new UnauthorizedAccessException("You are not authorized to view these bookings");
            }

            return await _context.BookingRequests
                                 .Where(b => b.VenueId == venueId)
                                 .Include(b => b.User)
                                 .OrderByDescending(b => b.CreatedAt)
                                 .ToListAsync();
        }

        public async Task<BookingRequest?> UpdateBookingStatusAsync(Guid bookingId, string newStatus, string userId, bool isAdminOrOwner)
        {
            var booking = await _bookingRepository.GetByIdAsync(bookingId);
            if (booking == null) return null;

            if (!isAdminOrOwner && booking.UserId != userId && newStatus != "Cancelled")
            {
                return null;
            }

            booking.Status = newStatus;
            booking.UpdatedAt = DateTime.UtcNow;
            _bookingRepository.Update(booking);
            await _bookingRepository.SaveChangesAsync();

            if (newStatus == "Accepted")
            {
                await _notificationService.CreateNotificationAsync(
                    booking.UserId,
                    "request-accepted",
                    $"Your booking request has been accepted!",
                    false,
                    new Dictionary<string, object>
                    {
                        { "requestId", booking.Id.ToString() },
                        { "venueId", booking.VenueId.ToString() }
                    });
            }
            else if (newStatus == "Denied")
            {
                await _notificationService.CreateNotificationAsync(
                    booking.UserId,
                    "request-denied",
                    $"Your booking request has been denied.",
                    false,
                    new Dictionary<string, object>
                    {
                        { "requestId", booking.Id.ToString() },
                        { "venueId", booking.VenueId.ToString() }
                    });
            }
            else if (newStatus == "Cancelled")
            {
                var venue = await _venueRepository.GetByIdAsync(booking.VenueId);
                if (venue != null)
                {
                    await _notificationService.CreateNotificationAsync(
                        venue.OwnerId,
                        "request-cancelled",
                        $"A booking for {venue.Title} has been cancelled.",
                        false,
                        new Dictionary<string, object>
                        {
                            { "requestId", booking.Id.ToString() },
                            { "venueId", booking.VenueId.ToString() }
                        });
                }
            }

            return booking;
        }

        public async Task<bool> ConfirmBookingPaymentAsync(Guid bookingId, string transactionId, decimal paidAmount)
        {
            var booking = await _bookingRepository.GetByIdAsync(bookingId);
            if (booking == null || booking.Status != "Accepted")
            {
                return false;
            }

            booking.PaymentTransactionId = transactionId;
            booking.PaidAmount = paidAmount;
            booking.Status = "Confirmed";
            booking.UpdatedAt = DateTime.UtcNow;
            _bookingRepository.Update(booking);
            await _bookingRepository.SaveChangesAsync();

            await _notificationService.CreateNotificationAsync(
                booking.UserId,
                "payment-confirmed",
                $"Your payment for booking has been confirmed.",
                false,
                new Dictionary<string, object>
                {
                    { "requestId", booking.Id.ToString() },
                    { "venueId", booking.VenueId.ToString() },
                    { "amount", paidAmount.ToString() }
                });

            return true;
        }

        public async Task<IEnumerable<BookingRequest>> GetRequestsForVenueOwnerAsync(Guid venueId, string ownerId)
        {
            var venue = await _context.Venues.FindAsync(venueId);
            var isAdmin = await _context.UserRoles.AnyAsync(ur => ur.UserId == ownerId && ur.RoleId == "Admin");

            if (venue == null || (venue.OwnerId != ownerId && !isAdmin))
            {
                throw new UnauthorizedAccessException("You are not authorized to view these requests");
            }

            return await _context.BookingRequests
                .Where(br => br.VenueId == venueId)
                .Include(br => br.User)
                .OrderByDescending(br => br.CreatedAt)
                .ToListAsync();
        }

        public async Task<BookingRequest?> AcceptBookingRequestAsync(Guid bookingId, string ownerId)
        {
            var bookingRequest = await _context.BookingRequests
                .Include(br => br.Venue)
                .FirstOrDefaultAsync(br => br.Id == bookingId);

            var isAdmin = await _context.UserRoles.AnyAsync(ur => ur.UserId == ownerId && ur.RoleId == "Admin");

            if (bookingRequest == null || (bookingRequest.Venue.OwnerId != ownerId && !isAdmin) || bookingRequest.Status != "Pending")
            {
                return null;
            }

            bookingRequest.Status = "Accepted";
            bookingRequest.UpdatedAt = DateTime.UtcNow;
            await _bookingRepository.SaveChangesAsync();

            await UpdateVenueAvailabilityForAcceptedBooking(bookingRequest);

            await _notificationService.CreateNotificationAsync(
                bookingRequest.UserId,
                "request-accepted",
                $"Your booking request has been accepted!",
                false,
                new Dictionary<string, object>
                {
                    { "requestId", bookingRequest.Id.ToString() },
                    { "venueId", bookingRequest.VenueId.ToString() }
                });

            return bookingRequest;
        }

        private async Task UpdateVenueAvailabilityForAcceptedBooking(BookingRequest booking)
        {
            var venue = await _venueRepository.GetByIdAsync(booking.VenueId);
            if (venue == null) return;

            if (venue.Type == "wedding-hall")
            {
                await UpdateWeddingHallAvailability(venue, booking);
            }
            else
            {
                await UpdateChaletAvailability(venue, booking);
            }
        }

        private async Task UpdateWeddingHallAvailability(Venue venue, BookingRequest booking)
        {
            var bookingDate = booking.StartDate.Date;
            var dateString = bookingDate.ToString("yyyy-MM-dd");

            var dateAvailability = await _context.VenueAvailabilities
                .FirstOrDefaultAsync(va => va.VenueId == venue.Id && va.Date == DateOnly.FromDateTime(bookingDate));

            if (dateAvailability == null)
            {
                dateAvailability = new VenueAvailability
                {
                    VenueId = venue.Id,
                    Date = DateOnly.FromDateTime(bookingDate),
                    FullyBooked = false
                };
                _context.VenueAvailabilities.Add(dateAvailability);
            }

            dateAvailability.TimeSlots.Add(new VenueAvailabilityTimeSlot
            {
                StartTime = booking.StartDate.TimeOfDay,
                EndTime = booking.EndDate.TimeOfDay
            });

            var globalTimeSlots = await _context.VenueGlobalTimeSlots
                .Where(ts => ts.VenueId == venue.Id)
                .ToListAsync();

            if (globalTimeSlots.Any())
            {
                bool allSlotsBooked = true;
                foreach (var slot in globalTimeSlots)
                {
                    bool slotBooked = dateAvailability.TimeSlots.Any(ut =>
                        ut.StartTime <= slot.StartTime && ut.EndTime >= slot.EndTime);

                    if (!slotBooked)
                    {
                        allSlotsBooked = false;
                        break;
                    }
                }

                if (allSlotsBooked)
                {
                    dateAvailability.FullyBooked = true;

                    var unavailableDate = await _context.VenueUnavailableDates
                        .FirstOrDefaultAsync(ud => ud.VenueId == venue.Id && ud.Date == DateOnly.FromDateTime(bookingDate));

                    if (unavailableDate == null)
                    {
                        _context.VenueUnavailableDates.Add(new VenueUnavailableDate
                        {
                            VenueId = venue.Id,
                            Date = DateOnly.FromDateTime(bookingDate),
                            Reason = "Fully booked"
                        });
                    }
                }
            }

            await _context.SaveChangesAsync();
        }

        private async Task UpdateChaletAvailability(Venue venue, BookingRequest booking)
        {
            var startDate = booking.StartDate.Date;
            var endDate = booking.EndDate.Date;

            string standardizedDuration = booking.DurationDescription ?? "24";
            if (string.IsNullOrEmpty(standardizedDuration))
            {
                if ((endDate - startDate).TotalDays > 0)
                {
                    standardizedDuration = "multiple";
                }
                else
                {
                    standardizedDuration = "24";
                }
            }

            bool is24HourBooking = standardizedDuration == "24";
            bool is12HourBooking = standardizedDuration == "12" ||
                                      standardizedDuration == "12-morning" ||
                                      standardizedDuration == "12-evening";

            bool isMorningBooking = standardizedDuration == "12-morning" ||
                                      (is12HourBooking && booking.StartDate.Hour < 12);
            bool isEveningBooking = standardizedDuration == "12-evening" ||
                                      (is12HourBooking && booking.StartDate.Hour >= 12);

            if (standardizedDuration == "multiple" || is24HourBooking)
            {
                for (var date = startDate; date <= endDate; date = date.AddDays(1))
                {
                    var unavailableDate = await _context.VenueUnavailableDates
                        .FirstOrDefaultAsync(ud => ud.VenueId == venue.Id && ud.Date == DateOnly.FromDateTime(date));

                    if (unavailableDate == null)
                    {
                        _context.VenueUnavailableDates.Add(new VenueUnavailableDate
                        {
                            VenueId = venue.Id,
                            Date = DateOnly.FromDateTime(date),
                            Reason = "Booked"
                        });
                    }

                    var dateAvailability = await _context.VenueAvailabilities
                        .FirstOrDefaultAsync(va => va.VenueId == venue.Id && va.Date == DateOnly.FromDateTime(date));

                    if (dateAvailability == null)
                    {
                        dateAvailability = new VenueAvailability
                        {
                            VenueId = venue.Id,
                            Date = DateOnly.FromDateTime(date),
                            FullyBooked = true,
                            AmBooked = true,
                            PmBooked = true
                        };
                        _context.VenueAvailabilities.Add(dateAvailability);
                    }
                    else
                    {
                        dateAvailability.FullyBooked = true;
                        dateAvailability.AmBooked = true;
                        dateAvailability.PmBooked = true;
                    }

                    dateAvailability.TimeSlots.Add(new VenueAvailabilityTimeSlot
                    {
                        StartTime = booking.StartDate.TimeOfDay,
                        EndTime = booking.EndDate.TimeOfDay
                    });
                }
            }
            else if (is12HourBooking)
            {
                var dateAvailability = await _context.VenueAvailabilities
                    .FirstOrDefaultAsync(va => va.VenueId == venue.Id && va.Date == DateOnly.FromDateTime(startDate));

                if (dateAvailability == null)
                {
                    dateAvailability = new VenueAvailability
                    {
                        VenueId = venue.Id,
                        Date = DateOnly.FromDateTime(startDate),
                        FullyBooked = false,
                        AmBooked = false,
                        PmBooked = false
                    };
                    _context.VenueAvailabilities.Add(dateAvailability);
                }

                dateAvailability.TimeSlots.Add(new VenueAvailabilityTimeSlot
                {
                    StartTime = booking.StartDate.TimeOfDay,
                    EndTime = booking.EndDate.TimeOfDay
                });

                if (isMorningBooking)
                {
                    dateAvailability.AmBooked = true;
                }
                else if (isEveningBooking)
                {
                    dateAvailability.PmBooked = true;
                }

                if (dateAvailability.AmBooked && dateAvailability.PmBooked)
                {
                    dateAvailability.FullyBooked = true;

                    var unavailableDate = await _context.VenueUnavailableDates
                        .FirstOrDefaultAsync(ud => ud.VenueId == venue.Id && ud.Date == DateOnly.FromDateTime(startDate));

                    if (unavailableDate == null)
                    {
                        _context.VenueUnavailableDates.Add(new VenueUnavailableDate
                        {
                            VenueId = venue.Id,
                            Date = DateOnly.FromDateTime(startDate),
                            Reason = "Fully booked"
                        });
                    }
                }
            }

            await _context.SaveChangesAsync();
        }

        public async Task<BookingRequest?> DenyBookingRequestAsync(Guid bookingId, string ownerId)
        {
            var bookingRequest = await _context.BookingRequests
                .Include(br => br.Venue)
                .FirstOrDefaultAsync(br => br.Id == bookingId);

            var isAdmin = await _context.UserRoles.AnyAsync(ur => ur.UserId == ownerId && ur.RoleId == "Admin");

            if (bookingRequest == null || (bookingRequest.Venue.OwnerId != ownerId && !isAdmin) || bookingRequest.Status != "Pending")
            {
                return null;
            }

            bookingRequest.Status = "Denied";
            bookingRequest.UpdatedAt = DateTime.UtcNow;
            await _bookingRepository.SaveChangesAsync();

            await _notificationService.CreateNotificationAsync(
                bookingRequest.UserId,
                "request-denied",
                $"Your booking request has been denied.",
                false,
                new Dictionary<string, object>
                {
                    { "requestId", bookingRequest.Id.ToString() },
                    { "venueId", bookingRequest.VenueId.ToString() }
                });

            return bookingRequest;
        }

        public async Task<BookingRequest?> CancelBookingRequestAsync(Guid bookingId, string userId)
        {
            var bookingRequest = await _context.BookingRequests
                .Include(br => br.Venue)
                .FirstOrDefaultAsync(br => br.Id == bookingId);

            if (bookingRequest == null || bookingRequest.UserId != userId || bookingRequest.Status != "Pending")
            {
                return null;
            }

            bookingRequest.Status = "Cancelled";
            bookingRequest.UpdatedAt = DateTime.UtcNow;
            await _bookingRepository.SaveChangesAsync();

            await _notificationService.CreateNotificationAsync(
                bookingRequest.Venue.OwnerId,
                "request-cancelled",
                $"A booking request for {bookingRequest.Venue.Title} has been cancelled.",
                false,
                new Dictionary<string, object>
                {
                    { "requestId", bookingRequest.Id.ToString() },
                    { "venueId", bookingRequest.VenueId.ToString() }
                });

            return bookingRequest;
        }
    }
}
