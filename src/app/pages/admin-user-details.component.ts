import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AdminService } from '@/layout/service/admin.service';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { AppNavbar } from '../layout/components/app.navbar';
import { User } from '@/types/user';
import { Venue } from '@/layout/service/venue.model';
import { VenueService } from '@/layout/service/venue.service';
import { Request } from '@/layout/service/requests.model';

@Component({
  selector: 'app-admin-user-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    ConfirmDialogModule,
    ToastModule,
    TagModule,
    CardModule,
    DividerModule,
    PanelModule,
    AppNavbar
  ],
  providers: [ConfirmationService, MessageService],
  template: `
    <div class="min-h-screen bg-surface-900 text-surface-0">
      <app-navbar />
      <p-toast></p-toast>
      <p-confirmDialog 
        header="Confirmation" 
        icon="pi pi-exclamation-triangle"
        acceptButtonStyleClass="p-button-danger"
        rejectButtonStyleClass="p-button-text"></p-confirmDialog>

      <div class="container mx-auto p-6">
        <div class="flex items-center mb-6">
          <button 
            pButton 
            icon="pi pi-arrow-left" 
            label="Back to Users" 
            class="p-button-text p-button-secondary mr-4"
            (click)="goBack()"></button>
          <h1 class="text-3xl font-bold text-white">User Details</h1>
        </div>

        <div *ngIf="loading" class="flex justify-center my-8">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-400"></div>
        </div>

        <div *ngIf="!loading && !user" class="bg-surface-800 rounded-xl p-6 text-center">
          <i class="pi pi-exclamation-circle text-4xl text-yellow-500 mb-4"></i>
          <h2 class="text-2xl font-semibold text-white mb-2">User Not Found</h2>
          <p class="text-surface-300 mb-4">The requested user could not be found or you don't have permission to view it.</p>
          <button pButton label="Go Back" icon="pi pi-arrow-left" (click)="goBack()" class="p-button-primary"></button>
        </div>

        <div *ngIf="!loading && user" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-1">
            <div class="bg-surface-800 rounded-xl shadow-lg overflow-hidden">
              <div class="p-6">
                <div class="flex justify-between items-center mb-4">
                  <h2 class="text-xl font-semibold text-white">User Information</h2>
                  <p-tag 
                    [value]="user.isBlocked ? 'Blocked' : 'Active'" 
                    [severity]="user.isBlocked ? 'danger' : 'success'"></p-tag>
                </div>
                
                <div class="flex flex-col space-y-4">
                  <div>
                    <label class="text-surface-400 text-sm">Username</label>
                    <div class="text-white font-medium">{{ user.username || 'Not provided' }}</div>
                  </div>
                  
                  <div>
                    <label class="text-surface-400 text-sm">Email</label>
                    <div class="text-white font-medium">{{ user.email }}</div>
                  </div>
                  
                  <div>
                    <label class="text-surface-400 text-sm">Phone Number</label>
                    <div class="text-white font-medium">{{ user.phoneNumber || 'Not provided' }}</div>
                  </div>
                  
                  <div>
                    <label class="text-surface-400 text-sm">Role</label>
                    <div class="flex flex-wrap gap-1 mt-1">
                      <p-tag 
                        [value]="user.role" 
                        [severity]="getRoleSeverity(user.role)"></p-tag>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="bg-surface-700 p-4">
                <button 
                  pButton 
                  [label]="user.isBlocked ? 'Unblock User' : 'Block User'" 
                  [icon]="user.isBlocked ? 'pi pi-lock-open' : 'pi pi-lock'" 
                  [class]="user.isBlocked ? 'p-button-success w-full' : 'p-button-danger w-full'" 
                  (click)="toggleUserBlock()"></button>
              </div>
            </div>
          </div>
          
          <div class="lg:col-span-2">
            <div *ngIf="isOwner" class="bg-surface-800 rounded-xl shadow-lg overflow-hidden mb-6">
              <div class="p-6">
                <div class="flex justify-between items-center mb-4">
                  <h2 class="text-xl font-semibold text-white">User's Venues</h2>
                  <span class="bg-primary-900 text-primary-100 px-3 py-1 rounded-full text-sm">
                    {{ userVenues.length }} {{ userVenues.length === 1 ? 'Venue' : 'Venues' }}
                  </span>
                </div>
                
                <div *ngIf="loadingVenues" class="flex justify-center my-8">
                  <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-400"></div>
                </div>
                
                <div *ngIf="!loadingVenues && userVenues.length === 0" class="text-center py-8">
                  <i class="pi pi-home text-4xl text-surface-500 mb-4"></i>
                  <p class="text-surface-300">This user has no venues</p>
                </div>
                
                <div *ngIf="!loadingVenues && userVenues.length > 0" class="space-y-4">
                  <div *ngFor="let venue of userVenues" class="bg-surface-700 rounded-lg overflow-hidden">
                    <div class="flex flex-col md:flex-row">
                      <div class="md:w-1/4 h-40 md:h-auto">
                        <img 
                          [src]="venue.mainPicture || 'assets/images/default-venue.jpg'" 
                          [alt]="venue.title"
                          class="w-full h-full object-cover"
                          (error)="handleImageError($event)">
                      </div>
                      <div class="p-4 md:w-3/4 flex flex-col justify-between">
                        <div>
                          <div class="flex justify-between items-start">
                            <h3 class="text-lg font-semibold text-white">{{ venue.title }}</h3>
                            <p-tag 
                              [value]="venue.status" 
                              [severity]="getVenueStatusSeverity(venue.status)"></p-tag>
                          </div>
                          <div class="flex items-center text-surface-300 mt-1">
                            <i class="pi pi-map-marker mr-2 text-primary-400"></i>
                            {{ venue.location }}
                          </div>
                          <div class="flex items-center text-surface-300 mt-1">
                            <i class="pi pi-tag mr-2 text-primary-400"></i>
                            {{ venue.type === 'wedding-hall' ? 'Wedding Hall' : 'Chalet' }}
                          </div>
                        </div>
                        <div class="flex justify-end mt-4 space-x-2">
                          <button 
                            pButton 
                            icon="pi pi-eye" 
                            label="View" 
                            class="p-button-sm p-button-outlined p-button-info"
                            (click)="viewVenue(venue.id)"></button>
                          <button 
                            pButton 
                            icon="pi pi-trash" 
                            label="Delete" 
                            class="p-button-sm p-button-outlined p-button-danger"
                            (click)="confirmDeleteVenue(venue)"></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div *ngIf="isOwner" class="bg-surface-800 rounded-xl shadow-lg p-6">
              <div *ngIf="loadingPayments" class="flex justify-center my-8">
                <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-400"></div>
              </div>
              <div *ngIf="!loadingPayments && recentPayments.length === 0" class="text-center py-8">
                <i class="pi pi-credit-card text-4xl text-surface-500 mb-4"></i>
                <h3 class="text-xl font-semibold text-white mb-2">No Recent Payments</h3>
                <p class="text-surface-300">This user has not made any payments yet.</p>
              </div>
              <div *ngIf="!loadingPayments && recentPayments.length > 0">
                <h3 class="text-xl font-semibold text-white mb-4">Recent Payments</h3>
                <table class="min-w-full divide-y divide-surface-700">
                  <thead>
                    <tr>
                      <th class="px-4 py-2 text-left text-surface-300">Venue</th>
                      <th class="px-4 py-2 text-left text-surface-300">Date</th>
                      <th class="px-4 py-2 text-left text-surface-300">Amount</th>
                      <th class="px-4 py-2 text-left text-surface-300">Status</th>
                      <th class="px-4 py-2 text-left text-surface-300">Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let payment of recentPayments">
                      <td class="px-4 py-2 text-white">{{ payment.venueName }}</td>
                      <td class="px-4 py-2 text-white">{{ payment.createdAt | date:'mediumDate' }}</td>
                      <td class="px-4 py-2 text-primary-400 font-semibold">{{ payment.paidAmount | currency:'USD':'symbol':'1.0-0' }}</td>
                      <td class="px-4 py-2">
                        <p-tag [value]="payment.status" [severity]="getVenueStatusSeverity(payment.status)"></p-tag>
                      </td>
                      <td class="px-4 py-2 text-white">{{ payment.paymentMethod | titlecase }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div *ngIf="!isOwner" class="bg-surface-800 rounded-xl shadow-lg p-6">
              <div *ngIf="loadingPayments" class="flex justify-center my-8">
                <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-400"></div>
              </div>
              <div *ngIf="!loadingPayments && recentPayments.length === 0" class="text-center py-8">
                <i class="pi pi-credit-card text-4xl text-surface-500 mb-4"></i>
                <h3 class="text-xl font-semibold text-white mb-2">No Recent Payments</h3>
                <p class="text-surface-300">This user has not made any payments yet.</p>
              </div>
              <div *ngIf="!loadingPayments && recentPayments.length > 0">
                <h3 class="text-xl font-semibold text-white mb-4">Recent Payments</h3>
                <table class="min-w-full divide-y divide-surface-700">
                  <thead>
                    <tr>
                      <th class="px-4 py-2 text-left text-surface-300">Venue</th>
                      <th class="px-4 py-2 text-left text-surface-300">Date</th>
                      <th class="px-4 py-2 text-left text-surface-300">Amount</th>
                      <th class="px-4 py-2 text-left text-surface-300">Status</th>
                      <th class="px-4 py-2 text-left text-surface-300">Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let payment of recentPayments">
                      <td class="px-4 py-2 text-white">{{ payment.venueName }}</td>
                      <td class="px-4 py-2 text-white">{{ payment.createdAt | date:'mediumDate' }}</td>
                      <td class="px-4 py-2 text-primary-400 font-semibold">{{ payment.paidAmount | currency:'USD':'symbol':'1.0-0' }}</td>
                      <td class="px-4 py-2">
                        <p-tag [value]="payment.status" [severity]="getVenueStatusSeverity(payment.status)"></p-tag>
                      </td>
                      <td class="px-4 py-2 text-white">{{ payment.paymentMethod | titlecase }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminUserDetailsComponent implements OnInit {
  userId: string | null = null;
  user: User | null = null;
  userVenues: Venue[] = [];
  recentPayments: Request[] = [];
  loading = true;
  loadingVenues = false;
  loadingPayments = false;
  isOwner = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private venueService: VenueService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.loadUserDetails();
    } else {
      this.loading = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'User ID not provided'
      });
    }
  }

  loadUserDetails(): void {
    if (!this.userId) return;
    this.loading = true;
    this.adminService.getUserDetails(this.userId).subscribe({
      next: (userData: any) => {
        const userRole = userData.role || (Array.isArray(userData.roles) && userData.roles.length > 0 ? userData.roles[0] : '');
        if (userRole.toLowerCase() === 'admin') {
          this.messageService.add({
            severity: 'info',
            summary: 'Access Restricted',
            detail: 'Admin user details are not accessible'
          });
          this.router.navigate(['/users']);
          return;
        }

        this.user = {
          id: userData.id,
          email: userData.email,
          username: userData.username ?? userData.userName ?? '',
          phoneNumber: typeof userData.phoneNumber === 'number' ? userData.phoneNumber : Number(userData.phoneNumber) || 0,
          role: userRole,
          isBlocked: userData.isBlocked ?? false,
          venueCount: userData.venueCount ?? 0
        };
        this.isOwner = this.user && this.user.role &&
          (this.user.role.toString().toLowerCase() === 'owner' ||
            this.user.role.toString().toLowerCase() === 'venue_owner');
        this.loading = false;
        if (this.isOwner) {
          this.loadUserVenues();
          this.loadRecentPayments();
        } else {
          this.loadRecentPayments();
        }
      },
      error: (error) => {
        console.error('Error loading user details:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load user details. Please try again.'
        });
        this.loading = false;
      }
    });
  }

  loadUserVenues(): void {
    if (!this.userId) return;

    this.loadingVenues = true;
    this.adminService.getUserVenues(this.userId).subscribe({
      next: (venues) => {
        this.userVenues = venues;
        if (this.user) {
          this.user.venueCount = venues.length;
        }
        this.loadingVenues = false;
      },
      error: (error) => {
        console.error('Error loading user venues:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load user venues. Please try again.'
        });
        this.loadingVenues = false;
      }
    });
  }

  loadRecentPayments(): void {
    if (!this.userId) return;
    this.loadingPayments = true;
    this.venueService.getRequestsByUser(this.userId).subscribe({
      next: (requests) => {
        this.recentPayments = (requests || []).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        this.loadingPayments = false;
      },
      error: (error) => {
        console.error('Error loading payments:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load recent payments. Please try again.'
        });
        this.loadingPayments = false;
      }
    });
  }

  getRoleSeverity(role: string): string {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'danger';
      case 'owner':
        return 'warning';
      case 'user':
        return 'info';
      default:
        return 'secondary';
    }
  }

  getVenueStatusSeverity(status: string): string {
    switch (status.toLowerCase()) {
      case 'approved':
      case 'accepted':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
      case 'denied':
        return 'danger';
      default:
        return 'info';
    }
  }

  toggleUserBlock(): void {
    if (!this.user) return;

    const action = this.user.isBlocked ? 'unblock' : 'block';
    const actionCapitalized = action.charAt(0).toUpperCase() + action.slice(1);

    this.confirmationService.confirm({
      message: `Are you sure you want to ${action} ${this.user.username}?`,
      header: `${actionCapitalized} User`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (!this.user || !this.userId) return;

        this.adminService.toggleUserBlock(this.userId, !this.user.isBlocked).subscribe({
          next: () => {
            this.user!.isBlocked = !this.user!.isBlocked;
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `User ${action}ed successfully`
            });
          },
          error: (error) => {
            console.error(`Error ${action}ing user:`, error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `Failed to ${action} user. Please try again.`
            });
          }
        });
      }
    });
  }

  confirmDeleteVenue(venue: Venue): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete the venue "${venue.title}"? This action cannot be undone.`,
      header: 'Delete Venue',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteVenue(venue.id);
      }
    });
  }

  deleteVenue(venueId: string): void {
    this.adminService.deleteVenue(venueId).subscribe({
      next: () => {
        this.userVenues = this.userVenues.filter(v => v.id !== venueId);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Venue deleted successfully'
        });
      },
      error: (error) => {
        console.error('Error deleting venue:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete venue. Please try again.'
        });
      }
    });
  }

  viewVenue(venueId: string): void {
    this.router.navigate(['/details', venueId]);
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }

  handleImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/default-venue.jpg';
  }
}
