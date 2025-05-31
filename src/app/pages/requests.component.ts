import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { VenueService } from "../layout/service/venue.service";
import { AppNavbar } from "../layout/components/app.navbar";
import { CommonModule } from "@angular/common";
import { forkJoin } from "rxjs";
import { NotificationService } from "../layout/service/notification.service";
@Component({
  selector: "app-requests",
  template: `
    <div class="min-h-screen bg-surface-900 text-surface-0">
      <app-navbar />
      <div class="container mx-auto px-4 py-8">
        <div *ngIf="loading" class="flex justify-center items-center h-64">
          <div
            class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"
          ></div>
        </div>

        <div
          *ngIf="error"
          class="bg-red-900 border border-red-600 text-white px-4 py-3 rounded-lg mb-6"
        >
          <strong class="font-bold">Error!</strong>
          <span class="block sm:inline">{{ error }}</span>
        </div>

        <div *ngIf="!loading">
          <div class="flex items-center justify-between mb-8">
            <h1 class="text-4xl font-bold text-white">Venue Requests</h1>
            <div class="text-surface-300">
              <i class="pi pi-inbox mr-2"></i>
              Total Requests: {{ requests.length }}
            </div>
            <button
              *ngIf="requests.length > 0"
              (click)="clearAllReadRequests()"
              class="bg-surface-700 hover:bg-surface-600 text-surface-300 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <i class="pi pi-trash"></i>
              Clear Read
            </button>
          </div>

          <div *ngIf="requests.length === 0" class="text-center py-12">
            <div class="text-surface-300 text-lg mb-4">
              <i class="pi pi-comments text-3xl"></i>
            </div>
            <p class="text-surface-300">No pending requests for this venue</p>
          </div>

          <div class="grid grid-cols-1 gap-6">
            <div
              *ngFor="let request of requests"
              [id]="request.id"
              class="bg-surface-800 p-6 rounded-xl shadow-lg border border-surface-700"
            >
              <div class="flex flex-col gap-4">
                <div class="flex justify-between items-start">
                  <div>
                    <div class="text-surface-300 flex items-center"></div>
                  </div>
                  <span
                    class="px-3 py-1 rounded-full text-sm"
                    [ngClass]="getStatusClass(request.status)"
                  >
                    {{ request.status | titlecase }}
                  </span>
                </div>

                <div
                  class="grid grid-cols-1 md:grid-cols-2 gap-4 text-surface-300"
                >
                  <h2 class="text-xl font-semibold text-white mb-1">
                    {{ request.customerName }}
                  </h2>
                  <div class="text-surface-300 flex items-center">
                    <i class="pi pi-envelope mr-2"></i>
                    {{ request.customerEmail }}
                  </div>
                </div>

                <div
                  class="grid grid-cols-1 md:grid-cols-2 gap-4 text-surface-300"
                >
                  <div class="flex items-center">
                    <i class="pi pi-phone mr-2"></i>
                    {{ request.customerPhone || "No phone provided" }}
                  </div>
                  <div class="flex items-center">
                    <i class="pi pi-users mr-2"></i>
                    {{ request.guestCount }} Guests
                  </div>
                </div>

                <div
                  class="grid grid-cols-1 md:grid-cols-2 gap-4 text-surface-300"
                >
                  <div class="flex items-center">
                    <i class="pi pi-calendar mr-2"></i>
                    {{ request.dates.start | date: "MMM d, y" }} -
                    {{ request.dates.end | date: "MMM d, y" }}
                  </div>
                  <div class="flex items-center">
                    <i class="pi pi-clock mr-2"></i>
                    Duration:
                    {{
                      request.duration
                        ? getDurationLabel(request.duration)
                        : "Not specified"
                    }}
                  </div>
                </div>

                <div
                  class="grid grid-cols-1 md:grid-cols-2 gap-4 text-surface-300"
                >
                  <div class="flex items-center">
                    <i class="pi pi-clock mr-2"></i>
                    Check-in:
                    {{
                      request.checkInTime
                        ? (request.checkInTime | date: "shortTime")
                        : "Not specified"
                    }}
                  </div>
                  <div class="flex items-center">
                    <i class="pi pi-clock mr-2"></i>
                    Check-out:
                    {{
                      request.checkOutTime
                        ? (request.checkOutTime | date: "shortTime")
                        : "Not specified"
                    }}
                  </div>
                </div>

                <div
                  class="grid grid-cols-1 md:grid-cols-2 gap-4 text-surface-300"
                >
                  <div class="flex items-center">
                    <i class="pi pi-wallet mr-2"></i>
                    Total Price: {{ request.totalPrice | currency }}
                  </div>
                  <div class="flex items-center">
                    <i class="pi pi-wallet mr-2"></i>
                    Paid Amount: {{ request.paidAmount | currency }}
                  </div>
                </div>

                <div
                  *ngIf="request.specialRequests"
                  class="mt-4 p-4 bg-surface-700 rounded-lg"
                >
                  <h3 class="text-white font-semibold mb-2">
                    Special Requests:
                  </h3>
                  <p class="text-surface-300 whitespace-pre-wrap">
                    {{ request.specialRequests }}
                  </p>
                </div>

                <div
                  *ngIf="request.status && request.status.trim().toLowerCase() === 'pending'"
                  class="flex gap-3 mt-6"
                >
                  <button
                    class="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                    (click)="acceptRequest(request.id)"
                  >
                    <i class="pi pi-check"></i>
                    Accept Request
                  </button>
                  <button
                    class="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                    (click)="denyRequest(request.id)"
                  >
                    <i class="pi pi-times"></i>
                    Deny Request
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  imports: [AppNavbar, CommonModule],
  styles: [
    `
      .highlight-request {
        animation: highlight 2s ease;
        border-left: 3px solid #3b82f6;
      }

      @keyframes highlight {
        0% {
          background-color: rgba(59, 130, 246, 0.3);
        }
        100% {
          background-color: transparent;
        }
      }
    `,
  ],
})
export class RequestsComponent implements OnInit {
  venueId!: string;
  requests: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private venueService: VenueService,
    private notificationService: NotificationService
  ) { }

  getDurationLabel(duration: string | null): string {
    if (!duration) return "Not specified";

    const hours = parseInt(duration, 10);

    if (isNaN(hours)) return "Invalid duration";

    switch (true) {
      case hours === 24:
        return "1 Day";
      case hours === 48:
        return "2 Days";
      case hours === 72:
        return "3 Days";
      case hours === 168:
        return "1 Week";
      case hours < 24:
        return `${hours} Hours`;
      default:
        return `${Math.floor(hours / 24)} Days`;
    }
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.venueId = params.get("venueId") || "";
      if (this.venueId) {
        this.loadRequests();
        this.handleFragment();
      } else {
        this.error =
          "No venue selected. Please select a venue to view requests.";
        this.loading = false;
      }
    });
  }

  clearAllReadRequests(): void {
    const readRequests = this.requests.filter(
      (request) => request.status !== "pending" && request.status !== "accepted"
    );

    if (readRequests.length === 0) return;

    this.loading = true;

    const deleteObservables = readRequests.map((request) =>
      this.venueService.deleteRequest(request.id)
    );

    forkJoin(deleteObservables).subscribe({
      next: () => {
        this.requests = this.requests.filter(
          (request) =>
            request.status === "pending" || request.status === "accepted"
        );
        this.loading = false;
      },
      error: (err) => {
        console.error("Error clearing requests:", err);
        this.error = "Failed to clear requests";
        this.loading = false;
      },
    });
  }

  loadRequests(): void {
    this.loading = true;
    this.error = null;

    this.venueService.getRequestsForVenue(this.venueId).subscribe({
      next: (requests) => {
        this.requests = requests.map((request: any) => {
          const startDate = request.startDate ? new Date(request.startDate) : null;
          const endDate = request.endDate ? new Date(request.endDate) : null;

          const checkInTime = request.weddingHallCheckInTime ? new Date(request.weddingHallCheckInTime) : null;
          const checkOutTime = request.weddingHallCheckoutTime ? new Date(request.weddingHallCheckoutTime) : null;
          const duration = request.durationDescription;
          const totalPrice = request.calculatedTotalPrice;
          const paidAmount = request.paidAmount;
          const customerPhone = request.customerPhone;

          return {
            ...request,
            dates: {
              start: startDate,
              end: endDate,
            },
            checkInTime,
            checkOutTime,
            duration,
            totalPrice,
            paidAmount,
            customerPhone,
            user: request.user || { phone: customerPhone },
            createdAt: request.createdAt ? new Date(request.createdAt) : null,
            updatedAt: request.updatedAt ? new Date(request.updatedAt) : null,
          };
        })
          .sort((a, b) => {
            if (a.status === 'pending' && b.status !== 'pending') return -1;
            if (a.status !== 'pending' && b.status === 'pending') return 1;
            if (a.status === 'accepted' && b.status !== 'accepted') return -1;
            if (a.status !== 'accepted' && b.status === 'accepted') return 1;
            if (a.status === 'denied' && b.status !== 'denied') return -1;
            if (a.status !== 'denied' && b.status === 'denied') return 1;
            const timeA = a.createdAt ? a.createdAt.getTime() : 0;
            const timeB = b.createdAt ? b.createdAt.getTime() : 0;
            return timeB - timeA;
          });

        this.loading = false;
      },
      error: (err) => {
        console.error("Error loading requests:", err);
        this.error = "Failed to load requests. Please try again later.";
        this.loading = false;
      },
    });
  }


  handleFragment(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        setTimeout(() => {
          const element = document.getElementById(fragment);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
            element.classList.add("highlight-request");
            setTimeout(() => {
              element.classList.remove("highlight-request");
            }, 2000);
          }
        }, 300);
      }
    });
  }

  acceptRequest(requestId: string): void {
    this.loading = true;
    this.error = null;

    this.venueService.acceptRequest(requestId).subscribe({
      next: (request) => {
        if (request.dates && request.dates.start) {
          const acceptedDate = request.dates.start;

          this.venueService.getVenueById(request.venueId).subscribe({
            next: (venue) => {
              if (!venue.availableDates) {
                venue.availableDates = [];
              }

              venue.availableDates.push(acceptedDate);

              this.venueService.updateVenue(venue.id, { availableDates: venue.availableDates }).subscribe({
                next: () => {
                  console.log("Successfully added accepted request date to availableDates in db.json.");
                },
                error: (err) => {
                  console.error("Error updating availableDates in db.json:", err);
                },
              });
            },
            error: (err) => {
              console.error("Error fetching venue details:", err);
            },
          });
        }

        this.loadRequests();
      },
      error: (err) => {
        console.error("Error accepting request:", err);
        this.error = "Failed to accept request. Please try again.";
        this.loading = false;
      },
    });
  }

  denyRequest(requestId: string): void {
    this.loading = true;
    this.error = null;

    this.venueService.denyRequest(requestId).subscribe({
      next: () => {
        this.loadRequests();
      },
      error: (err) => {
        console.error("Error denying request:", err);
        this.error = "Failed to deny request. Please try again.";
        this.loading = false;
      },
    });
  }

  getStatusClass(status: string): string {
    const normalized = (status || '').trim().toLowerCase();
    if (normalized === 'pending') return 'bg-yellow-900 text-yellow-400';
    if (normalized === 'accepted') return 'bg-green-900 text-green-400';
    if (normalized === 'denied') return 'bg-red-900 text-red-400';
    if (normalized === 'cancelled') return 'bg-gray-700 text-gray-400';
    return 'bg-surface-700 text-surface-300';
  }
}
