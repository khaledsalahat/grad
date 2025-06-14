import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: "root" })
export class RoleGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (!this.auth.isAuthenticated) {
      this.router.navigate(["/signin"]);
      return false;
    }

    if (this.auth.isOwner) {
      return true;
    }

    if (this.auth.isAdmin) {
      return true;
    }

    this.router.navigate(["/signin"]);
    return false;
  }
}
