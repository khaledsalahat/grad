using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VenueBookingApi.Api.Entities
{
    public class VenueGlobalTimeSlot
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid VenueId { get; set; }
        [ForeignKey("VenueId")]

        public virtual Venue Venue { get; set; } = null!;

        [Required]
        public TimeSpan StartTime { get; set; }

        [Required]
        public TimeSpan EndTime { get; set; }

        [MaxLength(100)]
        public string? SlotName { get; set; }
        public List<VenuePricingOption> PricingOptions { get; internal set; }

        public VenueGlobalTimeSlot()
        {
            Id = Guid.NewGuid();
        }
    }
}

