namespace VenueBookingApi.Api.Models
{
    public class VenueCreationDto
    {
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string Type { get; set; } = null!;
        public string Location { get; set; } = null!;
        public int? Capacity { get; set; }
        public decimal? PricePerDay { get; set; }
        public decimal? PricePerHour { get; set; }
        public string mainPicture { get; set; } = null!;
        public string? MainPictureUrl { get; set; } 
        public int? Rooms { get; set; }
        public int? Bathrooms { get; set; }
        public List<string> Photos { get; set; } = new();
        public List<string> Amenities { get; set; } = new();
        public List<PricingOptionDto> Pricing { get; set; } = new();
        public List<AvailabilityDto> Availability { get; set; } = new();
        public List<GlobalTimeSlotDto> GlobalTimeSlots { get; set; } = new();
        public List<string>? UnavailableDates { get; set; } = new();
    }

    public class VenueUpdateDto
    {
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string Location { get; set; } = null!;
        public int? Capacity { get; set; }
        public decimal? PricePerDay { get; set; }
        public decimal? PricePerHour { get; set; }
        public string? MainPictureUrl { get; set; }
        public int? Rooms { get; set; }
        public int? Bathrooms { get; set; }
        public List<string>? Photos { get; set; } = new();
        public List<string>? Amenities { get; set; } = new();
        public List<PricingOptionDto>? Pricing { get; set; } = new();
        public List<AvailabilityDto>? Availability { get; set; } = new();
        public List<GlobalTimeSlotDto>? GlobalTimeSlots { get; set; } = new();
        public List<string>? UnavailableDates { get; set; } = new();
    }

    public class PricingOptionDto
    {
        public string Duration { get; set; } = null!;
        public decimal Price { get; set; }
        public string? CheckInTime { get; set; }
        public string? CheckoutTime { get; set; }
    }

    public class AvailabilityDto
    {
        public string Date { get; set; } = null!;
        public List<TimeSlotDto> Times { get; set; } = new();
        public List<UnavailableTimeDto>? UnavailableTimes { get; set; } = new();
        public bool FullyBooked { get; set; }
        public bool AmBooked { get; set; }
        public bool PmBooked { get; set; }
    }

    public class TimeSlotDto
    {
        public string StartTime { get; set; } = null!;
        public string EndTime { get; set; } = null!;
    }

    public class UnavailableTimeDto
    {
        public string StartTime { get; set; } = null!;
        public string EndTime { get; set; } = null!;
        public string? BookingId { get; set; }
    }

    public class GlobalTimeSlotDto
    {
        public string StartTime { get; set; } = null!;
        public string EndTime { get; set; } = null!;
        public string? SlotName { get; set; }
    }
}

