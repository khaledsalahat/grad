using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;
using VenueBookingApi.Api.Services;

namespace VenueBookingApi.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("me")]
        public async Task<IActionResult> GetCurrentUser()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                var claims = User.Claims.Select(c => new { c.Type, c.Value }).ToList();
                Console.WriteLine($"[UsersController] Unauthorized: No userId in JWT. Claims: {System.Text.Json.JsonSerializer.Serialize(claims)}");
                return Unauthorized("User ID not found in token. Make sure your Authorization header is: Bearer <token> (no quotes).");
            }

            var user = await _userService.GetUserDetailsAsync(userId);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            return Ok(user);
        }
    }
}
