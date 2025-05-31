import { Component, OnInit } from "@angular/core";
import { NotificationService } from "../layout/service/notification.service";
import { AuthService } from "../layout/service/auth.service";
import { AppNavbar } from "../layout/components/app.navbar";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: "app-notifications",
  template: `
    <div class="min-h-screen bg-surface-900 text-surface-0">
      <app-navbar />
      <div class="container mx-auto px-4 py-8">
        <h1 class="text-4xl font-bold text-white mb-6">Notifications</h1>

        <div *ngIf="loading" class="flex justify-center items-center h-64">
          <div
            class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"
          ></div>
        </div>

        <div *ngIf="!loading">
          <div *ngIf="notifications.length === 0" class="text-center py-12">
            <p class="text-surface-300">No notifications</p>
          </div>

          <div class="space-y-4">
            <div
              *ngFor="let notification of notifications"
              class="p-4 bg-surface-800 rounded-lg border border-surface-700 cursor-pointer"
              [class.border-primary-400]="!notification.read"
              [class.opacity-60]="notification.read"
              (click)="handleNotificationClick(notification)"
            >
              <div class="flex justify-between items-start">
                <div>
                  <p class="text-white">{{ notification.message }}</p>
                  <p class="text-surface-300 text-sm mt-2">
                    {{ notification.createdAt | date: "medium" }}
                  </p>
                </div>
                <button
                  (click)="markAsRead(notification); $event.stopPropagation()"
                  class="text-primary-400 hover:text-primary-300"
                >
                  <i class="pi pi-check"></i>
                </button>
              </div>
              <p class="text-xs text-yellow-400">read: {{ notification.read }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  imports: [AppNavbar, CommonModule],
})
export class NotificationsComponent implements OnInit {
  notifications: any[] = [];
  loading = true;

  constructor(
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications() {
    this.notificationService.getNotificationsByUser(true).subscribe(
      (notifications) => {
        this.notifications = Array.isArray(notifications)
          ? notifications.map(n => {
            const { isRead, ...rest } = n as any;
            return { ...rest, read: isRead };
          })
          : [];
        console.log('Mapped notifications:', this.notifications);
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching notifications:', error);
        this.loading = false;
      }
    );
  }

  handleNotificationClick(notification: any): void {
    console.log('Notification clicked:', notification);
    if (!notification.read) {
      this.notificationService.markAsRead(notification.id).subscribe({
        next: (res) => {
          console.log('Marked as read response:', res);
          notification.read = true;
          this.navigateForNotification(notification);
        },
        error: (err) => {
          console.error('Error marking as read:', err);
          this.navigateForNotification(notification);
        }
      });
    } else {
      this.navigateForNotification(notification);
    }
  }

  private navigateForNotification(notification: any): void {
    if (notification.type === 'venue-submission') {
      this.router.navigate(['/admin/requests']);
    } else if (notification.type === 'venue_approved' && notification.metadata?.venueId) {
      this.router.navigate(['/details', notification.metadata.venueId]);
    } else if (notification.type === 'venue_deleted' && notification.metadata?.venueId) {
      this.router.navigate(['/my-venues']);
    } else if (notification.type === 'booking_request' && notification.metadata?.requestId) {
      this.router.navigate(['/admin/requests'], { fragment: notification.metadata.requestId });
    } else if (notification.metadata?.requestId) {
      this.router.navigate(['/my-requests'], { fragment: notification.metadata.requestId });
    } else {
      this.getNotifications();
    }
  }

  markAsRead(notification: any): void {
    this.notificationService.markAsRead(notification.id).subscribe({
      next: (res) => {
        console.log('Marked as read (single) response:', res);
        notification.read = true;
      },
      error: (err) => {
        console.error('Error marking as read (single):', err);
      }
    });
  }

  markAllAsRead(): void {
    this.notificationService.markAllAsRead().subscribe({
      next: (res) => {
        console.log('Marked all as read response:', res);
        this.getNotifications();
      },
      error: (err) => {
        console.error('Error marking all as read:', err);
        this.getNotifications();
      }
    });
  }
}
