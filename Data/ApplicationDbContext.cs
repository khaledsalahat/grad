using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;
using VenueBookingApi.Api.Entities;
using VenueBookingApi.Api.Models;

namespace VenueBookingApi.Api.Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }



        public DbSet<Venue> Venues { get; set; }
        public DbSet<VenuePhoto> VenuePhotos { get; set; }
        public DbSet<VenueAmenity> VenueAmenities { get; set; }
        public DbSet<VenuePricingOption> VenuePricingOptions { get; set; }
        public DbSet<VenueAvailability> VenueAvailabilities { get; set; }
        public DbSet<VenueAvailabilityTimeSlot> VenueAvailabilityTimeSlots { get; set; }
        public DbSet<VenueGlobalTimeSlot> VenueGlobalTimeSlots { get; set; }
        public DbSet<VenueUnavailableDate> VenueUnavailableDates { get; set; }
        public DbSet<BookingRequest> BookingRequests { get; set; }
        public DbSet<Notification> Notifications { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Venue>()
                .Property(v => v.PricePerDay)
                .HasColumnType("decimal(18,2)");
            builder.Entity<Venue>()
                .Property(v => v.PricePerHour)
                .HasColumnType("decimal(18,2)");

            builder.Entity<BookingRequest>()
                .Property(br => br.CalculatedTotalPrice)
                .HasColumnType("decimal(18,2)");
            builder.Entity<BookingRequest>()
                .Property(br => br.PaidAmount)
                .HasColumnType("decimal(18,2)");
            
            builder.Entity<VenuePricingOption>()
                .Property(vpo => vpo.Price)
                .HasColumnType("decimal(18,2)");

            builder.Entity<BookingRequest>()
                .HasOne(br => br.User)
                .WithMany(u => u.BookingRequests)
                .HasForeignKey(br => br.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<BookingRequest>()
                .HasOne(br => br.Venue)
                .WithMany(v => v.BookingRequests)
                .HasForeignKey(br => br.VenueId)
                .OnDelete(DeleteBehavior.Restrict);
            
            builder.Entity<VenueUnavailableDate>()
                .HasOne(vud => vud.BookingRequest)
                .WithMany()
                .HasForeignKey(vud => vud.BookingRequestId)
                .OnDelete(DeleteBehavior.SetNull); 


        }
    }
}

