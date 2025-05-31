import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterLink, RouterModule } from "@angular/router";
import { twMerge } from "tailwind-merge";
import { StyleClassModule } from "primeng/styleclass";
import { AppLogo } from "./app.logo";
import { AuthService } from "@/layout/service/auth.service";
import { AsyncPipe } from "@angular/common";
import { NotificationService } from "@/layout/service/notification.service";
import { Notification } from "@/layout/service/notification.service";
import { AdminUsersComponent } from "@/pages/admin-users.component";
import { AuthGuard } from "../service/auth.guard";
import { RoleGuard } from "../service/role.guard";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    StyleClassModule,
    RouterLink,
    AppLogo,
    AsyncPipe,
  ],
  template: `
    <nav
      [class]="
        twMerge(
          'flex items-center relative z-[99999] justify-between py-6 w-[calc(100%-3rem)] max-h-[75px] mx-auto border-b border-white/10 border-dashed',
          className
        )
      "
    >
      <div class="flex items-center gap-8">
        <a routerLink="/">
          <app-logo className="text-3xl"></app-logo>
        </a>
      </div>
      <ul class="hidden lg:flex items-center gap-3">
        <li *ngFor="let data of navbarData; let i = index">
          <ng-container *ngIf="!data.visible || (typeof data.visible === 'function' ? data.visible() : true)">
            <a
              *ngIf="!data.content"
              [routerLink]="data.to"
              class="inline-flex items-center gap-2 rounded-full py-1 pr-2 pl-3 select-none transition-all cursor-pointer text-white/72 hover:text-white hover:bg-white/8 hover:shadow-[0px_10px_10px_-8px_rgba(18,18,23,0.02),0px_2px_2px_-1.5px_rgba(18,18,23,0.02),0px_1px_1px_-0.5px_rgba(18,18,23,0.02),0px_0px_0px_1px_rgba(18,18,23,0.02)]"
              [routerLinkActive]="['text-white', 'bg-white/16']"
              [routerLinkActiveOptions]="{ exact: data.to === '/' }"
            >
              <span class="text-base">{{ data.title }}</span>
            </a>
          </ng-container>
        </li>
      </ul>
      <ul class="hidden lg:flex items-center gap-10">
        <span
          *ngIf="authService.isAuthenticated$ | async"
          class="text-white font-medium ml-6 cursor-pointer text-lg"
          (click)="router.navigate(['/account'])"
        >
          {{ (authService.currentUser$ | async)?.username }}
        </span>
        <li *ngIf="authService.isAuthenticated$ | async" class="relative">
          <button (click)="toggleNotifications()" class="relative">
            <i class="pi pi-bell text-white text-40xl"></i>
            <span
              *ngIf="unreadNotificationsCount > 0"
              class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-3 w-3 flex items-center justify-center"
            >
              {{ unreadNotificationsCount }}
            </span>
          </button>
          <div
            *ngIf="showNotifications"
            class="absolute right-0 mt-2 w-80 bg-surface-800 shadow-lg rounded-lg overflow-hidden z-50 border border-surface-700"
          >
            <div
              class="p-4 border-b border-surface-700 flex justify-between items-center"
            >
              <h3 class="text-lg font-semibold text-white">Notifications</h3>
              <button
                *ngIf="notifications.length > 0"
                (click)="markAllAsRead()"
                class="text-primary-400 hover:text-primary-300 text-sm"
              >
                Mark all as read
              </button>
            </div>
            <div class="max-h-96 overflow-y-auto">
              <div
                *ngFor="let notification of notifications"
                (click)="handleNotificationClick(notification)"
                class="p-4 border-b border-surface-700 cursor-pointer transition-colors"
                [ngClass]="{
                  'bg-surface-700/50 hover:bg-surface-600': !notification.read,
                  'hover:bg-surface-700/30': notification.read,
                }"
              >
                <div class="flex items-start">
                  <div
                    *ngIf="!notification.read"
                    class="w-2 h-2 bg-primary-500 rounded-full mt-1.5 mr-2"
                  ></div>
                  <div class="flex-1">
                    <p
                      class="text-sm text-white"
                      [class.font-semibold]="!notification.read"
                    >
                      {{ notification.message }}
                    </p>
                    <p class="text-xs text-surface-400 mt-1">
                      {{ notification.createdAt | date: "mediumTime" }} •
                      {{ notification.createdAt | date: "shortDate" }}
                    </p>
                  </div>
                </div>
              </div>
              <div
                *ngIf="notifications.length === 0"
                class="p-4 text-center text-surface-400"
              >
                No notifications
              </div>
            </div>
          </div>
        </li>
        <li *ngIf="!(authService.isAuthenticated$ | async)">
          <a routerLink="/signin" class="button-regular"> Log In </a>
        </li>
      </ul>
      <div class="relative lg:hidden block">
        <a
          pStyleClass="@next"
          enterFromClass="hidden"
          enterActiveClass="animate-scalein"
          leaveActiveClass="animate-fadeout"
          leaveToClass="hidden"
          [hideOnOutsideClick]="true"
          class="w-10 h-10 cursor-pointer inline-flex items-center justify-center rounded-full bg-surface-0 text-surface-950 hover:bg-surface-200"
        >
          <i class="pi pi-bars"></i>
        </a>
        <div
          class="hidden absolute top-[calc(100%+0.5rem)] max-h-96 overflow-auto left-auto !right-0 w-60 p-2 rounded-2xl shadow-blue-card flex flex-col bg-surface-0"
        >
          <div class="flex flex-col">
            <div *ngFor="let data of navbarData" class="mt-4">
              <span class="px-3 !py-2 text-surface-950 font-medium">{{
                data.title
              }}</span>
              <div class="flex flex-col gap-1 my-2">
                <a
                  *ngIf="!data.content"
                  [routerLink]="data.to"
                  class="py-2 px-3 rounded-lg hover:bg-surface-200 font-medium text-surface-500 hover:text-surface-950"
                >
                  {{ data.title }}
                </a>
                <a
                  *ngFor="let item of data.content; let index = index"
                  [routerLink]="item.to"
                  class="py-2 px-3 rounded-lg hover:bg-surface-200 font-medium text-surface-500 hover:text-surface-950"
                >
                  {{ item.label }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
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
      .mark-all-read-btn {
        transition: all 0.2s ease;
      }
      .mark-all-read-btn:hover {
        opacity: 0.8;
      }
    `,
  ],
})
export class AppNavbar implements OnInit {
  @Input() className?: string;

