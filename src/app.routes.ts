import { AppLayout } from "@/layout/components/app.layout";
import { Routes } from "@angular/router";
import { AddVenueComponent } from "./app/pages/add-venue.component";
import { RoleGuard } from "./app/layout/service/role.guard";
import { AuthGuard } from "./app/layout/service/auth.guard";
import { RequestsComponent } from "@/pages/requests.component";
import { AdminComponent } from "@/pages/admin";
import { VenueDetailsComponent } from "@/pages/details/components/venue.details";
import { VenuePreviewGuard } from "@/layout/service/venue.preview";
import { AdminUsersComponent } from "@/pages/admin-users.component";
import { AdminUserDetailsComponent } from "@/pages/admin-user-details.component";

export const appRoutes: Routes = [
  {
    path: "",
    component: AppLayout,
    children: [
      {
        path: "requests/:id",
        component: RequestsComponent,
      },
      {
        path: "wedding-halls",
        loadComponent: () =>
          import("./app/pages/wedding/index").then((c) => c.WeddingHalls),
      },
      {
        path: "details/:id",
        loadComponent: () =>
          import("./app/pages/details/index").then((c) => c.details),
      },
      { path: "edit-venue/:id", component: AddVenueComponent },
      {
        path: "booking/:id",
        loadComponent: () =>
          import("./app/pages/booking").then((m) => m.BookingPage),
        title: "Book Venue",
      },
      {
        path: "chalets",
        loadComponent: () =>
          import("./app/pages/chalets/index").then((c) => c.chalets),
      },
      {
        path: 'venues/:id',
        component: VenueDetailsComponent,
        canActivate: [VenuePreviewGuard]
      },
      {
        path: 'admin/requests',
        loadComponent: () =>
          import("./app/pages/admin-requests.component").then(
            (c) => c.AdminRequestsComponent
          ),
        canActivate: [AuthGuard]
      },
      {
        path: "account",
        loadComponent: () =>
          import("./app/layout/components/app.accountlayout").then(
            (c) => c.AccountLayout
          ),
        canActivate: [AuthGuard],
        children: [
          {
            path: "",
            loadComponent: () =>
              import("./app/pages/account/index").then((c) => c.Account),
          },
        ],
      },
      {
        path: "add-venue",
        loadComponent: () =>
          import("./app/pages/add-venue.component").then(
            (c) => c.AddVenueComponent
          ),
        canActivate: [AuthGuard],
        children: [],
      },
      {
        path: "my-venues",
        loadComponent: () =>
          import("./app/pages/my-venues.component").then(
            (c) => c.MyVenuesComponent
          ),
        canActivate: [AuthGuard],
      },
      {
        path: "my-requests",
        loadComponent: () =>
          import("./app/pages/my-requests.component").then(
            (c) => c.MyRequestsComponent
          ),
        canActivate: [AuthGuard],
      },
      {
        path: "requests",
        loadComponent: () =>
          import("./app/pages/requests.component").then(
            (c) => c.RequestsComponent
          ),
        canActivate: [AuthGuard],
      },
      {
        path: "",
        loadComponent: () =>
          import("./app/pages/travel/index").then((c) => c.Travel),
      },

      {
        path: "signup",
        loadComponent: () =>
          import("./app/pages/signup/index").then((c) => c.Signup),
      },
      {
        path: "signin",
        loadComponent: () =>
          import("./app/pages/signin/index").then((c) => c.Signin),
      },

      {
        path: "reset-password",
        loadComponent: () =>
          import("./app/pages/reset-password/index").then(
            (c) => c.ResetPassword
          ),
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
      },
      {
        path: "404",
        loadComponent: () => import("./app.error").then((c) => c.Error),
      },
      {
        path: "second-pages",
        children: [
          {
            path: "account",
            loadComponent: () =>
              import("./app/layout/components/app.accountlayout").then(
                (c) => c.AccountLayout
              ),
            children: [
              {
                path: "",
                loadComponent: () =>
                  import("./app/pages/account/index").then((c) => c.Account),
              },
            ],
          },
        ],
      },
    ],
  },

  { path: "**", redirectTo: "/" },
];
