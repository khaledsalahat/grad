import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { forkJoin, map, Observable, switchMap } from "rxjs";
import { v4 as uuidv4 } from "uuid";

export interface Notification {
  id: string;
  userId: string;
  type: string;
  message: string;
  read: boolean;
  createdAt: string;
  metadata: any;
}

@Injectable({ providedIn: "root" })
export class NotificationService {
  private apiUrl = "Notifications";

  constructor(private api: ApiService) { }

  getNotificationsByUser(includeRead: boolean = true): Observable<Notification[]> {
    return this.api.get<Notification[]>(`/Notifications?includeRead=${includeRead}`);
  }

  markAsRead(notificationId: string): Observable<any> {
    // Remove duplicate /api/ in the URL
    return this.api.post(`Notifications/${notificationId}/mark-read`, {}).pipe(
      map(() => ({ success: true }))
    );
  }

  markAllAsRead(): Observable<any> {
    // Remove duplicate /api/ in the URL
    return this.api.post(`Notifications/mark-all-read`, {}).pipe(
      map(() => ({ success: true }))
    );
  }

  createNotification(
    notification: Omit<Notification, "id" | "createdAt">
  ): Observable<Notification> {
    const newNotification = {
      ...notification,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      message: notification.message?.replace('undefined', 'N/A') || "No message provided",
    };

    console.log("Notification payload:", newNotification);

    return this.api.post<Notification>(this.apiUrl, newNotification);
  }
}
