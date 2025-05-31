using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace VenueBookingApi.Api.Models
{
    public class UserListDto
    {
        public string? Id { get; set; }
        [JsonPropertyName("username")]
        public string? UserName { get; set; }
        public string? Email { get; set; }
        [JsonPropertyName("fullName")]
        public string? FullName { get; set; }
        public bool IsBlocked { get; set; }
        public int VenueCount { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? LastLogin { get; set; }
        [JsonPropertyName("roles")]
        public List<string> Roles { get; set; } = new List<string>();
    }

    public class UserDetailsDto
    {
        public string? Id { get; set; }
        [JsonPropertyName("username")]
        public string? UserName { get; set; }
        public string? Email { get; set; }
        [JsonPropertyName("fullName")]
        public string? FullName { get; set; }
        [JsonPropertyName("phoneNumber")]
        public string? PhoneNumber { get; set; }
        public bool IsBlocked { get; set; }
        public bool IsOwner { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime? LastLogin { get; set; }
        [JsonPropertyName("roles")]
        public List<string> Roles { get; set; } = new List<string>();
    }
}