  unreadNotificationsCount = 0;
  showNotifications = false;
  notifications: any[] = [];

  constructor(
    public router: Router,
    public authService: AuthService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        const userId = this.authService.getCurrentUserId();
        if (userId) {
          this.loadUnreadNotificationsCount(userId);
          this.loadNotifications(userId);
        }
      }
    });
  }

  markAllAsRead(): void {
    this.notificationService.markAllAsRead().subscribe({
      next: () => {
        this.notifications = this.notifications.map((n) => ({ ...n, read: true }));
        this.unreadNotificationsCount = 0;
      },
      error: (err) => {
        console.error("Error marking all as read:", err);
        const userId = this.authService.getCurrentUserId();
        if (userId) {
          this.loadNotifications(userId);
          this.loadUnreadNotificationsCount(userId);
        }
      },
    });
  }

  private loadUnreadNotificationsCount(userId: string): void {
    this.notificationService.getNotificationsByUser().subscribe({
      next: (notifications) => {
        const safeNotifications = Array.isArray(notifications) ? notifications : [];
        this.unreadNotificationsCount = safeNotifications.filter(
          (notification) => !notification.read
        ).length;
      },
      error: () => {
        this.unreadNotificationsCount = 0;
      },
    });
  }

  private loadNotifications(userId: string): void {
    this.notificationService.getNotificationsByUser().subscribe({
      next: (notifications) => {
        this.notifications = Array.isArray(notifications) ? notifications : [];
      },
      error: (err) => {
        console.error("Error loading notifications:", err);
        this.notifications = [];
      },
    });
  }

  handleNotificationClick(notification: any): void {
    if (!notification.read) {
      this.notificationService.markAsRead(notification.id).subscribe({
        next: () => {
          notification.read = true;
          this.unreadNotificationsCount--;
        },
      });
    }

    if (notification.type === 'venue-submission') {
      if (this.authService.isAdmin) {
        this.router.navigate(['/admin/requests']);
      } else {
        this.router.navigate(['/pending-venues']);
      }
    } else if (notification.type === 'venue_approved' && notification.metadata?.venueId) {
      this.router.navigate(['/details', notification.metadata.venueId]);
    } else if (notification.type === 'venue_deleted' && notification.metadata?.venueId) {
      this.router.navigate(['/my-venues']);
    } else if (notification.metadata?.requestId) {
      this.router.navigate(['/my-requests'], { fragment: notification.metadata.requestId });
    }

    this.showNotifications = false;
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;

    if (this.showNotifications) {
      const userId = this.authService.getCurrentUserId();
      if (userId) {
        this.loadNotifications(userId);
      }
    }
  }

  twMerge = twMerge;

  navbarData = [
    {
      id: "home",
      title: "Home",
      to: "/",
      content: null,
      visible: () => true,
    },
    {
      id: "chalets",
      title: "Chalets",
      to: "/chalets",
      content: null,
      visible: () => true,
    },
    {
      id: "wedding",
      title: "Wedding Halls",
      to: "/wedding-halls",
      content: null,
      visible: () => true,
    },
    {
      id: "my-venues",
      title: "My Venues",
      to: "/my-venues",
      content: null,
      visible: () =>
        this.authService.isAuthenticated && this.authService.isOwner,
    },
    {
      id: "my-requests",
      title: "My Requests",
      to: "/my-requests",
      content: null,
      visible: () => this.authService.isAuthenticated,
    },
    {
      id: "admin-requests",
      title: "Venue Requests",
      to: "/admin/requests",
      content: null,
      visible: () => this.authService.isAuthenticated && this.authService.isAdmin,
    },
    {
      id: "admin-users",
      title: "User Management",
      to: "/users",
      content: null,
      visible: () => this.authService.isAuthenticated && this.authService.isAdmin,
    }

  ];
}
