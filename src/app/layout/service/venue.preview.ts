import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { ActivatedRouteSnapshot, CanActivate } from "@angular/router";
import { VenueService } from "./venue.service";
import { catchError, map, Observable, of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class VenuePreviewGuard implements CanActivate {
    constructor(private auth: AuthService, private venueService: VenueService) {

    }

    canActivate(context: ActivatedRouteSnapshot): Observable<boolean> {
        const venueId = context.params['id'];
        return this.venueService.getVenueById(venueId).pipe(
            map(venue => {
                const isAllowed = this.auth.isOwner || this.auth.isAdmin;
                return isAllowed || venue.status === 'approved';
            }),
            catchError(() => of(false))
        );
    }
}