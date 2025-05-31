using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using VenueBookingApi.Api.Data;
using VenueBookingApi.Api.Entities;
using VenueBookingApi.Api.Repositories;

namespace VenueBookingApi.Api.Services
{
    public class NotificationService : INotificationService
    {
        private readonly IGenericRepository<Notification> _notificationRepository;
        private readonly ApplicationDbContext _context;

        public NotificationService(IGenericRepository<Notification> notificationRepository, ApplicationDbContext context)
        {
            _notificationRepository = notificationRepository;
            _context = context;
        }

        public async Task<Notification?> CreateNotificationAsync(string userId, string type, string message, Guid? relatedEntityId, string? relatedEntityType)
        {
            if (string.IsNullOrWhiteSpace(userId) || string.IsNullOrWhiteSpace(type) || string.IsNullOrWhiteSpace(message))
            {
                return null;
            }

            var notification = new Notification
            {
                UserId = userId,
                Type = type,
                Message = message,
                RelatedEntityId = relatedEntityId,
                RelatedEntityType = relatedEntityType,
                IsRead = false,
                CreatedAt = DateTime.UtcNow
            };

            await _notificationRepository.AddAsync(notification);
            await _notificationRepository.SaveChangesAsync();
            return notification;
        }

        public async Task<Notification?> CreateNotificationAsync(string userId, string type, string message, bool isUrgent, Dictionary<string, object> metadata)
        {
            if (string.IsNullOrWhiteSpace(userId) || string.IsNullOrWhiteSpace(type) || string.IsNullOrWhiteSpace(message))
            {
                return null;
            }

            string? metadataJson = metadata != null && metadata.Count > 0
                ? System.Text.Json.JsonSerializer.Serialize(metadata)
                : null;

            var notification = new Notification
            {
                UserId = userId,
                Type = type,
                Message = message,
                IsRead = false,
                CreatedAt = DateTime.UtcNow,
            };

            await _notificationRepository.AddAsync(notification);
            await _notificationRepository.SaveChangesAsync();
            return notification;
        }

        public async Task<IEnumerable<Notification>> GetNotificationsByUserIdAsync(string userId, bool includeRead = false)
        {
            var query = _context.Notifications.Where(n => n.UserId == userId);

            if (!includeRead)
            {
                query = query.Where(n => !n.IsRead);
            }

            return await query.OrderByDescending(n => n.CreatedAt).ToListAsync();
        }

        public async Task<bool> MarkAllNotificationsAsReadAsync(string userId)
        {
            var notificationsToUpdate = await _context.Notifications
                .Where(n => n.UserId == userId && !n.IsRead)
                .ToListAsync();

            if (!notificationsToUpdate.Any())
            {
                return true;
            }

            foreach (var notification in notificationsToUpdate)
            {
                notification.IsRead = true;
            }
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> MarkNotificationAsReadAsync(Guid notificationId, string userId)
        {
            var notification = await _notificationRepository.GetByIdAsync(notificationId);
            if (notification == null || notification.UserId != userId)
            {
                return false;
            }

            if (notification.IsRead)
            {
                return true;
            }

            notification.IsRead = true;
            _notificationRepository.Update(notification);
            await _notificationRepository.SaveChangesAsync();
            return true;
        }
    }
}

