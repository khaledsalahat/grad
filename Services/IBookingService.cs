using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using VenueBookingApi.Api.Entities;

namespace VenueBookingApi.Api.Services
{
    public interface IBookingService
    {
        Task<BookingRequest?> CreateBookingAsync(BookingRequest bookingRequest, string userId);
        Task<BookingRequest?> GetBookingByIdAsync(Guid bookingId, string userId);
        Task<IEnumerable<BookingRequest>> GetBookingsByUserIdAsync(string userId);
        Task<IEnumerable<BookingRequest>> GetBookingsByVenueIdAsync(Guid venueId, string ownerId);
        Task<BookingRequest?> UpdateBookingStatusAsync(Guid bookingId, string newStatus, string userId, bool isAdminOrOwner);
        Task<bool> ConfirmBookingPaymentAsync(Guid bookingId, string transactionId, decimal paidAmount);
        Task<IEnumerable<BookingRequest>> GetRequestsForVenueOwnerAsync(Guid venueId, string ownerId);
        Task<BookingRequest?> AcceptBookingRequestAsync(Guid bookingId, string ownerId);
        Task<BookingRequest?> DenyBookingRequestAsync(Guid bookingId, string ownerId);
        Task<BookingRequest?> CancelBookingRequestAsync(Guid bookingId, string userId);
    }
}
