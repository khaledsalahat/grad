using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VenueBookingApi.Api.Data;
using VenueBookingApi.Api.Entities;
using VenueBookingApi.Api.Models;

namespace VenueBookingApi.Api.Services
{
    public interface IUserService
    {
        Task<IEnumerable<UserListDto>> GetAllUsersAsync();
        Task<UserDetailsDto> GetUserDetailsAsync(string userId);
        Task<IEnumerable<Venue>> GetUserVenuesAsync(string userId);
        Task<User> BlockUserAsync(string userId, string adminId);
        Task<User> UnblockUserAsync(string userId, string adminId);
        Task<bool> UpdateLastLoginAsync(string userId);
        Task<List<string>> GetAdminUserIdsAsync();
    }

    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly ILogger<UserService> _logger;

        public UserService(
            ApplicationDbContext context,
            UserManager<User> userManager,
            ILogger<UserService> logger)
        {
            _context = context;
            _userManager = userManager;
            _logger = logger;
        }

        public async Task<IEnumerable<UserListDto>> GetAllUsersAsync()
        {
            var users = await _userManager.Users
                .AsNoTracking()
                .Select(u => new UserListDto
                {
                    Id = u.Id,
                    UserName = u.UserName,
                    Email = u.Email,
                    FullName = u.FullName,
                    IsBlocked = u.IsBlocked,
                    VenueCount = u.Venues.Count,
                    CreatedAt = u.CreatedAt != default ? u.CreatedAt : DateTime.UtcNow,
                    LastLogin = u.LastLogin
                })
                .ToListAsync();

            foreach (var user in users)
            {
                var userEntity = await _userManager.FindByIdAsync(user.Id);
                if (userEntity != null)
                {
                    user.Roles = (await _userManager.GetRolesAsync(userEntity)).ToList();
                }
            }

            return users;
        }

        public async Task<UserDetailsDto> GetUserDetailsAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return null;
            }

            var roles = await _userManager.GetRolesAsync(user);

            return new UserDetailsDto
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                FullName = user.FullName,
                PhoneNumber = user.PhoneNumber,
                IsBlocked = user.IsBlocked,
                Roles = roles.ToList(),
                CreatedAt = user.CreatedAt != default ? user.CreatedAt : DateTime.UtcNow,
                LastLogin = user.LastLogin
            };
        }

        public async Task<IEnumerable<Venue>> GetUserVenuesAsync(string userId)
        {
            return await _context.Venues
                .AsNoTracking()
                .Where(v => v.OwnerId == userId)
                .ToListAsync();
        }

        public async Task<User> BlockUserAsync(string userId, string adminId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return null;
            }

            if (await _userManager.IsInRoleAsync(user, "Admin") && userId != adminId)
            {
                throw new InvalidOperationException("Cannot block another administrator");
            }

            user.IsBlocked = true;
            await _userManager.UpdateAsync(user);

            _logger.LogInformation($"User {userId} blocked by admin {adminId}");

            return user;
        }

        public async Task<User> UnblockUserAsync(string userId, string adminId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return null;
            }

            user.IsBlocked = false;
            await _userManager.UpdateAsync(user);

            _logger.LogInformation($"User {userId} unblocked by admin {adminId}");

            return user;
        }

        public async Task<bool> UpdateLastLoginAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return false;
            }

            user.LastLogin = DateTime.UtcNow;
            var result = await _userManager.UpdateAsync(user);

            return result.Succeeded;
        }

        public async Task<List<string>> GetAdminUserIdsAsync()
        {
            var admins = await _userManager.GetUsersInRoleAsync("Admin");
            return admins.Select(a => a.Id).Where(id => !string.IsNullOrEmpty(id)).ToList();
        }
    }
}
