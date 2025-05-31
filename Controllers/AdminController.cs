using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using VenueBookingApi.Api.Entities;
using VenueBookingApi.Api.Services;
using VenueBookingApi.Api.Models;

namespace VenueBookingApi.Api.Controllers
{
    [Route("api")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly IVenueService _venueService;
        private readonly IUserService _userService;
        private readonly ILogger<AdminController> _logger;

        public AdminController(
            IVenueService venueService,
            IUserService userService,
            ILogger<AdminController> logger)
        {
            _venueService = venueService;
            _userService = userService;
            _logger = logger;
        }

        [HttpGet("users")]
        public async Task<ActionResult<IEnumerable<UserListDto>>> GetAllUsers()
        {
            try
            {
                var users = await _userService.GetAllUsersAsync();
                return Ok(users);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving all users.");
                return StatusCode(500, "An error occurred while retrieving users.");
            }
        }

        [HttpGet("users/{id}")]
        public async Task<ActionResult<UserDetailsDto>> GetUserDetails(string id)
        {
            try
            {
                var user = await _userService.GetUserDetailsAsync(id);
                if (user == null)
                {
                    return NotFound($"User with ID {id} not found.");
                }
                return Ok(user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving user details for ID {id}.");
                return StatusCode(500, "An error occurred while retrieving user details.");
            }
        }

        [HttpPatch("users/{id}/block")]
        public async Task<ActionResult<UserDetailsDto>> BlockUser(string id)
        {
            var adminId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(adminId))
            {
                return Unauthorized("Admin ID not found in token.");
            }

            try
            {
                var user = await _userService.BlockUserAsync(id, adminId);
                if (user == null)
                {
                    return NotFound($"User with ID {id} not found.");
                }

                var userDto = await _userService.GetUserDetailsAsync(id);
                return Ok(userDto);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error blocking user {id}.");
                return StatusCode(500, "An error occurred while blocking the user.");
            }
        }

        [HttpPatch("users/{id}/unblock")]
        public async Task<ActionResult<UserDetailsDto>> UnblockUser(string id)
        {
            var adminId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(adminId))
            {
                return Unauthorized("Admin ID not found in token.");
            }

            try
            {
                var user = await _userService.UnblockUserAsync(id, adminId);
                if (user == null)
                {
                    return NotFound($"User with ID {id} not found.");
                }

                var userDto = await _userService.GetUserDetailsAsync(id);
                return Ok(userDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error unblocking user {id}.");
                return StatusCode(500, "An error occurred while unblocking the user.");
            }
        }

        [HttpGet("admin/pending-venues")]
        public async Task<ActionResult<IEnumerable<Venue>>> GetPendingVenues()
        {
            try
            {
                var venues = await _venueService.GetPendingVenuesAsync();
                return Ok(venues);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving pending venues.");
                return StatusCode(500, "An error occurred while retrieving pending venues.");
            }
        }

        [HttpPost("admin/venues/{venueId}/approve")]
        public async Task<ActionResult<Venue>> ApproveVenue(Guid venueId)
        {
            var adminId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(adminId))
            {
                return Unauthorized("Admin ID not found in token.");
            }

            try
            {
                var venue = await _venueService.ApproveVenueAsync(venueId, adminId);
                if (venue == null)
                {
                    return NotFound("Venue not found or not in a state to be approved.");
                }
                return Ok(venue);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error approving venue {venueId}.");
                return StatusCode(500, "An error occurred while approving the venue.");
            }
        }

        [HttpPost("admin/venues/{venueId}/reject")]
        public async Task<ActionResult<Venue>> RejectVenue(Guid venueId, [FromBody] AdminVenueActionDto actionDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var adminId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(adminId))
            {
                return Unauthorized("Admin ID not found in token.");
            }

            try
            {
                var venue = await _venueService.RejectVenueAsync(venueId, adminId, actionDto.Reason);
                if (venue == null)
                {
                    return NotFound("Venue not found or not in a state to be rejected.");
                }
                return Ok(venue);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error rejecting venue {venueId}.");
                return StatusCode(500, "An error occurred while rejecting the venue.");
            }
        }
    }
}
