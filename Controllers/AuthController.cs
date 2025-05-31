using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using VenueBookingApi.Api.Entities;
using VenueBookingApi.Api.Models;
using Microsoft.Extensions.Configuration;
using System;
using VenueBookingApi.Api.Services;
using Microsoft.EntityFrameworkCore;

namespace VenueBookingApi.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly ILogger<AuthController> _logger;
        private readonly IUserService _userService;

        public AuthController(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IConfiguration configuration,
            ILogger<AuthController> logger,
            IUserService userService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _logger = logger;
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (registerDto.Password != registerDto.ConfirmPassword)
                {
                    ModelState.AddModelError("ConfirmPassword", "Password and Confirm Password do not match.");
                    return BadRequest(ModelState);
                }

                var user = new User
                {
                    UserName = registerDto.Username,
                    Email = registerDto.Email,
                    FullName = string.IsNullOrWhiteSpace(registerDto.FullName) ? registerDto.Username : registerDto.FullName,
                    PhoneNumber = registerDto.PhoneNumber,
                    CreatedAt = DateTime.UtcNow
                };

                var result = await _userManager.CreateAsync(user, registerDto.Password);

                if (!result.Succeeded)
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError(error.Code, error.Description);
                    }
                    return BadRequest(ModelState);
                }

                if (registerDto.IsOwner)
                {
                    await _userManager.AddToRoleAsync(user, "Owner");
                }
                else
                {
                    await _userManager.AddToRoleAsync(user, "User");
                }

                _logger.LogInformation($"User {user.Email} registered successfully.");

                var token = await GenerateJwtToken(user);

                return Ok(new
                {
                    Token = token,
                    UserId = user.Id,
                    Email = user.Email,
                    Username = user.UserName,
                    Role = registerDto.IsOwner ? "Owner" : "User"
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in Register endpoint");
                return StatusCode(500, new { message = ex.Message, stackTrace = ex.StackTrace });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null)
            {
                _logger.LogWarning($"Login attempt failed for email {loginDto.Email}: User not found.");
                return Unauthorized(new { Message = "Email not found" });
            }

            if (user.IsBlocked)
            {
                _logger.LogWarning($"Login attempt by blocked user {user.Email}");
                return Unauthorized(new { Message = "Your account has been blocked. Please contact support." });
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, lockoutOnFailure: false);

            if (!result.Succeeded)
            {
                _logger.LogWarning($"Login attempt failed for user {user.Email}: Invalid password.");
                return Unauthorized(new { Message = "Invalid credentials" });
            }

            await _userService.UpdateLastLoginAsync(user.Id);

            var roles = await _userManager.GetRolesAsync(user);
            var token = await GenerateJwtToken(user);

            _logger.LogInformation($"User {user.Email} logged in successfully.");

            return Ok(new
            {
                Token = token,
                UserId = user.Id,
                Email = user.Email,
                Username = user.UserName,
                Role = roles.FirstOrDefault() ?? "User"
            });
        }

        [HttpGet("check-email")]
        public async Task<IActionResult> CheckEmail(string email)
        {

            try
            {
                if (string.IsNullOrWhiteSpace(email))
                    return BadRequest(new { available = false, message = "Email is required." });

                var user = await _userManager.FindByEmailAsync(email);
                return Ok(new { available = user == null });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in CheckEmail endpoint");
                return StatusCode(500, new { available = false, message = "Internal server error." });
            }
        }


        [HttpGet("check-username")]
        [AllowAnonymous]
        public async Task<IActionResult> CheckUsername(string username)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(username))
                    return BadRequest(new { available = false, message = "Username is required." });

                var user = await _userManager.Users.FirstOrDefaultAsync(u => u.UserName == username);
                return Ok(new { available = user == null });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in CheckUsername endpoint");
                return StatusCode(500, new { available = false, message = "Internal server error." });
            }
        }

        private async Task<string> GenerateJwtToken(User user)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.UtcNow.AddDays(Convert.ToDouble(jwtSettings["ExpireDays"]));

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.UserName!)
            };

            var userRoles = await _userManager.GetRolesAsync(user);
            foreach (var role in userRoles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
