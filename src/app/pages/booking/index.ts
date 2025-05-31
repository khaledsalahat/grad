import { Component } from "@angular/core";
import { BookingComponent } from "./components/booking.component";

@Component({
  selector: "app-booking-page",
  standalone: true,
  imports: [BookingComponent],
  template: `
    <div class="bg-surface-900 min-h-screen">
      <app-booking />
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        background-color: #121212;
        min-height: 100vh;
      }
    `,
  ],
})
export class BookingPage {}
