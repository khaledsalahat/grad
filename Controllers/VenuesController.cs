using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using VenueBookingApi.Api.Entities;
using VenueBookingApi.Api.Models;
using VenueBookingApi.Api.Services;

namespace VenueBookingApi.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VenuesController : ControllerBase
    {
        private readonly IVenueService _venueService;
        private readonly ILogger<VenuesController> _logger;
        private readonly ImageService _imageService;

        public VenuesController(IVenueService venueService, ILogger<VenuesController> logger, ImageService imageService)
        {
            _venueService = venueService;
            _logger = logger;
            _imageService = imageService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<Venue>>> GetVenues([FromQuery] string? status = null)
        {
            try
            {
                List<Venue> venues;
                if (!string.IsNullOrEmpty(status))
                {
                    venues = (await _venueService.GetAllVenuesAnyStatusAsync())
                        .Where(v => v.Status != null && v.Status.Equals(status, StringComparison.OrdinalIgnoreCase))
                        .ToList();
                }
                else
                {
                    venues = (await _venueService.GetAllVenuesAsync()).ToList();
                }
                return Ok(venues);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving all venues.");
                return StatusCode(500, "An error occurred while retrieving venues.");
            }
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<Venue>> GetVenue(Guid id)
        {
            try
            {
                var venue = await _venueService.GetVenueByIdAsync(id);
                if (venue == null)
                {
                    return NotFound();
                }
                if (venue.Status != "Approved")
                {
                    var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                    var userIsAdmin = User.IsInRole("Admin");

                    if (venue.OwnerId != currentUserId && !userIsAdmin)
                    {
                        return NotFound();
                    }
                }
                return Ok(venue);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving venue with ID {id}.");
                return StatusCode(500, "An error occurred while retrieving the venue.21");
            }
        }

        [HttpPost]
        [Authorize(Roles = "Owner,Admin")]
        public async Task<ActionResult<Venue>> PostVenue([FromBody] VenueCreationDto venueDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User ID not found in token.");
            }

            try
            {
                if (string.IsNullOrWhiteSpace(venueDto.Type))
                    return BadRequest("Venue type is required.");

                var venue = new Venue
                {
                    Title = venueDto.Title,
                    Description = venueDto.Description,
                    Type = venueDto.Type,
                    Location = venueDto.Location,
                    Capacity = venueDto.Capacity,
                    PricePerDay = venueDto.PricePerDay,
                    PricePerHour = venueDto.PricePerHour,
                    mainPicture = !string.IsNullOrEmpty(venueDto.MainPictureUrl) ? venueDto.MainPictureUrl : venueDto.mainPicture,
                    Rooms = venueDto.Rooms,
                    Bathrooms = venueDto.Bathrooms,
                    Photos = venueDto.Photos?.Select(p => new VenuePhoto { PhotoUrl = p }).ToList() ?? new List<VenuePhoto>(),
                    Amenities = venueDto.Amenities?.Select(a => new VenueAmenity { Name = a }).ToList() ?? new List<VenueAmenity>(),
                    PricingOptions = venueDto.Pricing?.Select(p => new VenuePricingOption
                    {
                        CheckInTime = TimeSpan.Parse(p.CheckInTime!),
                        CheckoutTime = TimeSpan.Parse(p.CheckoutTime!),
                        Price = p.Price,
                        Duration = p.Duration,
                    }).ToList() ?? new List<VenuePricingOption>(),

                    Availabilities = venueDto.Availability.Select(a =>
                    {
                        if (!DateOnly.TryParse(a.Date, out var date))
                            throw new ArgumentException($"Invalid date format: {a.Date}");

                        return new VenueAvailability
                        {

                            Date = DateOnly.Parse(a.Date),
                            FullyBooked = a.FullyBooked,
                            AmBooked = a.AmBooked,
                            PmBooked = a.PmBooked,
                            TimeSlots = a.Times.Select(t => new VenueAvailabilityTimeSlot
                            {
                                StartTime = TimeSpan.Parse(t.StartTime),
                                EndTime = TimeSpan.Parse(t.EndTime),
                            }).ToList(),
                        };
                    }).ToList(),



                    GlobalTimeSlots = venueDto.GlobalTimeSlots.Select(g => new VenueGlobalTimeSlot
                    {
                        StartTime = TimeSpan.Parse(g.StartTime),
                        EndTime = TimeSpan.Parse(g.EndTime),
                        SlotName = g.SlotName
                    }).ToList(),
                    UnavailableDates = (venueDto.UnavailableDates ?? new List<string>()).Select(u => new VenueUnavailableDate
                    {
                        Date = DateOnly.Parse(u)
                    }).ToList()
                };

                var createdVenue = await _venueService.CreateVenueAsync(venue, userId);
                return CreatedAtAction(nameof(GetVenue), new { id = createdVenue.Id }, createdVenue);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating venue: {Message}", ex.Message);
                return StatusCode(500, "An error occurred while creating the venue.");
            }
        }
        [HttpPut("{id}")]
        [Authorize(Roles = "Owner,Admin")]
        public async Task<IActionResult> PutVenue(Guid id, [FromBody] VenueUpdateDto venueDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User ID not found in token.");
            }

            try
            {
                var existingVenue = await _venueService.GetVenueByIdAsync(id);
                if (existingVenue == null)
                    return NotFound();

                var photos = (venueDto.Photos ?? new List<string>()).Select(p => new VenuePhoto { PhotoUrl = p }).ToList();
                var amenities = (venueDto.Amenities ?? new List<string>()).Select(a => new VenueAmenity { Name = a }).ToList();
                var pricingOptions = new List<VenuePricingOption>();
                foreach (var p in venueDto.Pricing ?? new List<PricingOptionDto>())
                {
                    TimeSpan checkIn = TimeSpan.Zero, checkOut = TimeSpan.Zero;
                    if (!string.IsNullOrEmpty(p.CheckInTime))
                    {
                        if (!TimeSpan.TryParse(p.CheckInTime, out checkIn))
                            return BadRequest($"Invalid CheckInTime: {p.CheckInTime}");
                    }
                    if (!string.IsNullOrEmpty(p.CheckoutTime))
                    {
                        if (!TimeSpan.TryParse(p.CheckoutTime, out checkOut))
                            return BadRequest($"Invalid CheckoutTime: {p.CheckoutTime}");
                    }
                    pricingOptions.Add(new VenuePricingOption
                    {
                        Duration = p.Duration,
                        Price = p.Price,
                        CheckInTime = checkIn,
                        CheckoutTime = checkOut,
                    });
                }

                var availabilities = new List<VenueAvailability>();
                foreach (var a in venueDto.Availability ?? new List<AvailabilityDto>())
                {
                    if (!DateOnly.TryParse(a.Date, out var date))
                        return BadRequest($"Invalid availability date: {a.Date}");
                    var timeSlots = new List<VenueAvailabilityTimeSlot>();
                    foreach (var t in a.Times ?? new List<TimeSlotDto>())
                    {
                        if (!TimeSpan.TryParse(t.StartTime, out var startTime))
                            return BadRequest($"Invalid TimeSlot StartTime: {t.StartTime}");
                        if (!TimeSpan.TryParse(t.EndTime, out var endTime))
                            return BadRequest($"Invalid TimeSlot EndTime: {t.EndTime}");
                        timeSlots.Add(new VenueAvailabilityTimeSlot
                        {
                            StartTime = startTime,
                            EndTime = endTime,
                        });
                    }
                    availabilities.Add(new VenueAvailability
                    {
                        Date = date,
                        FullyBooked = a.FullyBooked,
                        AmBooked = a.AmBooked,
                        PmBooked = a.PmBooked,
                        TimeSlots = timeSlots,
                    });
                }

                var globalTimeSlots = new List<VenueGlobalTimeSlot>();
                foreach (var g in venueDto.GlobalTimeSlots ?? new List<GlobalTimeSlotDto>())
                {
                    if (!TimeSpan.TryParse(g.StartTime, out var startTime))
                        return BadRequest($"Invalid GlobalTimeSlot StartTime: {g.StartTime}");
                    if (!TimeSpan.TryParse(g.EndTime, out var endTime))
                        return BadRequest($"Invalid GlobalTimeSlot EndTime: {g.EndTime}");
                    globalTimeSlots.Add(new VenueGlobalTimeSlot
                    {
                        StartTime = startTime,
                        EndTime = endTime,
                        SlotName = g.SlotName
                    });
                }

                var unavailableDates = new List<VenueUnavailableDate>();
                foreach (var u in venueDto.UnavailableDates ?? new List<string>())
                {
                    if (!DateOnly.TryParse(u, out var date))
                        return BadRequest($"Invalid unavailable date: {u}");
                    unavailableDates.Add(new VenueUnavailableDate
                    {
                        Date = date
                    });
                }
                string? mainPicture = !string.IsNullOrEmpty(venueDto.MainPictureUrl)
                    ? venueDto.MainPictureUrl
                    : existingVenue.mainPicture;

                if (string.IsNullOrEmpty(mainPicture))
                    return BadRequest("Main picture is required.");

                mainPicture = mainPicture!;

                var venueToUpdate = new Venue
                {
                    Id = id,
                    Title = venueDto.Title,
                    Description = venueDto.Description,
                    Location = venueDto.Location,
                    Capacity = venueDto.Capacity,
                    PricePerDay = venueDto.PricePerDay,
                    PricePerHour = venueDto.PricePerHour,
                    mainPicture = mainPicture,
                    Rooms = venueDto.Rooms,
                    Bathrooms = venueDto.Bathrooms,
                    Photos = photos,
                    Amenities = amenities,
                    PricingOptions = pricingOptions,
                    Availabilities = availabilities,
                    GlobalTimeSlots = globalTimeSlots,
                    UnavailableDates = unavailableDates,
                    OwnerId = existingVenue.OwnerId,
                    Status = existingVenue.Status,
                    SubmissionDate = existingVenue.SubmissionDate,
                    CreatedAt = existingVenue.CreatedAt,
                    ApprovalDate = existingVenue.ApprovalDate,
                    AdminComment = existingVenue.AdminComment,
                    Type = existingVenue.Type
                }; try
                {
                    var success = await _venueService.UpdateVenueAsync(id, venueToUpdate, userId);
                    if (!success)
                    {
                        var existingVenueAfterUpdate = await _venueService.GetVenueByIdAsync(id);
                        if (existingVenueAfterUpdate == null) return NotFound();
                        return Forbid();
                    }
                    return NoContent();
                }
                catch (DbUpdateConcurrencyException ex)
                {
                    _logger.LogError(ex, $"Concurrency exception while updating venue {id}");

                    var venueExists = await _venueService.GetVenueByIdAsync(id) != null;
                    if (!venueExists)
                    {
                        return NotFound("The venue you're trying to update no longer exists.");
                    }

                    return StatusCode(409, "The venue was modified by another user. Please refresh and try again.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating venue with ID {id}.");

                if (ex is DbUpdateConcurrencyException)
                {
                    return StatusCode(409, "The venue data has changed since you last retrieved it. Please refresh and try again.");
                }
                else if (ex is DbUpdateException dbEx)
                {
                    if (dbEx.InnerException != null && dbEx.InnerException.Message.Contains("FK_"))
                    {
                        return StatusCode(400, "Cannot update venue due to existing relationships. Please check bookings or other related data.");
                    }
                    return StatusCode(500, "Database error occurred while updating the venue.");
                }

                return StatusCode(500, "An error occurred while updating the venue. Please try again later.");
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Owner,Admin")]
        public async Task<IActionResult> DeleteVenue(Guid id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User ID not found in token.");
            }

            try
            {
                var success = await _venueService.DeleteVenueAsync(id, userId);
                if (!success)
                {
                    var existingVenue = await _venueService.GetVenueByIdAsync(id);
                    if (existingVenue == null) return NotFound();
                    return Forbid();
                }
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting venue with ID {id}.");
                return StatusCode(500, "An error occurred while deleting the venue.");
            }
        }

        [HttpGet("my-venues")]
        [Authorize(Roles = "Owner,Admin")]
        public async Task<ActionResult<IEnumerable<VenueListDto>>> GetMyVenues()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User ID not found in token.");
            }
            try
            {
                var venues = (await _venueService.GetVenueListByOwnerAsync(userId)).ToList();
                _logger.LogInformation($"[GetMyVenues] Found {venues.Count} venues for user {userId}: {string.Join(",", venues.Select(v => v.Id))}");
                return Ok(venues);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving venues for current owner.");
                return StatusCode(500, "An error occurred while retrieving your venues.");
            }
        }

        [HttpGet("owner/{ownerId}")]
        [AllowAnonymous]
        public async Task<ActionResult<OwnerDetailsDto>> GetOwnerDetails(string ownerId)
        {
            try
            {
                var ownerDetails = await _venueService.GetOwnerDetailsAsync(ownerId);
                if (ownerDetails == null)
                {
                    return NotFound("Owner not found.");
                }
                return Ok(ownerDetails);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving owner details for ID {ownerId}.");
                return StatusCode(500, "An error occurred while retrieving owner details.");
            }
        }

        [HttpPost("upload-main-picture")]
        [Authorize(Roles = "Owner,Admin")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UploadMainPicture([FromForm] UploadVenuePhotoDto dto, CancellationToken cancellationToken)
        {
            if (dto?.File == null || dto.File.Length == 0)
                return BadRequest("No file uploaded.");
            try
            {
                var thumbnailUrl = await _imageService.SaveThumbnailAsync(dto.File);
                return Ok(new { thumbnailUrl });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error uploading main picture");
                return StatusCode(500, "An error occurred while uploading the image.");
            }
        }

        [HttpPost("upload-additional-photo")]
        [Authorize(Roles = "Owner,Admin")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UploadAdditionalPhoto([FromForm] UploadVenuePhotoDto dto, CancellationToken cancellationToken)
        {
            if (dto?.File == null || dto.File.Length == 0)
                return BadRequest("No file uploaded.");
            try
            {
                var thumbnailUrl = await _imageService.SaveThumbnailAsync(dto.File);
                return Ok(new { thumbnailUrl });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error uploading additional photo");
                return StatusCode(500, "An error occurred while uploading the image.");
            }
        }
    }
}
