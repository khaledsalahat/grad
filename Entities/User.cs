using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace VenueBookingApi.Api.Entities
{
    public class User : IdentityUser
    {
        public string? FullName { get; set; }
        public bool IsBlocked { get; set; }
        public DateTime? LastLogin { get; set; }
        public DateTime CreatedAt { get; set; } 
        public virtual ICollection<Venue> Venues { get; set; }
        public virtual ICollection<BookingRequest> BookingRequests { get; set; }
        public virtual ICollection<Notification> Notifications { get; set; }
    }
}
