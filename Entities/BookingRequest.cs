using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VenueBookingApi.Api.Entities
{
    public class BookingRequest
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string UserId { get; set; } = null!;
        [ForeignKey("UserId")]
        public virtual User User { get; set; } = null!;

        [Required]
        public Guid VenueId { get; set; }
        [ForeignKey("VenueId")]
        public virtual Venue Venue { get; set; } = null!;

        [Required]
        [MaxLength(50)]
        public string Status { get; set; } = null!; 

        [Required]
        public DateTime StartDate { get; set; } 

        [Required]
        public DateTime EndDate { get; set; } 

        [MaxLength(100)]
        public string? DurationDescription { get; set; } 

        [Required]
        public int GuestCount { get; set; }

        [Required]
        [MaxLength(200)]
        public string CustomerName { get; set; } = null!;

        [Required]
        [EmailAddress]
        [MaxLength(200)]
        public string CustomerEmail { get; set; } = null!;

        [Required]
        [Phone]
        [MaxLength(20)]
        public string CustomerPhone { get; set; } = null!;

        public string? SpecialRequests { get; set; }

        [MaxLength(50)]
        public string? PaymentType { get; set; }

        public Guid? SelectedPricingOptionId { get; set; }
        [ForeignKey("SelectedPricingOptionId")]
        public virtual VenuePricingOption? SelectedPricingOption { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal CalculatedTotalPrice { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal PaidAmount { get; set; } = 0.0m;

        [MaxLength(50)]
        public string? PaymentMethod { get; set; }

        [MaxLength(100)]
        public string? PaymentTransactionId { get; set; }

        [MaxLength(50)]
        public string? ConfirmationCode { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public string? WeddingHallCheckInTime { get; set; }
        public string? WeddingHallCheckoutTime { get; set; }
        public string? TimeSlot { get; set; } 

        public BookingRequest()
        {
            Id = Guid.NewGuid();
            CreatedAt = DateTime.UtcNow;
            UpdatedAt = DateTime.UtcNow;
            Status = "Pending"; 
        }
    }
}

