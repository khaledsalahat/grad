using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using VenueBookingApi.Api.Entities;
using VenueBookingApi.Api.Services;

namespace VenueBookingApi.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] 
    public class NotificationsController : ControllerBase
    {
        private readonly INotificationService _notificationService;
        private readonly ILogger<NotificationsController> _logger;

        public NotificationsController(INotificationService notificationService, ILogger<NotificationsController> logger)
        {
            _notificationService = notificationService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Notification>>> GetMyNotifications([FromQuery] bool includeRead = false)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User ID not found in token.");
            }

            try
            {
                var notifications = await _notificationService.GetNotificationsByUserIdAsync(userId, includeRead);
                return Ok(notifications);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving notifications for current user.");
                return StatusCode(500, "An error occurred while retrieving your notifications.");
            }
        }

        [HttpPost("{id}/mark-read")]
        public async Task<IActionResult> MarkNotificationAsRead(Guid id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User ID not found in token.");
            }

            try
            {
                var success = await _notificationService.MarkNotificationAsReadAsync(id, userId);
                if (!success)
                {
                    return NotFound("Notification not found or not owned by user.");
                }
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error marking notification {id} as read.");
                return StatusCode(500, "An error occurred while marking notification as read.");
            }
        }

        [HttpPost("mark-all-read")]
        public async Task<IActionResult> MarkAllNotificationsAsRead()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User ID not found in token.");
            }

            try
            {
                await _notificationService.MarkAllNotificationsAsReadAsync(userId);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error marking all notifications as read for current user.");
                return StatusCode(500, "An error occurred while marking all notifications as read.");
            }
        }
    }
}

