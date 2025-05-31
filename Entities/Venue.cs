using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VenueBookingApi.Api.Entities
{
    public class Venue
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string OwnerId { get; set; } = null!;
        [ForeignKey("OwnerId")]
        public virtual User Owner { get; set; } = null!;

        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = null!;

        public string Description { get; set; } = null!;

        [MaxLength(50)]
        public string Type { get; set; } = null!;

        [Required]
        [MaxLength(300)]
        public string Location { get; set; } = null!;

        public int? Capacity { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? PricePerDay { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? PricePerHour { get; set; }

        [Required]
        public string mainPicture { get; set; } = null!;

        [Required]
        [MaxLength(50)]
        public string Status { get; set; } = null!;

        public DateTime SubmissionDate { get; set; }
        public DateTime? ApprovalDate { get; set; }

        public string? AdminComment { get; set; }

        public int? Rooms { get; set; }
        public int? Bathrooms { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public virtual ICollection<VenuePhoto> Photos { get; set; } = new List<VenuePhoto>();
        public virtual ICollection<VenueAmenity> Amenities { get; set; } = new List<VenueAmenity>();
        public virtual ICollection<VenuePricingOption> PricingOptions { get; set; } = new List<VenuePricingOption>();
        public virtual ICollection<VenueAvailability> Availabilities { get; set; } = new List<VenueAvailability>();
        public virtual ICollection<VenueGlobalTimeSlot> GlobalTimeSlots { get; set; } = new List<VenueGlobalTimeSlot>();
        public virtual ICollection<BookingRequest> BookingRequests { get; set; } = new List<BookingRequest>();
        public virtual ICollection<VenueUnavailableDate> UnavailableDates { get; set; } = new List<VenueUnavailableDate>();

        public Venue()
        {
            Id = Guid.NewGuid();
            SubmissionDate = DateTime.UtcNow;
            CreatedAt = DateTime.UtcNow;
            UpdatedAt = DateTime.UtcNow;
            Status = "Pending";
        }
    }
}

