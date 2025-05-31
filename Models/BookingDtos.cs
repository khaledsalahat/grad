using System;

namespace VenueBookingApi.Api.Models
{
    public class BookingCreationDto
    {
        public Guid VenueId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int GuestCount { get; set; }
        public string CustomerName { get; set; } = null!;
        public string CustomerEmail { get; set; } = null!;
        public string CustomerPhone { get; set; } = null!;
        public string? SpecialRequests { get; set; }
        public decimal CalculatedTotalPrice { get; set; }
        public string? Duration { get; set; }
        public Guid? SelectedPricingOptionId { get; set; }
        public string? PaymentType { get; set; }
        public decimal? PaidAmount { get; set; }
        public string? PaymentMethod { get; set; }
        public string? WeddingHallCheckInTime { get; set; }
        public string? WeddingHallCheckoutTime { get; set; }
        public string? TimeSlot { get; set; }
    }

    public class BookingStatusUpdateDto
    {
        public string NewStatus { get; set; } = null!;
    }

    public class PaymentConfirmationDto
    {
        public string TransactionId { get; set; } = null!;
        public decimal PaidAmount { get; set; }
    }
}

