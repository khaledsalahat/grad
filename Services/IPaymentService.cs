using System.Threading.Tasks;
using VenueBookingApi.Api.Models;
using System;

namespace VenueBookingApi.Api.Services
{
    public interface IPaymentService
    {
        Task<PaymentInitiationResponseDto?> InitiatePaymentAsync(Guid bookingId, decimal amount, string currency, string userId);
        Task<bool> ConfirmPaymentAsync(Guid bookingId, string paymentGatewayTransactionId, string status);
    }
}

