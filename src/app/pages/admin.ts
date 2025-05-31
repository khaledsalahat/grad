import { Component, OnInit } from '@angular/core';
import { VenueService } from '../layout/service/venue.service';
import { Venue } from '../layout/service/venue.model';
import { CommonModule } from '@angular/common';
import { AdminService } from '@/layout/service/admin.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-admin-approvals',
    imports: [CommonModule, FormsModule],
    template: `
          <div class="p-6">
            <h2 class="text-2xl font-bold mb-4">Pending Venue Approvals</h2>
            
            <div *ngFor="let venue of pendingVenues" class="mb-4 p-4 border rounded">
              <h3 class="text-xl font-semibold">{{ venue.title }}</h3>
              <p class="text-gray-600">{{ venue.description }}</p>
              
              <div class="mt-4 flex gap-2">
                <button (click)="approve(venue.id)" class="bg-green-500 text-white px-4 py-2 rounded">
                  Approve
                </button>
                <button (click)="reject(venue.id)" class="bg-red-500 text-white px-4 py-2 rounded">
                  Reject
                </button>
              </div>
              
              <textarea *ngIf="rejectingId === venue.id" 
                        [(ngModel)]="rejectionComment"
                        class="mt-2 p-2 border rounded w-full"
                        placeholder="Enter rejection reason..."></textarea>
            </div>
          </div>
        `
})
export class AdminComponent implements OnInit {
    pendingVenues: Venue[] = [];
    rejectingId?: string;
    rejectionComment = '';

    constructor(private adminService: AdminService) { }

    ngOnInit() {
        this.adminService.getPendingVenues().subscribe(venues => {
            this.pendingVenues = venues;
        });
    }

    approve(venueId: string): void {
        this.adminService.approveVenue(venueId).subscribe(() => {
            this.pendingVenues = this.pendingVenues.filter(v => v.id !== venueId);
        });
    }

    reject(venueId: string): void {
        if (this.rejectionComment.trim()) {
            this.adminService.rejectVenue(venueId, this.rejectionComment).subscribe(() => {
                this.pendingVenues = this.pendingVenues.filter(v => v.id !== venueId);
                this.rejectingId = undefined;
                this.rejectionComment = '';
            });
        }
    }
}