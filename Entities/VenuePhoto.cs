using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VenueBookingApi.Api.Entities
{
    public class VenuePhoto
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid VenueId { get; set; }
        [ForeignKey("VenueId")]
        public virtual Venue Venue { get; set; } = null!;

        [Required] 
        public string PhotoUrl { get; set; } = null!;

        public int Order { get; set; } = 0;

        public VenuePhoto()
        {
            Id = Guid.NewGuid();
        }
    }
}

