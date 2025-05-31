import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable, tap, catchError, of } from "rxjs";
import { NotificationService } from "./notification.service";
import { Venue } from "@/layout/service/venue.model";
import { HttpParams } from "@angular/common/http";

interface User {
    id: string;
    userName: string;
    email: string;
    fullName: string;
    phoneNumber: string;
    roles: string[];
    isBlocked: boolean;
    createdAt: string;
    lastLogin: string;
    venueCount?: number;
}

@Injectable({ providedIn: 'root' })
export class AdminService {
    private apiUrl = 'admin';

    constructor(private api: ApiService, private notificationService: NotificationService) { }

    getPendingVenues(): Observable<Venue[]> {
        return this.api.get<Venue[]>(`venues?status=pending`).pipe(
            tap(venues => console.log("Pending venues fetched:", venues)),
            catchError(error => {
                console.error('Error fetching pending venues:', error);
                throw error;
            })
        );
    }

    approveVenue(venueId: string): Observable<Venue> {
        return this.api.post<Venue>(`admin/venues/${venueId}/approve`, {}).pipe(
            tap(venue => this.notifyOwner(venue, 'approved')),
            catchError(error => {
                console.error('Error approving venue:', error);
                throw error;
            })
        );
    }

    rejectVenue(venueId: string, comment: string): Observable<Venue> {
        return this.api.post<Venue>(`admin/venues/${venueId}/reject`, { reason: comment }).pipe(
            tap(venue => this.notifyOwner(venue, 'rejected')),
            catchError(error => {
                console.error('Error rejecting venue:', error);
                throw error;
            })
        );
    }

    deleteVenue(venueId: string): Observable<void> {
        return this.api.delete<void>(`venues/${venueId}`).pipe(
            tap(() => console.log(`Venue ${venueId} deleted`)),
            catchError(error => {
                console.error('Error deleting venue:', error);
                throw error;
            })
        );
    }

    getAllUsers(): Observable<User[]> {
        return this.api.get<User[]>(`users`).pipe(
            tap(users => console.log("All users fetched:", users)),
            catchError(error => {
                console.error('Error fetching all users:', error);
                throw error;
            })
        );
    }

    getUserDetails(userId: string): Observable<User> {
        return this.api.get<User>(`users/${userId}`).pipe(
            tap(user => console.log("User details fetched:", user)),
            catchError(error => {
                console.error(`Error fetching user ${userId} details:`, error);
                throw error;
            })
        );
    }

    getUserVenues(userId: string): Observable<Venue[]> {
        return this.api.get<Venue[]>(`venues/owner/${userId}`).pipe(
            tap(venues => console.log(`Venues for user ${userId} fetched:`, venues)),
            catchError(error => {
                console.error(`Error fetching venues for user ${userId}:`, error);
                throw error;
            })
        );
    }

    toggleUserBlock(userId: string, blockStatus: boolean): Observable<User> {
        const action = blockStatus ? 'block' : 'unblock';
        return this.api.patch<User>(`users/${userId}/${action}`, {}).pipe(
            tap(user => {
                console.log(`User ${userId} ${action}ed:`, user);
                this.notifyUserOfBlockStatus(user, blockStatus);
            }),
            catchError(error => {
                console.error(`Error ${action}ing user ${userId}:`, error);
                throw error;
            })
        );
    }

    private notifyOwner(venue: Venue, action: 'approved' | 'rejected'): void {
        const message = action === 'approved'
            ? `Your venue "${venue.title}" has been approved and is now visible to users.`
            : `Your venue "${venue.title}" was rejected.`;

        this.notificationService.createNotification({
            userId: venue.ownerId,
            type: action === 'approved' ? 'venue_approved' : 'venue_rejected',
            message: message,
            read: false,
            metadata: {
                venueId: venue.id,
                action: action
            }
        }).subscribe();
    }

    private notifyUserOfBlockStatus(user: User, isBlocked: boolean): void {
        if (!user) return;

        const message = isBlocked
            ? `Your account has been blocked by an administrator. Please contact support for assistance.`
            : `Your account has been unblocked and is now active again.`;

        this.notificationService.createNotification({
            userId: user.id,
            type: isBlocked ? 'account_blocked' : 'account_unblocked',
            message: message,
            read: false,
            metadata: {
                action: isBlocked ? 'blocked' : 'unblocked'
            }
        }).subscribe();
    }
}
