using Microsoft.Extensions.Configuration;
using System;
using System.Threading.Tasks;
using VenueBookingApi.Api.Models;
using VenueBookingApi.Api.Repositories;
using VenueBookingApi.Api.Entities;

namespace VenueBookingApi.Api.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IConfiguration _configuration;
        private readonly IGenericRepository<BookingRequest> _bookingRepository;
        private readonly IBookingService _bookingService; 
        private readonly ILogger<PaymentService> _logger;

        public PaymentService(
            IConfiguration configuration, 
            IGenericRepository<BookingRequest> bookingRepository,
            IBookingService bookingService,
            ILogger<PaymentService> logger)
        {
            _configuration = configuration;
            _bookingRepository = bookingRepository;
            _bookingService = bookingService;
            _logger = logger;

        }

        public async Task<PaymentInitiationResponseDto?> InitiatePaymentAsync(Guid bookingId, decimal amount, string currency, string userId)
        {
            var booking = await _bookingRepository.GetByIdAsync(bookingId);
            if (booking == null || booking.UserId != userId || booking.Status != "Accepted")
            {
                _logger.LogWarning($"Payment initiation failed for booking {bookingId}: Booking not found, not owned by user, or not in accepted state.");
                return null; 
            }

            _logger.LogInformation($"Initiating payment for booking {bookingId} with amount {amount} {currency}.");

            var paymentIntentId = $"pi_{Guid.NewGuid().ToString().Replace("-", "")}";
            var paymentGatewayUrl = $"https://example-payment-gateway.com/pay?intentId={paymentIntentId}&bookingId={bookingId}&amount={amount}&currency={currency}";

            return new PaymentInitiationResponseDto
            {
                PaymentGatewayUrl = paymentGatewayUrl, 
                PaymentIntentId = paymentIntentId,    
                BookingId = bookingId
            };
        }

        public async Task<bool> ConfirmPaymentAsync(Guid bookingId, string paymentGatewayTransactionId, string status)
        {
            _logger.LogInformation($"Attempting to confirm payment for booking {bookingId}, Gateway TX ID: {paymentGatewayTransactionId}, Status: {status}");
            var booking = await _bookingRepository.GetByIdAsync(bookingId);
            if (booking == null)
            {
                _logger.LogError($"Payment confirmation failed: Booking {bookingId} not found.");
                return false;
            }

            if (status.Equals("succeeded", StringComparison.OrdinalIgnoreCase) || status.Equals("confirmed", StringComparison.OrdinalIgnoreCase))
            {
                booking.PaymentTransactionId = paymentGatewayTransactionId;
                booking.PaidAmount = booking.CalculatedTotalPrice; 
                booking.Status = "Confirmed";
                booking.UpdatedAt = DateTime.UtcNow;
                _bookingRepository.Update(booking);
                await _bookingRepository.SaveChangesAsync();
                _logger.LogInformation($"Payment confirmed successfully for booking {bookingId}.");
                return true;
            }
            else
            {
                booking.Status = "PaymentFailed"; 
                booking.UpdatedAt = DateTime.UtcNow;
                _bookingRepository.Update(booking);
                await _bookingRepository.SaveChangesAsync();
                _logger.LogWarning($"Payment for booking {bookingId} failed or was not successful. Status: {status}");
                return false;
            }
        }
    }
}

