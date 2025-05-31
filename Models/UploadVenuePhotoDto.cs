using Microsoft.AspNetCore.Http;

namespace VenueBookingApi.Api.Models
{
    public class UploadVenuePhotoDto
    {
        public IFormFile File { get; set; }
    }
}
