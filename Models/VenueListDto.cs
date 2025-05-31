namespace VenueBookingApi.Api.Models
{
    public class VenueListDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string MainPicture { get; set; }
        public string Status { get; set; }
        public string Type { get; set; }
        public string Location { get; set; }
        public int? Capacity { get; set; }
        public int? Rooms { get; set; }
        public int? Bathrooms { get; set; }
        public DateTime CreatedAt { get; set; }
        public int RequestsCount { get; set; }
    }
}
