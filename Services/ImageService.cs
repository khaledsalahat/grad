using Microsoft.AspNetCore.Http;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using SixLabors.ImageSharp.Formats.Jpeg;

namespace VenueBookingApi.Api.Services
{
    public class ImageService
    {
        private readonly string _thumbnailFolder;
        public ImageService()
        {
            _thumbnailFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", "thumbnails");
            Directory.CreateDirectory(_thumbnailFolder);
        }

        public async Task<string> SaveThumbnailAsync(IFormFile file)
        {
            var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(_thumbnailFolder, fileName);

            using var image = await Image.LoadAsync(file.OpenReadStream());
            image.Mutate(x => x.Resize(300, 200));
            await image.SaveAsync(filePath, new JpegEncoder { Quality = 80 });

            return $"/images/thumbnails/{fileName}";
        }
    }
}
