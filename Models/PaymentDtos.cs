using System;

namespace VenueBookingApi.Api.Models
{
    public class PaymentInitiationRequestDto
    {
        public Guid BookingId { get; set; }
        public decimal Amount { get; set; }
        public string Currency { get; set; } = "USD"; 
    }

    public class PaymentInitiationResponseDto
    {
        public string PaymentGatewayUrl { get; set; } = null!;
        public string PaymentIntentId { get; set; } = null!; 
        public Guid BookingId { get; set; }
    }

    public class PaymentConfirmationWebhookDto 
    {
        public string PaymentIntentId { get; set; } = null!;
        public string Status { get; set; } = null!; 
        public Guid BookingId { get; set; } 
        public decimal AmountReceived { get; set; }
        public string? GatewayTransactionId { get; set; }
    }
}

