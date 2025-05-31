import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AdminService } from '@/layout/service/admin.service';
import { VenueService } from '@/layout/service/venue.service';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { AppNavbar } from '../layout/components/app.navbar';
import { User } from '@/types/user';

@Component({
  selector: 'app-admin-users',
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
    TooltipModule,
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
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-3xl font-bold text-white">User Management</h1>
          <div class="flex gap-2 items-center">
            <span class="p-input-icon-left">
              <i class="pi pi-search"></i>
              <input 
                type="text" 
                pInputText 
                [(ngModel)]="searchTerm" 
                (input)="applyFilter()" 
                placeholder="Search users..." 
                class="p-inputtext-sm bg-surface-800 border-surface-600 text-white" />
            </span>
            <p-dropdown 
              [options]="roleFilters" 
              [(ngModel)]="selectedRoleFilter" 
              (onChange)="applyFilter()"
              placeholder="Filter by role" 
              styleClass="p-inputtext-sm bg-surface-800 border-surface-600 text-white"></p-dropdown>
          </div>
        </div>

        <div class="bg-surface-800 rounded-xl shadow-lg overflow-hidden">
          <p-table 
            [value]="filteredUsers" 
            [paginator]="true" 
            [rows]="10" 
            [loading]="loading"
            styleClass="p-datatable-sm p-datatable-gridlines p-datatable-striped bg-surface-800 text-white"
            responsiveLayout="scroll">
            
            <ng-template pTemplate="header">
              <tr class="bg-surface-700 text-surface-200">
                <th pSortableColumn="email">Email <p-sortIcon field="email"></p-sortIcon></th>
                <th pSortableColumn="username">Username <p-sortIcon field="username"></p-sortIcon></th>
                <th>Role</th>
                <th pSortableColumn="venueCount">Venues <p-sortIcon field="getTotalVenueCount()"></p-sortIcon></th>
                <th pSortableColumn="isBlocked">Status <p-sortIcon field="isBlocked"></p-sortIcon></th>
                <th style="width: 150px">Actions</th>
              </tr>
            </ng-template>
            
            <ng-template pTemplate="body" let-user>
              <tr>
                <td>{{ user.email }}</td>
                <td>{{ user.username }}</td>
                <td>
                  <div class="flex flex-wrap gap-1">
                    <p-tag 
                      [value]="user.role" 
                      [severity]="getRoleSeverity(user.role)"></p-tag>
                  </div>
                </td>
                <td>{{ user.venueCount }}</td>
                <td>
                  <p-tag 
                    [value]="user.isBlocked ? 'Blocked' : 'Active'" 
                    [severity]="user.isBlocked ? 'danger' : 'success'"></p-tag>
                </td>
                <td>
                  <div class="flex gap-2">
                    <button 
                      pButton 
                      icon="pi pi-eye" 
                      class="p-button-sm p-button-rounded p-button-info" 
                      (click)="viewUserDetails(user)"
                      pTooltip="View Details"></button>
                    <button 
                      pButton 
                      [icon]="user.isBlocked ? 'pi pi-lock-open' : 'pi pi-lock'" 
                      [class]="user.isBlocked ? 'p-button-sm p-button-rounded p-button-success' : 'p-button-sm p-button-rounded p-button-warning'" 
                      (click)="toggleUserBlock(user)"
                      [pTooltip]="user.isBlocked ? 'Unblock User' : 'Block User'"></button>
                  </div>
                </td>
              </tr>
            </ng-template>
            
            <ng-template pTemplate="emptymessage">
              <tr>
                <td colspan="7" class="text-center p-4 text-surface-300">
                  <div class="flex flex-col items-center">
                    <i class="pi pi-search text-4xl mb-3 text-surface-500"></i>
                    <span *ngIf="loading">Loading users...</span>
                    <span *ngIf="!loading && searchTerm">No users found matching "{{ searchTerm }}"</span>
                    <span *ngIf="!loading && !searchTerm">No users available</span>
                  </div>
                </td>
              </tr>
            </ng-template>
          </p-table>
        </div>
      </div>
    </div>
  `
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  loading = true;
  searchTerm = '';
  selectedRoleFilter = '';
  showVenueCount = true;

  roleFilters = [
    { label: 'All Roles', value: '' },
    { label: 'Owner', value: 'Owner' },
    { label: 'User', value: 'User' }
  ];

  constructor(
    private adminService: AdminService,
    private venueService: VenueService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadUsersAndVenueCounts();
  }

  loadUsersAndVenueCounts(): void {
    this.loading = true;
    this.adminService.getAllUsers().subscribe({
      next: (users) => {
        this.venueService.getAllVenues().subscribe({
          next: (venues) => {
            const venueCountMap: { [ownerId: string]: number } = {};
            venues.forEach((v: any) => {
              if (v.ownerId) {
                venueCountMap[v.ownerId] = (venueCountMap[v.ownerId] || 0) + 1;
              }
            });
            this.users = users
              .filter((user: any) => {
                const userRole = user.role ||
                  (Array.isArray(user.roles) && user.roles.length > 0 ? user.roles[0] : '');
                return userRole.toLowerCase() !== 'admin';
              })
              .map((user: any) => ({
                id: user.id,
                email: user.email,
                username: user.username ?? '',
                phoneNumber: user.phoneNumber ?? '',
                role: user.role || (Array.isArray(user.roles) && user.roles.length > 0 ? user.roles[0] : ''),
                isBlocked: user.isBlocked ?? false,
                venueCount: venueCountMap[user.id] || 0
              }));
            this.filteredUsers = [...this.users];
            this.loading = false;
          },
          error: (error) => {
            console.error('Error loading venues:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to load venues. Venue counts may be inaccurate.'
            });
            this.users = users.map((user: any) => ({
              id: user.id,
              email: user.email,
              username: user.username ?? '',
              phoneNumber: user.phoneNumber ?? '',
              role: user.role ?? '',
              isBlocked: user.isBlocked ?? false,
              venueCount: user.venueCount ?? 0
            }));
            this.filteredUsers = [...this.users];
            this.loading = false;
          }
        });
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load users. Please try again.'
        });
        this.loading = false;
      }
    });
  }

  applyFilter(): void {
    this.filteredUsers = this.users.filter(user => {
      const searchMatch = !this.searchTerm ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(this.searchTerm.toLowerCase());

      const roleMatch = !this.selectedRoleFilter ||
        user.role.toLowerCase() === this.selectedRoleFilter.toLowerCase();

      return searchMatch && roleMatch;
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

  viewUserDetails(user: User): void {
    this.router.navigate(['/users', user.id]);
  }

  toggleUserBlock(user: User): void {
    const action = user.isBlocked ? 'unblock' : 'block';
    const actionCapitalized = action.charAt(0).toUpperCase() + action.slice(1);

    this.confirmationService.confirm({
      message: `Are you sure you want to ${action} ${user.username}?`,
      header: `${actionCapitalized} User`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.adminService.toggleUserBlock(user.id, !user.isBlocked).subscribe({
          next: () => {
            user.isBlocked = !user.isBlocked;
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

  getTotalVenueCount(): number {
    return this.users.reduce((sum, user) => sum + (user.venueCount || 0), 0);
  }
}
