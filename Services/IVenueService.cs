using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using VenueBookingApi.Api.Entities;
using VenueBookingApi.Api.Models;

namespace VenueBookingApi.Api.Services
{
    public interface IVenueService
    {
        Task<IEnumerable<Venue>> GetAllVenuesAsync();
        Task<Venue?> GetVenueByIdAsync(Guid id);
        Task<Venue> CreateVenueAsync(Venue venue, string ownerId);
        Task<bool> UpdateVenueAsync(Guid id, Venue venue, string userId);
        Task<bool> DeleteVenueAsync(Guid id, string userId);
        Task<IEnumerable<Venue>> GetVenuesByOwnerAsync(string ownerId);
        Task<IEnumerable<Venue>> GetPendingVenuesAsync();
        Task<Venue?> ApproveVenueAsync(Guid venueId, string adminId);
        Task<Venue?> RejectVenueAsync(Guid venueId, string adminId, string reason);
        Task<OwnerDetailsDto?> GetOwnerDetailsAsync(string ownerId);
        Task<IEnumerable<Venue>> GetAllVenuesAnyStatusAsync();
        Task<IEnumerable<VenueListDto>> GetVenueListByOwnerAsync(string ownerId);
    }
}

