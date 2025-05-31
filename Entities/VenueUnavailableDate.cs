using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VenueBookingApi.Api.Entities
{
    public class VenueUnavailableDate
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid VenueId { get; set; }
        [ForeignKey("VenueId")]
        public virtual Venue Venue { get; set; } = null!;

        [Required]
        public DateOnly Date { get; set; }

        [MaxLength(200)]
        public string? Reason { get; set; } 

        public Guid? BookingRequestId { get; set; }
        [ForeignKey("BookingRequestId")]
        public virtual BookingRequest? BookingRequest { get; set; }

        public VenueUnavailableDate()
        {
            Id = Guid.NewGuid();
        }
    }
}

