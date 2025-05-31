import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminService } from '@/layout/service/admin.service';
import { Venue } from '@/layout/service/venue.model';
import { NotificationService } from '@/layout/service/notification.service';
import { AppNavbar } from "../layout/components/app.navbar";
import { VenueService } from '@/layout/service/venue.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-requests',
  standalone: true,
  imports: [CommonModule, RouterModule, AppNavbar],
  template: `
    <div class="min-h-screen bg-surface-900 text-surface-0 p-8">
    <app-navbar />
      <div class="container mx-auto">
        <h1 class="text-3xl font-bold mb-8">Venue Approval Requests</h1>

        <div *ngIf="loading" class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        </div>

        <div *ngIf="error" class="bg-red-900 border border-red-600 text-white px-4 py-3 rounded relative mb-4">
          <strong class="font-bold">Error!</strong>
          <span class="block sm:inline"> {{ error }}</span>
        </div>

        <div *ngIf="!loading && !error" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div *ngFor="let venue of pendingVenues" class="bg-surface-800 rounded-xl p-6 shadow-lg">
            <div class="mb-4">
              <img [src]="venue.mainPicture" class="w-full h-48 object-cover rounded-lg mb-4" />
              <h2 class="text-xl font-semibold text-white mb-2">{{ venue.title }}</h2>
              <p class="text-surface-300 mb-4">{{ venue.description }}</p>
              
              <div class="space-y-2 mb-4">
                <div class="flex items-center text-surface-200">
                  <i class="pi pi-map-marker mr-2"></i>
                  <span>{{ venue.location }}</span>
                </div>
                <div class="flex items-center text-surface-200">
                  <i class="pi pi-dollar mr-2"></i>
                  <span>{{ venue.pricePerDay | currency:'USD':'symbol':'1.0-0' }} per day</span>
                </div>
                <div *ngIf="venue.capacity" class="flex items-center text-surface-200">
                  <i class="pi pi-users mr-2"></i>
                  <span>Capacity: {{ venue.capacity }} guests</span>
                </div>
                <div class="flex items-center text-surface-200">
                  <i class="pi pi-user mr-2"></i>
                  <span>Owner: {{ venue.ownerDetails?.name || 'Loading...' }}</span>
                </div>
                <div class="flex items-center text-surface-200">
                  <i class="pi pi-envelope mr-2"></i>
                  <span>Email: {{ venue.ownerDetails?.email || 'Loading...' }}</span>
                </div>
                <div class="flex items-center text-surface-200">
                  <i class="pi pi-phone mr-2"></i>
                  <span>Phone: {{ venue.ownerDetails?.phone || 'Loading...' }}</span>
                </div>
              </div>

              <div class="flex space-x-4">
                <button 
                  (click)="approveVenue(venue.id)"
                  class="flex-1 py-2 px-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  Approve
                </button>
                <button 
                  (click)="rejectVenue(venue.id)"
                  class="flex-1 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Reject
                </button>
                <button 
                  (click)="previewVenue(venue.id)"
                  class="flex-1 py-2 px-4 bg-surface-600 text-white rounded-lg hover:bg-surface-700 transition-colors"
                >
                  Preview
                </button>
              </div>
            </div>
          </div>
        </div>

        <div *ngIf="!loading && !error && pendingVenues.length === 0" class="text-center py-8">
          <p class="text-surface-300">No pending venue requests</p>
        </div>
      </div>
    </div>
  `
})
export class AdminRequestsComponent implements OnInit {
  pendingVenues: (Venue & { ownerDetails?: { name: string; email: string; phone: string } })[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private adminService: AdminService,
    private notificationService: NotificationService,
    private venueService: VenueService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadPendingVenues();
  }

  loadPendingVenues(): void {
    this.loading = true;
    this.error = null;

    this.adminService.getPendingVenues().subscribe({
      next: (venues) => {
        this.pendingVenues = venues;
        venues.forEach(venue => {
          this.venueService.getOwnerDetails(venue.ownerId).subscribe({
            next: (ownerDetails) => {
              venue.ownerDetails = ownerDetails;
            },
            error: (err) => {
              console.error('Error loading owner details:', err);
              venue.ownerDetails = {
                name: 'Error loading owner',
                email: 'N/A',
                phone: 'N/A'
              };
            }
          });
        });
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading pending venues:', err);
        this.error = 'Failed to load pending venues. Please try again later.';
        this.loading = false;
      }
    });
  }

  approveVenue(venueId: string): void {
    this.adminService.approveVenue(venueId).subscribe({
      next: (venue) => {
        this.pendingVenues = this.pendingVenues.filter(v => v.id !== venueId);

      },
      error: (err) => {
        console.error('Error approving venue:', err);
        this.error = 'Failed to approve venue. Please try again.';
      }
    });
  }

  rejectVenue(venueId: string): void {
    this.adminService.rejectVenue(venueId, 'Rejected by admin').subscribe({
      next: (venue) => {
        this.pendingVenues = this.pendingVenues.filter(v => v.id !== venueId);
        this.notificationService.createNotification({
          userId: venue.ownerId,
          type: 'venue_rejected',
          message: `Your venue "${venue.title}" has been rejected.`,
          read: false,
          metadata: { venueId: venue.id }
        }).subscribe();
      },
      error: (err) => {
        console.error('Error rejecting venue:', err);
        this.error = 'Failed to reject venue. Please try again.';
      }
    });
  }

  previewVenue(venueId: string): void {
    this.router.navigate(['/details', venueId]);
  }
} 