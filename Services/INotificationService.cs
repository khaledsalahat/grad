using System.Collections.Generic;
using System.Threading.Tasks;
using VenueBookingApi.Api.Entities;
using System;

namespace VenueBookingApi.Api.Services
{
    public interface INotificationService
    {
        Task<Notification?> CreateNotificationAsync(string userId, string type, string message, Guid? relatedEntityId, string? relatedEntityType);
        Task<Notification?> CreateNotificationAsync(string userId, string type, string message, bool isUrgent, Dictionary<string, object> metadata);
        Task<IEnumerable<Notification>> GetNotificationsByUserIdAsync(string userId, bool includeRead = false);
        Task<bool> MarkNotificationAsReadAsync(Guid notificationId, string userId);
        Task<bool> MarkAllNotificationsAsReadAsync(string userId);
    }
}

