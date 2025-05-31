using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
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
    public class VenueService : IVenueService
    {
        private readonly IGenericRepository<Venue> _venueRepository;
        private readonly IGenericRepository<User> _userRepository;
        private readonly UserManager<User> _userManager;
        private readonly ApplicationDbContext _context;
        private readonly ILogger<VenueService> _logger;

        public VenueService(
            IGenericRepository<Venue> venueRepository,
            IGenericRepository<User> userRepository,
            UserManager<User> userManager,
            ApplicationDbContext context,
            ILogger<VenueService>? logger = null)
        {
            _venueRepository = venueRepository;
            _userRepository = userRepository;
            _userManager = userManager;
            _context = context;
            _logger = logger ?? Microsoft.Extensions.Logging.Abstractions.NullLogger<VenueService>.Instance;
        }

        public async Task<Venue> CreateVenueAsync(Venue venue, string ownerId)
        {


            venue.OwnerId = ownerId;
            venue.Status = "Pending";
            venue.SubmissionDate = DateTime.UtcNow;
            venue.CreatedAt = DateTime.UtcNow;
            venue.UpdatedAt = DateTime.UtcNow;

            if (venue.Photos != null)
            {
                foreach (var photo in venue.Photos)
                {
                    photo.Venue = venue;
                }
            }
            if (venue.Amenities != null)
            {
                foreach (var amenity in venue.Amenities)
                {
                    amenity.Venue = venue;
                }
            }
            if (venue.PricingOptions != null)
            {
                foreach (var pricing in venue.PricingOptions)
                {
                    pricing.Venue = venue;
                }
            }
            if (venue.Availabilities != null)
            {
                foreach (var avail in venue.Availabilities)
                {
                    avail.Venue = venue;
                    if (avail.TimeSlots != null)
                    {
                        foreach (var slot in avail.TimeSlots)
                        {
                            slot.VenueAvailability = avail;
                        }
                    }
                }
            }
            if (venue.GlobalTimeSlots != null)
            {
                foreach (var slot in venue.GlobalTimeSlots)
                {
                    slot.Venue = venue;
                }
            }
            if (venue.UnavailableDates != null)
            {
                foreach (var unavail in venue.UnavailableDates)
                {
                    unavail.Venue = venue;
                }
            }

            await _venueRepository.AddAsync(venue);
            await _venueRepository.SaveChangesAsync();
            return venue;
        }

        public async Task<bool> DeleteVenueAsync(Guid id, string userId)
        {
            var venue = await _venueRepository.GetByIdAsync(id);
            if (venue == null) return false;

            if (venue.OwnerId != userId)
            {
                return false;
            }

            _venueRepository.Remove(venue);
            await _venueRepository.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Venue>> GetAllVenuesAsync()
        {
            return await _context.Venues
                                 .Where(v => v.Status == "Approved")
                                 .Include(v => v.Photos)
                                 .Include(v => v.Amenities)
                                 .Include(v => v.PricingOptions)
                                 .ToListAsync();
        }

        public async Task<IEnumerable<Venue>> GetAllVenuesAnyStatusAsync()
        {
            return await _context.Venues
                .Include(v => v.Photos)
                .Include(v => v.Amenities)
                .Include(v => v.PricingOptions)
                .ToListAsync();
        }

        public async Task<Venue?> GetVenueByIdAsync(Guid id)
        {
            return await _context.Venues
                                 .Include(v => v.Owner)
                                 .Include(v => v.Photos)
                                 .Include(v => v.Amenities)
                                 .Include(v => v.PricingOptions)
                                 .Include(v => v.Availabilities)
                                    .ThenInclude(a => a.TimeSlots)
                                 .Include(v => v.GlobalTimeSlots)
                                 .Include(v => v.UnavailableDates)
                                 .FirstOrDefaultAsync(v => v.Id == id);
        }

        public async Task<IEnumerable<Venue>> GetVenuesByOwnerAsync(string ownerId)
        {
            return await _context.Venues
                .Where(v => v.OwnerId == ownerId)
                .Include(v => v.Owner)
                .Include(v => v.Photos)
                .Include(v => v.Amenities)
                .Include(v => v.PricingOptions)
                .Include(v => v.Availabilities)
                    .ThenInclude(a => a.TimeSlots)
                .Include(v => v.GlobalTimeSlots)
                .Include(v => v.UnavailableDates)
                .Include(v => v.BookingRequests)
                .ToListAsync();
        }

        public async Task<bool> UpdateVenueAsync(Guid id, Venue venueUpdateRequest, string userId)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var venueCheck = await _context.Venues
                    .AsNoTracking()
                    .FirstOrDefaultAsync(v => v.Id == id);

                if (venueCheck == null) return false;
                if (venueCheck.OwnerId != userId) return false;

                var existingPhotos = await _context.VenuePhotos
                    .Where(p => p.VenueId == id)
                    .ToListAsync();
                if (existingPhotos.Any())
                {
                    _context.VenuePhotos.RemoveRange(existingPhotos);
                    await _context.SaveChangesAsync();
                }

                var existingAmenities = await _context.VenueAmenities
                    .Where(a => a.VenueId == id)
                    .ToListAsync();
                if (existingAmenities.Any())
                {
                    _context.VenueAmenities.RemoveRange(existingAmenities);
                    await _context.SaveChangesAsync();
                }

                var existingPricingOptions = await _context.VenuePricingOptions
                    .Where(p => p.VenueId == id)
                    .ToListAsync();
                if (existingPricingOptions.Any())
                {
                    _context.VenuePricingOptions.RemoveRange(existingPricingOptions);
                    await _context.SaveChangesAsync();
                }

                var existingAvailabilities = await _context.VenueAvailabilities
                    .Include(a => a.TimeSlots)
                    .Where(a => a.VenueId == id)
                    .ToListAsync();
                foreach (var avail in existingAvailabilities)
                {
                    if (avail.TimeSlots.Any())
                    {
                        _context.VenueAvailabilityTimeSlots.RemoveRange(avail.TimeSlots);
                    }
                }
                if (existingAvailabilities.Any())
                {
                    _context.VenueAvailabilities.RemoveRange(existingAvailabilities);
                    await _context.SaveChangesAsync();
                }

                var existingGlobalTimeSlots = await _context.VenueGlobalTimeSlots
                    .Where(g => g.VenueId == id)
                    .ToListAsync();
                if (existingGlobalTimeSlots.Any())
                {
                    _context.VenueGlobalTimeSlots.RemoveRange(existingGlobalTimeSlots);
                    await _context.SaveChangesAsync();
                }

                var existingUnavailableDates = await _context.VenueUnavailableDates
                    .Where(u => u.VenueId == id)
                    .ToListAsync();
                if (existingUnavailableDates.Any())
                {
                    _context.VenueUnavailableDates.RemoveRange(existingUnavailableDates);
                    await _context.SaveChangesAsync();
                }

                var venue = await _context.Venues.FindAsync(id);
                if (venue == null) return false;

                var trackedEntities = _context.ChangeTracker.Entries()
                    .Where(e => e.Entity.GetType() == typeof(Venue) &&
                           ((Venue)e.Entity).Id == id &&
                           e.Entity != venue)
                    .ToList();

                foreach (var entry in trackedEntities)
                {
                    entry.State = EntityState.Detached;
                }

                venue.Title = venueUpdateRequest.Title;
                venue.Description = venueUpdateRequest.Description;
                venue.Location = venueUpdateRequest.Location;
                venue.Capacity = venueUpdateRequest.Capacity;
                venue.PricePerDay = venueUpdateRequest.PricePerDay;
                venue.PricePerHour = venueUpdateRequest.PricePerHour;
                venue.Rooms = venueUpdateRequest.Rooms;
                venue.Bathrooms = venueUpdateRequest.Bathrooms;
                venue.mainPicture = venueUpdateRequest.mainPicture;
                venue.UpdatedAt = DateTime.UtcNow;


                _context.Venues.Update(venue);
                await _context.SaveChangesAsync();

                foreach (var photo in venueUpdateRequest.Photos)
                {
                    photo.Id = Guid.NewGuid();
                    photo.VenueId = id;
                    await _context.VenuePhotos.AddAsync(photo);
                }
                await _context.SaveChangesAsync();

                foreach (var amenity in venueUpdateRequest.Amenities)
                {
                    amenity.Id = Guid.NewGuid();
                    amenity.VenueId = id;
                    await _context.VenueAmenities.AddAsync(amenity);
                }
                await _context.SaveChangesAsync();

                foreach (var pricing in venueUpdateRequest.PricingOptions)
                {
                    pricing.Id = Guid.NewGuid();
                    pricing.VenueId = id;
                    await _context.VenuePricingOptions.AddAsync(pricing);
                }
                await _context.SaveChangesAsync();

                foreach (var avail in venueUpdateRequest.Availabilities)
                {
                    avail.Id = Guid.NewGuid();
                    avail.VenueId = id;

                    var timeSlots = avail.TimeSlots.ToList();
                    avail.TimeSlots = new List<VenueAvailabilityTimeSlot>();
                    await _context.VenueAvailabilities.AddAsync(avail);
                    await _context.SaveChangesAsync();

                    foreach (var slot in timeSlots)
                    {
                        slot.Id = Guid.NewGuid();
                        slot.VenueAvailabilityId = avail.Id;
                        await _context.VenueAvailabilityTimeSlots.AddAsync(slot);
                    }
                    await _context.SaveChangesAsync();
                }

                foreach (var slot in venueUpdateRequest.GlobalTimeSlots)
                {
                    slot.Id = Guid.NewGuid();
                    slot.VenueId = id;
                    await _context.VenueGlobalTimeSlots.AddAsync(slot);
                }
                await _context.SaveChangesAsync();

                foreach (var unavail in venueUpdateRequest.UnavailableDates)
                {
                    unavail.Id = Guid.NewGuid();
                    unavail.VenueId = id;
                    await _context.VenueUnavailableDates.AddAsync(unavail);
                }
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating venue: {ex.Message}");
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task<IEnumerable<Venue>> GetPendingVenuesAsync()
        {
            return await _context.Venues
                                 .Where(v => v.Status == "Pending")
                                 .Include(v => v.Owner)
                                 .ToListAsync();
        }

        public async Task<Venue?> ApproveVenueAsync(Guid venueId, string adminId)
        {
            var venue = await _venueRepository.GetByIdAsync(venueId);
            if (venue == null || venue.Status != "Pending") return null;

            venue.Status = "Approved";
            venue.ApprovalDate = DateTime.UtcNow;
            venue.AdminComment = null;
            venue.UpdatedAt = DateTime.UtcNow;
            _venueRepository.Update(venue);
            await _venueRepository.SaveChangesAsync();
            return venue;
        }

        public async Task<Venue?> RejectVenueAsync(Guid venueId, string adminId, string reason)
        {
            var venue = await _venueRepository.GetByIdAsync(venueId);
            if (venue == null || venue.Status != "Pending") return null;

            venue.Status = "Rejected";
            venue.ApprovalDate = DateTime.UtcNow;
            venue.AdminComment = reason;
            venue.UpdatedAt = DateTime.UtcNow;
            _venueRepository.Update(venue);
            await _venueRepository.SaveChangesAsync();
            return venue;
        }

        public async Task<OwnerDetailsDto?> GetOwnerDetailsAsync(string ownerId)
        {
            var owner = await _userRepository.GetByIdAsync(ownerId);
            if (owner == null) return null;
            return new OwnerDetailsDto
            {
                Name = owner.FullName ?? owner.UserName,
                Email = owner.Email,
                Phone = owner.PhoneNumber
            };
        }

        public async Task<IEnumerable<VenueListDto>> GetVenueListByOwnerAsync(string ownerId)
        {
            return await _context.Venues
                .Where(v => v.OwnerId == ownerId)
                .Select(v => new VenueListDto
                {
                    Id = v.Id,
                    Title = v.Title,
                    MainPicture = v.mainPicture,
                    Status = v.Status,
                    Type = v.Type,
                    Location = v.Location,
                    Capacity = v.Capacity,
                    Rooms = v.Rooms,
                    Bathrooms = v.Bathrooms,
                    CreatedAt = v.CreatedAt,
                    RequestsCount = v.BookingRequests.Count()
                })
                .ToListAsync();
        }
    }
}

