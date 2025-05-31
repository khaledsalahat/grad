import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { VenueService } from "@/layout/service/venue.service";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { CalendarModule } from "primeng/calendar";
import { AuthService } from "@/layout/service/auth.service";
import { Venue } from "@/layout/service/venue.model";

interface AvailableDate {
  date: Date;
  hours: string[];
}

interface VenueWithOwner extends Omit<Venue, "availableDates"> {
  ownerName?: string;
  ownerPhone?: string;
  ownerEmail?: string;
  availableDates?: AvailableDate[];
  type: "wedding-hall" | "chalet";
  bookings?: {
    status: "accepted" | "pending" | "rejected";
    date: string;
  }[];
}

@Component({
  selector: "venue-details",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AnimatedContainer,
    CalendarModule,
    FormsModule,
  ],
  template: `
    <div class="min-h-screen bg-surface-900 text-surface-0">
      <div *ngIf="loading" class="flex justify-center items-center h-64">
        <div
          class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"
        ></div>
      </div>

      <div
        *ngIf="error"
        class="bg-red-900 border border-red-600 text-white px-4 py-3 rounded relative"
        role="alert"
      >
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline"> {{ error }}</span>
      </div>

      <div *ngIf="venue && !loading">

        <div class="relative h-[20vh] w-full">
          <div
            class="absolute inset-0 bg-gradient-to-b from-transparent to-surface-950"
          ></div>
          <div class="absolute bottom-0 left-0 w-full p-8">
            <div class="container mx-auto">
              <h1 class="text-4xl md:text-5xl font-bold text-white mb-2">
                {{ venue.title }} venue
              </h1>
              <div class="flex flex-wrap items-center gap-4 text-surface-200">
                <div class="flex items-center">
                  <i class="pi pi-map-marker mr-2"></i>
                  <span>{{ venue.location }}</span>
                </div>

                <div *ngIf="venue.capacity" class="flex items-center">
                  <i class="pi pi-users mr-2"></i>
                  <span>Capacity: {{ venue.capacity }} guests</span>
                </div>

                <div *ngIf="venue.pricePerDay" class="flex items-center text-primary-400 font-semibold">
                  <i class="pi pi-dollar mr-2"></i>
                  <span>{{ venue.pricePerDay | currency: 'ILS' : 'symbol' : '1.0-0' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="container mx-auto px-4 py-8">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2 space-y-8">
              <animated-container
                [delay]="200"
                enterClass="animate-slidefadeup"
                className="bg-surface-800  p-6 shadow-lg"
              >
                <h2
                  class="text-2xl font-semibold text-white mb-4 flex items-center"
                >
                  <i class="pi pi-info-circle mr-3 text-primary-400"></i>
                  About This Venue
                </h2>
                <p class="text-surface-200 leading-relaxed">
                  {{ venue.description }}
                </p>
              </animated-container>

              <animated-container
                [delay]="300"
                enterClass="animate-slidefadeup"
                className="bg-surface-800  p-6 shadow-lg"
                *ngIf="venue.type === 'chalet'"
              >
                <h2
                  class="text-2xl font-semibold text-white mb-4 flex items-center"
                >
                  <i class="pi pi-list mr-3 text-primary-400"></i>
                  Features
                </h2>
                <div class="grid grid-cols-2 gap-y-4">
                  <div
                    *ngFor="let amenity of venue.amenities"
                    class="flex items-center"
                  >
                    <i class="pi pi-check-circle text-primary-400 mr-2"></i>
                    <span class="text-surface-200">{{ amenity }}</span>
                  </div>
                </div>
              </animated-container>

              <animated-container
                [delay]="400"
                enterClass="animate-slidefadeup"
                className="bg-surface-800  p-6 shadow-lg"
              >
                <h2
                  class="text-2xl font-semibold text-white mb-6 flex items-center"
                >
                  <i class="pi pi-calendar mr-3 text-primary-400"></i>
                  Book Now
                </h2>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div class="lg:col-span-2">
                    <p-calendar
                      [(ngModel)]="selectedDate"
                      [inline]="true"
                      [disabledDates]="disabledDates"
                      [showTime]="false"
                      [minDate]="minDate"
                      [maxDate]="maxDate"
                      class="w-full custom-calendar"
                    ></p-calendar>
                  </div>

                  <div class="lg:col-span-1">
                    <div class="bg-surface-850 rounded-xl p-4 h-full">
                      <h3 class="text-xl font-semibold text-white mb-4">
                        {{ selectedDate ? "Available Times" : "Select a Date" }}
                      </h3>

                      <div
                        *ngIf="venue.type === 'chalet' && selectedDate"
                        class="space-y-3 max-h-[400px] overflow-y-auto no-scrollbar"
                      >
                        <button
                          *ngFor="let slot of getAvailableHours(selectedDate)"
                          class="w-full py-3 px-4 bg-surface-700 text-surface-200 rounded-lg text-base hover:bg-primary-500 hover:text-white transition-colors flex justify-center"
                          [routerLink]="['/booking', venue.id]"
                          [queryParams]="getQueryParamsForSlot(slot, selectedDate)"
                        >
                          {{ venue.type === 'chalet' ? slot.label : slot }}
                        </button>

                        <ng-container *ngIf="getAvailableHours(selectedDate).length === 0">
                          <div class="text-surface-400 text-sm flex items-center justify-center p-4">
                            No available slots for this date
                          </div>
                        </ng-container>
                      </div>

                      <div
                        *ngIf="
                          venue.type !== 'chalet' &&
                          selectedDate 
                        "
                        class="space-y-3 max-h-[400px] overflow-y-auto no-scrollbar"
                      >
                        <ng-container *ngIf="getAvailableHours(selectedDate).length; else noTimeSlots">
                          <button
                            *ngFor="let hour of getAvailableHours(selectedDate)"
                            class="w-full py-3 px-4 bg-surface-700 text-surface-200 rounded-lg text-base hover:bg-primary-500 hover:text-white transition-colors flex justify-center"
                            [routerLink]="['/booking', venue.id]"
                            [queryParams]="{
                              date: (selectedDate | date: 'yyyy-MM-dd'),
                              start: hour.split(' - ')[0].replace(' ', ''),
                              end: hour.split(' - ')[1].replace(' ', ''),
                            }"
                          >
                            {{ hour }}
                          </button>
                        </ng-container>
                        <ng-template #noTimeSlots>
                          <div class="text-surface-400 text-sm flex items-center justify-center p-4">
                            No available time slots for this date
                          </div>
                        </ng-template>
                      </div>

                      <div
                        *ngIf="!selectedDate"
                        class="text-surface-400 text-sm h-32 flex items-center justify-center"
                      >
                        Select a date from the calendar
                      </div>
                    </div>
                  </div>
                </div>
              </animated-container>
            </div>

            <div class="space-y-6">
              <animated-container
                [delay]="250"
                enterClass="animate-slidefadeleft"
                className="bg-surface-800 rounded-2xl p-6 shadow-lg sticky top-4"
              >
                <h2
                  class="text-2xl font-semibold text-white mb-4 flex items-center"
                >
                  <i class="pi pi-user mr-3 text-primary-400"></i>
                  Owner Information
                </h2>
                <div class="space-y-4">
                  <div class="flex items-center">
                    <i class="pi pi-user text-primary-400 mr-3 w-6"></i>
                    <span class="text-surface-200">{{ venue.ownerName }}</span>
                  </div>
                  <div class="flex items-center">
                    <i class="pi pi-phone text-primary-400 mr-3 w-6"></i>
                    <span class="text-surface-200">{{ venue.ownerPhone }}</span>
                  </div>
                  <div class="flex items-center">
                    <i class="pi pi-envelope text-primary-400 mr-3 w-6"></i>
                    <span class="text-surface-200">{{ venue.ownerEmail }}</span>
                  </div>

                  <div class="pt-2">
                    <button
                      class="w-full py-3 px-6 bg-transparent border border-primary-500 text-primary-400 rounded-xl font-medium hover:bg-primary-500/10 transition-colors flex items-center justify-center"
                    >
                      <i class="pi pi-phone mr-2"></i>
                      Contact Owner
                    </button>
                  </div>
                </div>
              </animated-container>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      ::ng-deep .p-calendar {
        width: 100%;
      }

      ::ng-deep .p-calendar .p-datepicker {
        background-color: #2d3748;
        color: #fff;
        border: 1px solid #4a5568;
      }

      ::ng-deep .p-calendar .p-datepicker-header {
        background-color: #2d3748;
        border-bottom: 1px solid #4a5568;
        color: #fff;
      }

      ::ng-deep .p-calendar .p-datepicker table td > span {
        color: #fff;
      }

      ::ng-deep .p-calendar .p-datepicker table td.p-datepicker-today > span {
        background-color: #4299e1;
        color: #fff;
      }

      ::ng-deep .p-calendar .p-datepicker table td > span.p-highlight {
        background-color: #4299e1;
        color: #fff;
      }

      ::ng-deep
        .p-calendar
        .p-datepicker:not(.p-disabled)
        table
        td
        span:not(.p-highlight):not(.p-disabled):hover {
        background-color: #4a5568;
      }

      .no-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `,
  ],
})
export class VenueDetailsComponent implements OnInit {
  venue: VenueWithOwner | null = null;
  loading: boolean = true;
  error: string | null = null;
  selectedDate: Date | null = null;
  minDate: Date;
  maxDate: Date;
  disabledDates: Date[] = [];

