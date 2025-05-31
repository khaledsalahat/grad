import { Routes } from '@angular/router';
import { AdminComponent } from './admin';
import { AdminUsersComponent } from './admin-users.component';
import { AdminUserDetailsComponent } from './admin-user-details.component';
import { AuthGuard } from '@/layout/service/auth.guard';
import { RoleGuard } from '@/layout/service/role.guard';

export default [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: 'users',
    component: AdminUsersComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: 'users/:id',
    component: AdminUserDetailsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Admin'] }
  }
] as Routes;
