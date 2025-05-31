import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { catchError, delay, map, switchMap } from "rxjs/operators";
import { ApiService } from "./api.service";
import { Request } from "./requests.model";
import { BookingConfirmation } from "./bookingconfirmation";

@Injectable({
  providedIn: "root",
})
export class BookingService {
  constructor(private api: ApiService) { }

  private getDatesBetween(start: Date, end: Date): Date[] {
    const dates: Date[] = [];
    let current = new Date(start);

    while (current <= end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return dates;
  }

  createBooking(request: Request): Observable<BookingConfirmation> {
    const pricingOption = request.priceingOption?.find(option => option.duration === request.duration);
    if (pricingOption) {
      request.checkInTime = pricingOption.checkInTime;
      request.checkoutTime = pricingOption.checkoutTime;
    }

    return this.api.post<BookingConfirmation>("bookings", request).pipe(
      switchMap((confirmation) => {
        const dates = this.getDatesBetween(
          new Date(request.startDate),
          new Date(request.endDate)
        );
        return this.api
          .patch(`venues/${request.venueId}/unavailable-dates`, {
            dates: dates.map((d: Date) => d.toISOString().split("T")[0]),
            checkInTime: request.checkInTime,
            checkOutTime: request.checkoutTime
          })
          .pipe(
            map(() => confirmation),
            catchError((error) => {
              console.error("Error updating unavailable dates:", error);
              return of(confirmation);
            })
          );
      }),
      catchError((error) => {
        console.error("Error creating booking:", error);
        return throwError(() => error);
      })
    );
  }

  sendConfirmationEmail(bookingId: string, email: string): Observable<boolean> {
    return this.api
      .post<boolean>(`bookings/${bookingId}/send-confirmation`, { email })
      .pipe(
        catchError((error) => {
          console.error("Error sending confirmation email:", error);
          return throwError(() => error);
        })
      );
  }

  getBookingById(bookingId: string): Observable<BookingConfirmation | null> {
    return this.api
      .get<BookingConfirmation | null>(`bookings/${bookingId}`)
      .pipe(
        catchError((error) => {
          console.error("Error fetching booking details:", error);
          return throwError(() => error);
        })
      );
  }

  cancelBooking(bookingId: string): Observable<boolean> {
    return this.api.delete<boolean>(`bookings/${bookingId}`).pipe(
      catchError((error) => {
        console.error("Error cancelling booking:", error);
        return throwError(() => error);
      })
    );
  }
}