  constructor(
    private route: ActivatedRoute,
    private venueService: VenueService,
    private authService: AuthService
  ) {
    const today = new Date();
    this.minDate = new Date(today);
    this.maxDate = new Date(today);
    this.maxDate.setMonth(today.getMonth() + 3);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      if (id) {
        this.loadVenueDetails(id);
      } else {
        this.error = "Venue ID not found";
        this.loading = false;
      }
    });
  }

  loadVenueDetails(id: string): void {
    this.loading = true;
    this.error = null;

    this.venueService.getVenueDetails(id).subscribe({
      next: (venue) => {
        this.venueService.getOwnerDetails(venue.ownerId).subscribe({
          next: (ownerDetails) => {
            this.venue = {
              ...venue,
              ownerName: ownerDetails.name,
              ownerPhone: ownerDetails.phone,
              ownerEmail: ownerDetails.email,
              amenities: this.processAmenities(venue.amenities),
              photos: this.venueService.fixPhotoUrls(venue.photos || []),
              availability: this.processAvailability(venue.availability),
            };
            this.updateDisabledDates();
            this.loading = false;
          },
          error: (err) => {
            console.error('Error loading owner details:', err);
            this.venue = {
              ...venue,
              ownerName: 'Error loading owner',
              ownerPhone: 'N/A',
              ownerEmail: 'N/A',
              amenities: this.processAmenities(venue.amenities),
              photos: this.venueService.fixPhotoUrls(venue.photos || []),
              availability: this.processAvailability(venue.availability),
            };
            this.updateDisabledDates();
            this.loading = false;
          }
        });
      },
      error: (err) => {
        console.error("Error loading venue details:", err);
        this.error = "Failed to load venue details. Please try again later.";
        this.loading = false;
      },
    });
  }

  private processAmenities(amenities: any[]): string[] {
    if (!amenities || amenities.length === 0) return [];

    return amenities.map(amenity => {
      if (typeof amenity === 'string') {
        return amenity;
      } else if (typeof amenity === 'object' && amenity !== null) {
        return amenity.name || amenity.AmenityName || amenity.amenityName || JSON.stringify(amenity);
      }
      return String(amenity);
    });
  }

  private processAvailability(availability: any[]): any[] {
    if (!availability) return [];

    console.log('Processing availability data:', availability);

    return availability.map((avail) => ({
      date: avail.date,
      times: avail.times || [],
      unavailableTimes: avail.unavailableTimes || [],
      fullyBooked: avail.fullyBooked || false,
      globalTimeSlots: avail.globalTimeSlots || [],
      amBooked: avail.amBooked || false,
      pmBooked: avail.pmBooked || false
    }));
  }

  private updateDisabledDates(): void {
    if (!this.venue) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    console.log('Updating disabled dates for venue:', this.venue.title);
    console.log('Raw unavailable dates:', this.venue.unavailableDates);

    const unavailableDates = (this.venue.unavailableDates || [])
      .map(dateStr => {
        try {
          const [year, month, day] = dateStr.split('-').map(Number);
          const d = new Date(year, month - 1, day);
          d.setHours(0, 0, 0, 0);
          return d;
        } catch (e) {
          console.error(`Error parsing date: ${dateStr}`, e);
          return new Date(NaN);
        }
      })
      .filter(date => !isNaN(date.getTime()));

    console.log('Parsed unavailable dates:', unavailableDates.map(d => d.toLocaleDateString()));

    const fullyBookedDates = (this.venue.availability || [])
      .filter(avail => avail.fullyBooked)
      .map(avail => {
        try {
          const [year, month, day] = avail.date.split('-').map(Number);
          const d = new Date(year, month - 1, day);
          d.setHours(0, 0, 0, 0);
          return d;
        } catch (e) {
          console.error(`Error parsing availability date: ${avail.date}`, e);
          return new Date(NaN);
        }
      })
      .filter(date => !isNaN(date.getTime()));

    console.log('Parsed fully booked dates:', fullyBookedDates.map(d => d.toLocaleDateString()));

    this.disabledDates = [...unavailableDates, ...fullyBookedDates]
      .filter(date => date >= today)
      .filter((date, index, self) =>
        index === self.findIndex(d =>
          d.getFullYear() === date.getFullYear() &&
          d.getMonth() === date.getMonth() &&
          d.getDate() === date.getDate()
        )
      );

    console.log('Final disabled dates:', this.disabledDates.map(d => d.toLocaleDateString()));
  }

  private isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  getAvailableHours(date: Date): any[] {
    if (!date || !this.venue) {
      return [];
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;

    if (this.venue.type === 'wedding-hall') {
      const isDateUnavailable = (this.venue.unavailableDates || []).some(unavailDateStr => {
        return unavailDateStr === dateString;
      });

      if (isDateUnavailable) {
        console.log(`  - Date is marked as fully unavailable`);
        return [];
      }

      const dateAvailability = (this.venue.availability || []).find(avail => avail.date === dateString);

      const globalTimeSlots = this.venue.globalTimeSlots || [];

      if (globalTimeSlots.length === 0) {
        console.log(`  - No available time slots defined by the venue owner`);
        return [];
      }

      console.log(`  - Venue has ${globalTimeSlots.length} global time slots:`);
      globalTimeSlots.forEach((slot: { startTime: string, endTime: string }, index: number) => {
        const start = new Date(slot.startTime);
        const end = new Date(slot.endTime);
        console.log(`    #${index + 1}: ${start.toLocaleTimeString()} - ${end.toLocaleTimeString()}`);
      });

      const unavailableTimes = dateAvailability?.unavailableTimes || [];

      console.log(`  - Date has ${unavailableTimes.length} unavailable time slots:`);
      unavailableTimes.forEach((unavailTime: { startTime: string, endTime: string }, index: number) => {
        const parseTimeString = (timeStr: string | undefined) => {
          if (!timeStr) return new Date();

          try {
            if (timeStr.includes('T')) {
              return new Date(timeStr);
            } else {
              const [hours, minutes, seconds] = timeStr.split(':').map(Number);
              const date = new Date();
              date.setHours(hours || 0, minutes || 0, seconds || 0, 0);
              return date;
            }
          } catch (e) {
            console.error('Error parsing time:', timeStr, e);
            return new Date();
          }
        };

        const start = parseTimeString(unavailTime.startTime);
        const end = parseTimeString(unavailTime.endTime);
        console.log(`    #${index + 1}: ${start.toLocaleTimeString()} - ${end.toLocaleTimeString()}`);
      });

      if (dateAvailability?.fullyBooked) {
        console.log(`  - Date is marked as fully booked in availability data`);
        return [];
      }

      const availableSlots = globalTimeSlots.filter((slot: { startTime: string, endTime: string }) => {
        return !this.isTimeSlotBooked(slot, unavailableTimes);
      });

      console.log(`  - Total available slots after filtering: ${availableSlots.length}`);

      const formattedSlots = availableSlots.map((slot: { startTime: string, endTime: string }) => {
        const parseTimeString = (timeStr: string) => {
          try {
            if (timeStr.includes('T')) {
              return new Date(timeStr);
            } else {
              const [hours, minutes, seconds] = timeStr.split(':').map(Number);
              const date = new Date();
              date.setHours(hours || 0, minutes || 0, seconds || 0, 0);
              return date;
            }
          } catch (e) {
            console.error('Error parsing time:', timeStr, e);
            return new Date();
          }
        };

        const start = parseTimeString(slot.startTime);
        const end = parseTimeString(slot.endTime);

        return `${start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
      });

      console.log(`  - Final available formatted slots: ${formattedSlots.join(', ')}`);
      return formattedSlots;
    }

    if (this.venue.type === 'chalet') {
      const isDateUnavailable = (this.venue.unavailableDates || []).some(unavailDateStr => {
        return unavailDateStr === dateString;
      });
      if (isDateUnavailable) {
        return [];
      }
      const dateAvailability = (this.venue.availability || []).find(avail => avail.date === dateString);
      if (dateAvailability?.fullyBooked) {
        return [];
      }
      const unavailableSlots: string[] = [];
      if (dateAvailability) {
        if (dateAvailability.amBooked) unavailableSlots.push('am');
        if (dateAvailability.pmBooked) unavailableSlots.push('pm');
      }
      let pricing = Array.isArray((this.venue as any).pricing) ? (this.venue as any).pricing : [];
      if (!pricing.length && Array.isArray((this.venue as any).pricingOptions)) {
        pricing = (this.venue as any).pricingOptions;
      }
      return pricing.filter((opt: any) => {
        if (opt.duration === '12') {
          let hour = 0;
          try {
            if (typeof opt.checkInTime === 'string') {
              if (opt.checkInTime.includes('T')) {
                hour = new Date(opt.checkInTime).getHours();
              } else {
                const [h, m, s] = opt.checkInTime.split(':').map(Number);
                hour = h || 0;
              }
            }
          } catch (e) {
            hour = 0;
          }
          if (hour < 12 && unavailableSlots.includes('am')) return false;
          if (hour >= 12 && unavailableSlots.includes('pm')) return false;
        }
        return true;
      }).map((opt: any) => {
        let checkInLabel = '';
        let checkOutLabel = '';
        try {
          if (typeof opt.checkInTime === 'string') {
            if (opt.checkInTime.includes('T')) {
              checkInLabel = new Date(opt.checkInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            } else {
              const [h, m] = opt.checkInTime.split(':');
              checkInLabel = `${h?.padStart(2, '0')}:${m?.padStart(2, '0')}`;
            }
          }
          if (typeof opt.checkoutTime === 'string') {
            if (opt.checkoutTime.includes('T')) {
              checkOutLabel = new Date(opt.checkoutTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            } else {
              const [h, m] = opt.checkoutTime.split(':');
              checkOutLabel = `${h?.padStart(2, '0')}:${m?.padStart(2, '0')}`;
            }
          }
        } catch (e) {
          checkInLabel = typeof opt.checkInTime === 'string' ? opt.checkInTime : '';
          checkOutLabel = typeof opt.checkoutTime === 'string' ? opt.checkoutTime : '';
        }
        const timeLabel = (checkInLabel && checkOutLabel)
          ? `${checkInLabel} - ${checkOutLabel}`
          : '';
        let label = '';
        if (opt.duration === '12') {
          label = `${(opt as any).slotName ? ((opt as any).slotName.charAt(0).toUpperCase() + (opt as any).slotName.slice(1)) : '12 Hours'}${timeLabel ? ` (${timeLabel})` : ''}`;
        } else if (opt.duration === '24') {
          label = `24 Hours${timeLabel ? ` (${timeLabel})` : ''}`;
        } else if (parseInt(opt.duration, 10) > 24) {
          const days = parseInt(opt.duration, 10) / 24;
          label = `${days} Days${timeLabel ? ` (${timeLabel})` : ''}`;
        } else {
          label = `${opt.duration} Hours${timeLabel ? ` (${timeLabel})` : ''}`;
        }
        return {
          ...opt,
          label: `${label} - ₪${opt.price}`
        };
      });
    }
    return [];
  }

  private isTimeSlotBooked(
    slot: { startTime: string, endTime: string },
    unavailableTimes: { startTime: string, endTime: string, bookingId?: string }[]
  ): boolean {
    if (!unavailableTimes || unavailableTimes.length === 0) {
      console.log(`      No unavailable times, slot is available`);
      return false;
    }

    const parseTimeString = (timeStr: string | undefined) => {
      if (!timeStr) return new Date();

      try {
        if (timeStr.includes('T')) {
          return new Date(timeStr);
        } else {
          const [hours, minutes, seconds] = timeStr.split(':').map(Number);
          const date = new Date();
          date.setHours(hours || 0, minutes || 0, seconds || 0, 0);
          return date;
        }
      } catch (e) {
        console.error('Error parsing time in isTimeSlotBooked:', timeStr, e);
        return new Date();
      }
    };

    const slotStart = parseTimeString(slot.startTime);
    const slotEnd = parseTimeString(slot.endTime);

    if (isNaN(slotStart.getTime()) || isNaN(slotEnd.getTime())) {
      console.log(`      Invalid slot time format, marking as booked for safety`);
      return true;
    }

    const slotStartHour = slotStart.getHours() + slotStart.getMinutes() / 60;
    const slotEndHour = slotEnd.getHours() + slotEnd.getMinutes() / 60;

    console.log(`    Checking if slot ${slotStart.toLocaleTimeString()} - ${slotEnd.toLocaleTimeString()} is booked`);

    for (const unavailable of unavailableTimes) {
      try {
        const unavailableStart = new Date(unavailable.startTime);
        const unavailableEnd = new Date(unavailable.endTime);

        if (isNaN(unavailableStart.getTime()) || isNaN(unavailableEnd.getTime())) {
          console.log(`      Invalid unavailable time format, skipping`);
          continue;
        }

        const unavailableStartHour = unavailableStart.getHours() + unavailableStart.getMinutes() / 60;
        const unavailableEndHour = unavailableEnd.getHours() + unavailableEnd.getMinutes() / 60;

        console.log(`      Against unavailable time: ${unavailableStart.toLocaleTimeString()} - ${unavailableEnd.toLocaleTimeString()}`);

        const overlap = !(slotEndHour <= unavailableStartHour || slotStartHour >= unavailableEndHour);

        const exactMatch = Math.abs(slotStartHour - unavailableStartHour) < 0.01 &&
          Math.abs(slotEndHour - unavailableEndHour) < 0.01;

        const slotContainsUnavailable = slotStartHour <= unavailableStartHour && slotEndHour >= unavailableEndHour;
        const unavailableContainsSlot = unavailableStartHour <= slotStartHour && unavailableEndHour >= slotEndHour;

        if (overlap || exactMatch || slotContainsUnavailable || unavailableContainsSlot) {
          console.log(`      CONFLICT DETECTED: This slot cannot be booked`);
          return true;
        }
      } catch (error) {
        console.error('Error processing unavailable time slot:', error);
        continue;
      }
    }

    console.log(`      No conflicts found, slot is available`);
    return false;
  }


  private isTimeRangeBooked(
    date: Date,
    startHour: number,
    endHour: number,
    unavailableTimes: { startTime: string, endTime: string, bookingId?: string }[]
  ): boolean {
    const start = new Date(date);
    start.setHours(startHour, 0, 0, 0);

    const end = new Date(date);
    end.setHours(endHour, 0, 0, 0);

    return this.isTimeSlotBooked({
      startTime: start.toISOString(),
      endTime: end.toISOString()
    }, unavailableTimes);
  }

  handleImageError(event: any): void {
    event.target.src = 'assets/images/placeholder.jpg';
  }

  getQueryParamsForSlot(slot: any, selectedDate: Date | null): any {
    if (!selectedDate) return {};
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    if (typeof slot === 'string') {
      if (slot.includes('Morning')) {
        const timeMatch = slot.match(/\((.*?) - (.*?)\)/);
        if (timeMatch && timeMatch.length >= 3) {
          return {
            date: dateStr,
            duration: '12',
            start: timeMatch[1],
            end: timeMatch[2],
            timeSlot: 'morning'
          };
        }

        return {
          date: dateStr,
          duration: '12',
          start: '00:00',
          end: '12:00',
          timeSlot: 'morning'
        };
      }

      if (slot.includes('Evening')) {
        const timeMatch = slot.match(/\((.*?) - (.*?)\)/);
        if (timeMatch && timeMatch.length >= 3) {
          return {
            date: dateStr,
            duration: '12',
            start: timeMatch[1],
            end: timeMatch[2],
            timeSlot: 'evening'
          };
        }

        return {
          date: dateStr,
          duration: '12',
          start: '12:00',
          end: '23:59',
          timeSlot: 'evening'
        };
      }

      if (slot === '24 Hours' || slot.includes('24 Hours')) {
        return {
          date: dateStr,
          duration: '24',
          start: '00:00',
          end: '23:59',
        };
      }

      if (slot.includes('Multiple Days')) {
        return {
          date: dateStr,
          duration: 'days',
        };
      }

      if (slot.includes(' - ') && !slot.includes('(')) {
        const [start, end] = slot.split(' - ');
        return {
          date: dateStr,
          start: start.replace(' ', ''),
          end: end.replace(' ', ''),
        };
      }

      return {
        date: dateStr,
        duration: '24',
      };
    }
    return {
      date: dateStr,
      duration: slot.duration,
      start: slot.checkInTime ? new Date(slot.checkInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined,
      end: slot.checkoutTime ? new Date(slot.checkoutTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined,
      price: slot.price,
      slotName: slot.slotName || undefined
    };
  }
}
