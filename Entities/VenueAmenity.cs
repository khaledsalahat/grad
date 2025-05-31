using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VenueBookingApi.Api.Entities
{
    public class VenueAmenity
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid VenueId { get; set; }
        [ForeignKey("VenueId")]
        public virtual Venue Venue { get; set; } = null!;

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = null!;

        public VenueAmenity()
        {
            Id = Guid.NewGuid();
        }
    }
}

