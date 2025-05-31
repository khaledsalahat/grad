using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace VenueBookingApi.Api.Entities
{
    public class VenuePricingOption
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid VenueId { get; set; }
        [ForeignKey("VenueId")]

        [JsonIgnore]
        public virtual Venue Venue { get; set; } = null!;

        [Required]
        [MaxLength(100)]
        public string Duration { get; set; } = null!; 

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        public TimeSpan CheckInTime { get; set; }
        public TimeSpan CheckoutTime { get; set; }
        public VenuePricingOption()
        {
            Id = Guid.NewGuid();
        }
    }
}

