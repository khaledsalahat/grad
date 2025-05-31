import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { VenueService } from "../layout/service/venue.service";
import { AuthService } from "../layout/service/auth.service";
import { AppNavbar } from "../layout/components/app.navbar";
import { CommonModule } from "@angular/common";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ToastModule } from "primeng/toast";
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
  selector: "app-my-requests",
  template: `
    <div class="min-h-screen bg-surface-900 text-surface-0">
      <app-navbar />
      <p-toast></p-toast>
      <p-confirmDialog
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        acceptButtonStyleClass="p-button-danger"
        rejectButtonStyleClass="p-button-text"
      ></p-confirmDialog>
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
          <h1 class="text-4xl font-bold text-white mb-6">
            My Booking Requests
          </h1>

          <div *ngIf="requests.length === 0" class="text-center py-12">
            <div class="text-surface-300 text-lg mb-4">
              <i class="pi pi-comments text-3xl"></i>
            </div>
            <p class="text-surface-300">No booking requests found</p>
          </div>

          <div class="grid grid-cols-1 gap-6">
            <div
              *ngFor="let request of requests"
              class="bg-surface-800 p-6 rounded-xl shadow-lg border border-surface-700"
            >
              <div class="flex flex-col gap-4">
                <div class="flex justify-between items-start">
                  <div>
                    <h2 class="text-xl font-semibold text-white mb-1">
                      {{ request.venue.title }}
                    </h2>
                    <div class="text-surface-300 flex items-center">
                      <i class="pi pi-map-marker mr-2"></i>
                      {{ request.venue.location }}
                    </div>
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
                  <div class="flex items-center">
                    <div class="flex items-center">
                      <i class="pi pi-phone mr-2"></i>
                      Owner's Phone:
                      {{ request.venue.ownerPhone || request.venue.owner?.phoneNumber || request.venue.phoneNumber || 'Not available' }}
                    </div>
                  </div>
                  <div class="flex items-center">
                    <i class="pi pi-envelope mr-2"></i>
                    Owner's Email:
                    {{ request.venue.ownerEmail || request.venue.owner?.email || 'Not available' }}
                  </div>
                  <div class="flex items-center">
                    <i class="pi pi-users mr-2"></i>
                    {{ request.guestCount }} Guests
                  </div>
                </div>
              </div>

              <div
                class="grid grid-cols-1 md:grid-cols-2 gap-4 text-surface-300"
              >
                <div class="flex items-center">
                  <i class="pi pi-clock mr-2"></i>
                  Check-in:
                  {{
                    request.checkInTime && request.checkInTime !== '0001-01-01T00:00:00'
                      ? (request.checkInTime | date: "shortTime")
                      : "Not specified"
                  }}
                </div>
                <div class="flex items-center">
                  <i class="pi pi-clock mr-2"></i>
                  Check-out:
                  {{
                    request.checkOutTime && request.checkOutTime !== '0001-01-01T00:00:00'
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
                  Total price: {{ request.totalPrice | currency }}
                </div>
                <div class="flex items-center">
                  <i class="pi pi-wallet mr-2"></i>
                  Paid Amount: {{ request.paidAmount | currency }}
                </div>
              </div>

              <div *ngIf="request.status && request.status.trim().toLowerCase() === 'pending'" class="mt-4">
                <button
                  class="px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded transition disabled:opacity-50"
                  (click)="confirmCancelRequest(request)"
                  [disabled]="request.cancelling"
                >
                  <i class="pi pi-times mr-2"></i> Cancel Booking
                </button>
                <span *ngIf="request.cancelling" class="ml-2 text-surface-300">
                  Cancelling...
                </span>
                <span *ngIf="request.cancelError" class="ml-2 text-red-400">
                  {{ request.cancelError }}
                </span>
              </div>

              <div
                *ngIf="request.specialRequests"
                class="mt-4 p-4 bg-surface-700 rounded-lg"
              >
                <h3 class="text-white font-semibold mb-2">
                  Your Special Requests:
                </h3>
                <p class="text-surface-300 whitespace-pre-wrap">
                  {{ request.specialRequests }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
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
  imports: [AppNavbar, CommonModule, ConfirmDialogModule, ToastModule],
  providers: [ConfirmationService, MessageService],
})
export class MyRequestsComponent implements OnInit {
  requests: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private venueService: VenueService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.loadRequests(userId);
      this.handleFragment();
    } else {
      this.error = "User not logged in. Please log in again.";
      this.loading = false;
    }
  }

  loadRequests(userId: string): void {
    this.loading = true;
    this.error = null;

    this.venueService.getRequestsByUser(userId).subscribe({
      next: (requests) => {
        this.requests = requests.sort((a, b) => {
          if (a.status === "pending" && b.status !== "pending") return -1;
          if (a.status !== "pending" && b.status === "pending") return 1;
          if (a.status === "accepted" && b.status !== "accepted") return -1;
          if (a.status !== "accepted" && b.status === "accepted") return 1;
          if (a.status === "denied" && b.status !== "denied") return -1;
          if (a.status !== "denied" && b.status === "denied") return 1;
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
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

  confirmCancelRequest(request: any): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to cancel this booking?',
      header: 'Cancel Booking',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cancelRequest(request);
      }
    });
  }

  private notifyOwnerOfCancellation(request: any): void {
    if (request.venue && request.venue.ownerId) {
      this.venueService.notifyOwnerOfCancellation(
        request.venue.ownerId,
        request.venue.title,
        request.id,
        request.venue.id
      ).subscribe();
    }
  }

  cancelRequest(request: any): void {
    if (request.cancelling) return;
    request.cancelling = true;
    request.cancelError = null;
    this.venueService.cancelRequest(request.id).subscribe({
      next: () => {
        request.status = 'cancelled';
        request.cancelling = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Booking Cancelled',
          detail: 'Your booking has been cancelled successfully.'
        });
        this.notifyOwnerOfCancellation(request);
      },
      error: (err: any) => {
        request.cancelError = 'Failed to cancel. Please try again.';
        request.cancelling = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Cancellation Failed',
          detail: 'Failed to cancel booking. Please try again.'
        });
      }
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
