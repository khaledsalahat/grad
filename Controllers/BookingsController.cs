using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using VenueBookingApi.Api.Entities;
using VenueBookingApi.Api.Models;
using VenueBookingApi.Api.Services;

namespace VenueBookingApi.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BookingsController : ControllerBase
    {
        private readonly IBookingService _bookingService;
        private readonly IVenueService _venueService;
        private readonly INotificationService _notificationService;
        private readonly ILogger<BookingsController> _logger;

        public BookingsController(
            IBookingService bookingService,
            IVenueService venueService,
            INotificationService notificationService,
            ILogger<BookingsController> logger)
        {
            _bookingService = bookingService;
            _venueService = venueService;
            _notificationService = notificationService;
            _logger = logger;
        }

        [HttpPost]
        public async Task<ActionResult<BookingRequest>> CreateBooking([FromBody] BookingCreationDto bookingDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User ID not found in token.");
            }

            try
            {
                var bookingRequest = new BookingRequest
                {
                    VenueId = bookingDto.VenueId,
                    StartDate = bookingDto.StartDate,
                    EndDate = bookingDto.EndDate,
                    GuestCount = bookingDto.GuestCount,
                    CustomerName = bookingDto.CustomerName,
                    CustomerEmail = bookingDto.CustomerEmail,
                    CustomerPhone = bookingDto.CustomerPhone,
                    SpecialRequests = bookingDto.SpecialRequests,
                    CalculatedTotalPrice = bookingDto.CalculatedTotalPrice,
                    PaidAmount = bookingDto.PaidAmount ?? 0,
                    PaymentType = bookingDto.PaymentType,
                    PaymentMethod = bookingDto.PaymentMethod,
                    DurationDescription = bookingDto.Duration,
                    SelectedPricingOptionId = bookingDto.SelectedPricingOptionId,
                    WeddingHallCheckInTime = bookingDto.WeddingHallCheckInTime,
                    WeddingHallCheckoutTime = bookingDto.WeddingHallCheckoutTime,
                    TimeSlot = bookingDto.TimeSlot
                };

                var createdBooking = await _bookingService.CreateBookingAsync(bookingRequest, userId);
                if (createdBooking == null)
                {
                    return BadRequest("Failed to create booking. Venue might be unavailable or request invalid.");
                }
                return CreatedAtAction(nameof(GetBooking), new { id = createdBooking.Id }, createdBooking);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating a new booking.");
                return StatusCode(500, "An error occurred while creating the booking.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BookingRequest>> GetBooking(Guid id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User ID not found in token.");
            }

            try
            {
                var booking = await _bookingService.GetBookingByIdAsync(id, userId);
                if (booking == null)
                {
                    return NotFound();
                }
                return Ok(booking);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving booking with ID {id}.");
                return StatusCode(500, "An error occurred while retrieving the booking.");
            }
        }

        [HttpGet("my-bookings")]
        public async Task<ActionResult<IEnumerable<object>>> GetMyBookings()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User ID not found in token.");
            }

            try
            {
                var bookings = await _bookingService.GetBookingsByUserIdAsync(userId);
                var mapped = bookings.Select(b => new
                {
                    id = b.Id,
                    venueId = b.VenueId,
                    venue = new
                    {
                        id = b.Venue.Id,
                        title = b.Venue.Title,
                        location = b.Venue.Location,
                        phone = b.Venue.Owner != null ? b.Venue.Owner.PhoneNumber : null,
                        owner = new
                        {
                            name = b.Venue.Owner?.FullName,
                            email = b.Venue.Owner?.Email,
                            phone = b.Venue.Owner?.PhoneNumber
                        }
                    },
                    status = b.Status,
                    startDate = b.StartDate,
                    endDate = b.EndDate,
                    guestCount = b.GuestCount,
                    customerName = b.CustomerName,
                    customerEmail = b.CustomerEmail,
                    customerPhone = b.CustomerPhone,
                    specialRequests = b.SpecialRequests,
                    totalPrice = b.CalculatedTotalPrice,
                    paidAmount = b.PaidAmount,
                    paymentType = b.PaymentType,
                    paymentMethod = b.PaymentMethod,
                    duration = b.DurationDescription,
                    checkInTime = b.WeddingHallCheckInTime,
                    checkOutTime = b.WeddingHallCheckoutTime,
                    createdAt = b.CreatedAt,
                    updatedAt = b.UpdatedAt
                });
                return Ok(mapped);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving bookings for current user.");
                return StatusCode(500, "An error occurred while retrieving your bookings.");
            }
        }

        [HttpGet("venue/{venueId}")]
        [Authorize(Roles = "Owner,Admin")]
        public async Task<ActionResult<IEnumerable<object>>> GetBookingsForVenue(Guid venueId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User ID not found in token.");
            }

            try
            {
                var bookings = await _bookingService.GetBookingsByVenueIdAsync(venueId, userId);
                var mapped = bookings.Select(b => new
                {
                    id = b.Id,
                    venueId = b.VenueId,
                    venue = new
                    {
                        id = b.Venue.Id,
                        title = b.Venue.Title,
                        location = b.Venue.Location,
                        phone = b.Venue.Owner != null ? b.Venue.Owner.PhoneNumber : null,
                        owner = new
                        {
                            name = b.Venue.Owner?.FullName,
                            email = b.Venue.Owner?.Email,
                            phone = b.Venue.Owner?.PhoneNumber
                        }
                    },
                    status = b.Status,
                    startDate = b.StartDate,
                    endDate = b.EndDate,
                    guestCount = b.GuestCount,
                    customerName = b.CustomerName,
                    customerEmail = b.CustomerEmail,
                    customerPhone = b.CustomerPhone,
                    specialRequests = b.SpecialRequests,
                    totalPrice = b.CalculatedTotalPrice,
                    paidAmount = b.PaidAmount,
                    paymentType = b.PaymentType,
                    paymentMethod = b.PaymentMethod,
                    duration = b.DurationDescription,
                    checkInTime = b.WeddingHallCheckInTime,
                    checkOutTime = b.WeddingHallCheckoutTime,
                    createdAt = b.CreatedAt,
                    updatedAt = b.UpdatedAt
                });
                return Ok(mapped);
            }
            catch (UnauthorizedAccessException)
            {
                return Forbid();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving bookings for venue ID {venueId}.");
                return StatusCode(500, "An error occurred while retrieving venue bookings.");
            }
        }

        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateBookingStatus(Guid id, [FromBody] BookingStatusUpdateDto statusUpdateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User ID not found in token.");
            }

            try
            {
                var bookingForVenue = await _bookingService.GetBookingByIdAsync(id, userId);
                bool isOwnerOrAdmin = false;
                if (bookingForVenue != null && bookingForVenue.Venue?.OwnerId == userId) isOwnerOrAdmin = true;
                if (User.IsInRole("Admin")) isOwnerOrAdmin = true;

                var updatedBooking = await _bookingService.UpdateBookingStatusAsync(id, statusUpdateDto.NewStatus, userId, isOwnerOrAdmin);
                if (updatedBooking == null)
                {
                    return BadRequest("Failed to update booking status. Booking not found or update not allowed.");
                }
                return Ok(updatedBooking);
            }
            catch (UnauthorizedAccessException)
            {
                return Forbid();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating status for booking ID {id}.");
                return StatusCode(500, "An error occurred while updating booking status.");
            }
        }

        [HttpPost("{id}/confirm-payment")]
        [Authorize(Roles = "Admin,System")]
        public async Task<IActionResult> ConfirmPayment(Guid id, [FromBody] PaymentConfirmationDto paymentDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var success = await _bookingService.ConfirmBookingPaymentAsync(id, paymentDto.TransactionId, paymentDto.PaidAmount);
                if (!success)
                {
                    return BadRequest("Could not confirm payment. Booking not found or not in a state to confirm payment.");
                }
                return Ok(new { message = "Payment confirmed successfully." });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error confirming payment for booking ID {id}.");
                return StatusCode(500, "An error occurred while confirming payment.");
            }
        }

        [HttpGet("requests/venue/{venueId}")]
        [Authorize(Roles = "Owner,Admin")]
        public async Task<ActionResult<IEnumerable<BookingRequest>>> GetVenueBookingRequests(Guid venueId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User ID not found in token.");
            }
            try
            {
                var requests = await _bookingService.GetRequestsForVenueOwnerAsync(venueId, userId);
                return Ok(requests);
            }
            catch (UnauthorizedAccessException)
            {
                return Forbid();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving booking requests for venue {venueId}.");
                return StatusCode(500, "An error occurred while retrieving booking requests.");
            }
        }

        [HttpPost("{bookingId}/accept")]
        [Authorize(Roles = "Owner,Admin")]
        public async Task<ActionResult<BookingRequest>> AcceptBooking(Guid bookingId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User ID not found in token.");
            }
            try
            {
                var booking = await _bookingService.AcceptBookingRequestAsync(bookingId, userId);
                if (booking == null)
                {
                    return BadRequest("Could not accept booking. It might not exist, not belong to your venue, or not be in a pending state.");
                }
                return Ok(booking);
            }
            catch (UnauthorizedAccessException)
            {
                return Forbid();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error accepting booking request {bookingId}.");
                return StatusCode(500, "An error occurred while accepting the booking request.");
            }
        }

        [HttpPost("{bookingId}/deny")]
        [Authorize(Roles = "Owner,Admin")]
        public async Task<ActionResult<BookingRequest>> DenyBooking(Guid bookingId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User ID not found in token.");
            }
            try
            {
                var booking = await _bookingService.DenyBookingRequestAsync(bookingId, userId);
                if (booking == null)
                {
                    return BadRequest("Could not deny booking. It might not exist, not belong to your venue, or not be in a pending state.");
                }
                return Ok(booking);
            }
            catch (UnauthorizedAccessException)
            {
                return Forbid();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error denying booking request {bookingId}.");
                return StatusCode(500, "An error occurred while denying the booking request.");
            }
        }

        [HttpPost("{bookingId}/cancel")]
        public async Task<ActionResult<BookingRequest>> CancelBooking(Guid bookingId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User ID not found in token.");
            }
            try
            {
                var booking = await _bookingService.CancelBookingRequestAsync(bookingId, userId);
                if (booking == null)
                {
                    return BadRequest("Could not cancel booking. It might not exist, not belong to you, or not be in a state that allows cancellation.");
                }
                return Ok(booking);
            }
            catch (UnauthorizedAccessException)
            {
                return Forbid();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error cancelling booking request {bookingId}.");
                return StatusCode(500, "An error occurred while cancelling the booking request.");
            }
        }
    }
}
