import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { VenueService } from "@/layout/service/venue.service";
import { AuthService } from "@/layout/service/auth.service";
import { AppNavbar } from "../layout/components/app.navbar";
import { Router } from "@angular/router";
import { Venue } from "@/layout/service/venue.model";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: "my-venues",
  standalone: true,
  imports: [CommonModule, AppNavbar, ConfirmDialogModule, ToastModule],
  providers: [ConfirmationService, MessageService],
  template: `
    <div class="min-h-screen bg-surface-900 text-surface-0">
      <app-navbar />
      <p-toast></p-toast>
      <p-confirmDialog [style]="{width: '450px'}"></p-confirmDialog>
      
      <div *ngIf="loading" class="flex justify-center items-center h-64">
        <div
          class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"
        ></div>
      </div>

      <div
        *ngIf="error"
        class="bg-red-900 border border-red-600 text-white px-4 py-3 rounded relative"
        role="alert"
      >
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline"> {{ error }}</span>
      </div>

      <div *ngIf="!loading">
        <div class="container mx-auto px-4 py-8">
          <h1 class="text-4xl font-bold text-white mb-6">My Venues</h1>
          <button
            class="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            (click)="navigateToAddVenue()"
          >
            Add Venue
          </button>
          <div
            *ngIf="venues.length"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <div
              *ngFor="let venue of venues"
              class="bg-surface-800 p-6 rounded-lg shadow-lg relative"
              [ngClass]="{
                
              }"
            >
              <div *ngIf="venue.status && venue.status.toLowerCase() === 'rejected'" class="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow">Rejected</div>
              <div *ngIf="venue.status && venue.status.toLowerCase() === 'pending'" class="absolute top-2 right-2 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold shadow">Pending Approval</div>
              
              
              <div *ngIf="venue.mainPicture" class="my-2">
                <img [src]="venue.mainPicture" alt="Main Picture" class="w-full h-40 object-cover rounded" />
              </div>
              <h2 class="text-2xl font-semibold text-white mb-2">
                {{ venue.title }}
              </h2>
              
              <div class="flex flex-wrap gap-2 mt-4">
                <button
                  class="bg-primary-500 text-white px-4 py-2 rounded"
                  (click)="viewVenueDetails(venue.id)"
                >
                  View Details
                </button>
                <button
                  class="bg-yellow-500 text-white px-4 py-2 rounded"
                  (click)="navigateToNewBooking(venue.id)"
                >
                  Requests ({{ venue.requests?.length || 0 }})
                </button>
                <button
                  class="bg-red-500 text-white px-4 py-2 rounded"
                  (click)="confirmDelete(venue)"
                >
                  Delete Venue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class MyVenuesComponent implements OnInit {
  venues: Venue[] = [];
  loading: boolean = true;
  error: string | null = null;
  router = inject(Router);

  constructor(
    private venueService: VenueService,
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadMyVenues();
  }

  loadMyVenues(): void {
    this.loading = true;
    this.error = null;
    this.venueService.getMyVenues().subscribe({
      next: (venues) => {
        this.venues = Array.isArray(venues) ? venues : [];
        console.log('Loaded venues:', this.venues);
        this.loading = false;
      },
      error: (err) => {
        console.error("Error loading venues:", err);
        this.error = "Failed to load venues. Please try again later.";
        this.loading = false;
      },
    });
  }

  viewVenueDetails(venueId: string): void {
    this.router.navigate(["/edit-venue", venueId]);
  }

  acceptRequest(venueId: string, requestId: string): void {
    this.venueService.acceptRequest(requestId).subscribe({
      next: () => {
        this.loadMyVenues();
      },
      error: (err) => {
        console.error("Error accepting request:", err);
        this.error = "Failed to accept request. Please try again later.";
      },
    });
  }

  denyRequest(venueId: string, requestId: string): void {
    this.venueService.denyRequest(requestId).subscribe({
      next: () => {
        this.loadMyVenues();
      },
      error: (err) => {
        console.error("Error denying request:", err);
        this.error = "Failed to deny request. Please try again later.";
      },
    });
  }

  navigateToAddVenue(): void {
    this.router.navigate(["/add-venue"]);
  }

  navigateToNewBooking(venueId: string): void {
    this.router.navigate(["/requests"], {
      queryParams: { venueId, type: "venue-specific" },
    });
  }

  confirmDelete(venue: Venue): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete "${venue.title}"? This action cannot be undone.`,
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.deleteVenue(venue.id);
      }
    });
  }

  deleteVenue(venueId: string): void {
    this.venueService.deleteVenue(venueId).subscribe({
      next: () => {
        this.venues = this.venues.filter(venue => venue.id !== venueId);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Venue deleted successfully'
        });
      },
      error: (err) => {
        console.error("Error deleting venue:", err);
        this.error = "Failed to delete venue. Please try again later.";
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete venue'
        });
      }
    });
  }

  getVenueCount(): number {
    return this.venues.length;
  }

  getPhotoUrl(photo: any): string {
    return typeof photo === 'string' ? photo : (photo?.photoUrl || photo?.PhotoUrl || '');
  }
}
