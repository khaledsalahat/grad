using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VenueBookingApi.Api.Entities
{
    public class VenueAvailability
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid VenueId { get; set; }
        [ForeignKey("VenueId")]
        public virtual Venue Venue { get; set; } = null!;

        [Required]
        public DateOnly Date { get; set; }

         public bool FullyBooked { get; set; } = false;
         public bool AmBooked { get; set; } = false;
         public bool PmBooked { get; set; } = false; 

        public virtual ICollection<VenueAvailabilityTimeSlot> TimeSlots { get; set; } = new List<VenueAvailabilityTimeSlot>();

        public VenueAvailability()
        {
            Id = Guid.NewGuid();
        }
    }

    public class VenueAvailabilityTimeSlot
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid VenueAvailabilityId { get; set; }
        [ForeignKey("VenueAvailabilityId")]
        public virtual VenueAvailability VenueAvailability { get; set; } = null!;

        [Required]
        public TimeSpan StartTime { get; set; }

        [Required]
        public TimeSpan EndTime { get; set; }


        public VenueAvailabilityTimeSlot()
        {
            Id = Guid.NewGuid();
        }
    }
}

