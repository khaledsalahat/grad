import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { VenueService } from "@/layout/service/venue.service";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { InputGroupModule } from "primeng/inputgroup";
import { InputGroupAddonModule } from "primeng/inputgroupaddon";
import { InputNumberModule } from "primeng/inputnumber";
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from "primeng/dropdown";
import { RadioButtonModule } from "primeng/radiobutton";
import { CheckboxModule } from "primeng/checkbox";
import { BookingService } from "@/layout/service/booking.service";
import { AuthService } from "@/layout/service/auth.service";
import { v4 as uuidv4 } from "uuid";
import { Request } from "@/layout/service/requests.model";
import { Venue } from "@/layout/service/venue.model";
import { PricingOption } from "@/layout/service/pricing.model";

@Component({
  selector: "app-booking",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AnimatedContainer,
    InputGroupModule,
    InputGroupAddonModule,
    InputNumberModule,
    CalendarModule,
    DropdownModule,
    RadioButtonModule,
    CheckboxModule,
  ],
  template: `
    <div class="min-h-screen bg-surface-900 text-surface-0">
      <div *ngIf="loading" class="flex justify-center items-center h-64">
        <div
          class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"
        ></div>
      </div>

      <div *ngIf="error" class="container mx-auto px-4 py-8">
        <div
          class="bg-red-900 border border-red-600 text-white px-6 py-4 rounded-xl"
          role="alert"
        >
          <div class="flex items-center">
            <i class="pi pi-exclamation-circle text-2xl mr-4"></i>
            <div>
              <h3 class="font-bold text-lg">Booking Error</h3>
              <p>{{ error }}</p>
              <button
                (click)="goBack()"
                class="mt-3 bg-white text-red-900 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        *ngIf="venue && !loading && !error"
        class="container mx-auto px-4 py-8"
      >
        <div class="mb-8">
          <div class="flex items-center mb-2">
            <a
              [routerLink]="['/details', venue.id]"
              class="text-primary-400 hover:text-primary-300 flex items-center"
            >
              <i class="pi pi-arrow-left mr-2"></i>
              <span>Back to venue</span>
            </a>
          </div>
          <h1 class="text-3xl md:text-4xl font-bold text-white">
            Book {{ venue.title }}
          </h1>
          <p class="text-surface-300 mt-2">
            Complete your booking details below
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2">
            <form
              [formGroup]="bookingForm"
              (ngSubmit)="onSubmit()"
              class="space-y-6"
            >
              <animated-container
                [delay]="100"
                enterClass="animate-slidefadeup"
                className="bg-surface-800 rounded-2xl p-6 shadow-lg"
              >
                <h2
                  class="text-xl font-semibold text-white mb-4 flex items-center"
                >
                  <i class="pi pi-calendar mr-3 text-primary-400"></i>
                  {{
                    venue.type === "wedding-hall"
                      ? "Select Date & Hours"
                      : "Select Date & Duration"
                  }}
                </h2>

                <div *ngIf="venue.type === 'wedding-hall'">
                  <div class="mb-4">
                    <label class="block mb-2 text-surface-200 text-sm"
                      >Event Date</label
                    >
                    {{ bookingForm.get("eventDate")?.value | date: "MMM d, y" }}
                  </div>
                  
                  <div class="mb-4 p-4 bg-primary-900/30 rounded-lg border border-primary-800">
                    <div class="flex items-start mb-3">
                      <i class="pi pi-info-circle text-primary-400 mt-0.5 mr-2"></i>
                      <div class="text-sm text-surface-300">
                        Check-in and Check-out times.
                      </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label class="block mb-2 text-surface-200 text-sm">
                          Check-in Time
                        </label>
                        <p-calendar
                          formControlName="weddingHallCheckInTime"
                          [timeOnly]="true"
                          hourFormat="12"
                          [stepMinute]="30"
                          [readonlyInput]="true"
                          styleClass="w-full bg-surface-700 border-surface-600 text-white"
                          placeholder="Select check-in time"
                          (onSelect)="updateTotalPrice()"
                        ></p-calendar>
                        <div
                          *ngIf="
                            bookingForm.get('weddingHallCheckInTime')?.touched &&
                            bookingForm.get('weddingHallCheckInTime')?.errors?.['required']
                          "
                          class="text-red-500 text-sm mt-1"
                        >
                          Check-in time is required
                        </div>
                      </div>

                      <div>
                        <label class="block mb-2 text-surface-200 text-sm">
                          Check-out Time
                        </label>
                        <p-calendar
                          formControlName="weddingHallCheckoutTime"
                          [timeOnly]="true"
                          hourFormat="12"
                          [stepMinute]="30"
                          [readonlyInput]="true"
                          styleClass="w-full bg-surface-700 border-surface-600 text-white"
                          placeholder="Select check-out time"
                          (onSelect)="updateTotalPrice()"
                        ></p-calendar>
                        <div
                          *ngIf="
                            bookingForm.get('weddingHallCheckoutTime')?.touched &&
                            bookingForm.get('weddingHallCheckoutTime')?.errors?.['required']
                          "
                          class="text-red-500 text-sm mt-1"
                        >
                          Check-out time is required
                        </div>
                        <div
                          *ngIf="
                            bookingForm.get('weddingHallCheckoutTime')?.touched &&
                            bookingForm.get('weddingHallCheckoutTime')?.errors?.['invalidTime']
                          "
                          class="text-red-500 text-sm mt-1"
                        >
                          Check-out time must be after check-in time
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div *ngIf="venue.type === 'chalet'">
                  <div class="mb-4">
                    <label class="block mb-2 text-surface-200 text-sm">Booking Date</label>
                    {{ bookingForm.get("eventDate")?.value | date: "MMM d, y" }}
                  </div>
                  <div class="mb-4">
                    <label class="block mb-2 text-surface-200 text-sm">Duration</label>
                    <div class="grid grid-cols-2 gap-4">
                      <div
                        class="p-4 border border-surface-600 rounded-xl cursor-pointer"
                        [class.bg-primary-900]="bookingForm.get('durationType')?.value === '12'"
                        [class.border-primary-400]="bookingForm.get('durationType')?.value === '12'"
                        (click)="setDuration('12')"
                      >
                        <div class="font-medium text-white text-center">12 hours</div>
                      </div>
                      <div
                        class="p-4 border border-surface-600 rounded-xl cursor-pointer"
                        [class.bg-primary-900]="bookingForm.get('durationType')?.value === '24'"
                        [class.border-primary-400]="bookingForm.get('durationType')?.value === '24'"
                        (click)="setDuration('24')"
                      >
                        <div class="font-medium text-white text-center">24 hours</div>
                      </div>
                      <div
                        class="p-4 border border-surface-600 rounded-xl cursor-pointer"
                        [class.bg-primary-900]="bookingForm.get('durationType')?.value === 'days'"
                        [class.border-primary-400]="bookingForm.get('durationType')?.value === 'days'"
                        (click)="setDuration('days')"
                      >
                        <div class="font-medium text-white text-center">Multiple Days</div>
                      </div>
                    </div>

                    <!-- Owner-defined 12-hour slots -->
                    <div *ngIf="bookingForm.get('durationType')?.value === '12' && chalet12hSlots.length > 0" class="mt-4">
                      <label class="block mb-2 text-surface-200 text-sm">Select 12-hour Slot</label>
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div *ngFor="let slot of chalet12hSlots" class="flex items-center p-3 border rounded-lg cursor-pointer"
                          [class.bg-primary-900]="selected12hSlot === slot"
                          [class.border-primary-400]="selected12hSlot === slot"
                          (click)="select12hSlot(slot)">
                          <input type="radio" [checked]="selected12hSlot === slot" class="mr-3" />
                          <div>
                            <div class="font-medium text-white">{{ slot.label }}</div>
                            <div class="text-surface-300 text-sm">
                              {{ slot.startTime | date: 'h:mm a' }} - {{ slot.endTime | date: 'h:mm a' }}
                            </div>
                            <div class="text-primary-400 text-sm font-semibold">
                              {{ slot.price | currency: 'ILS':'symbol':'1.0-0' }}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div *ngIf="!selected12hSlot" class="text-red-400 text-sm mt-1">Please select a slot</div>
                    </div>

                    <div
                      *ngIf="bookingForm.get('durationType')?.value === 'days'"
                      class="mt-4"
                    >
                      <label class="block mb-2 text-surface-200 text-sm"
                        >Select Duration</label
                      >
                      <p-dropdown
                        formControlName="selectedDuration"
                        [options]="multiDayDurations"
                        optionLabel="label"
                        optionValue="value"
                        (onChange)="updateTotalPrice()"
                        styleClass="w-full bg-surface-700 border-surface-600 text-white"
                        placeholder="Select duration"
                      ></p-dropdown>
                      <div
                        *ngIf="bookingForm.get('selectedDuration')?.invalid"
                        class="text-red-400 text-sm mt-1"
                      >
                        Please select a valid duration
                      </div>
                    </div>

                    <div
                      *ngIf="bookingForm.get('durationType')?.value === '12h'"
                      class="mt-4"
                    >
                      <label class="block mb-2 text-surface-200 text-sm"
                        >Start Time</label
                      >
                      <p-calendar
                        formControlName="startTime"
                        [timeOnly]="true"
                        hourFormat="12"
                        [readonlyInput]="true"
                        (onSelect)="updateEndTime()"
                        styleClass="w-full bg-surface-700 border-surface-600 text-white"
                        placeholder="Select start time"
                      >
                      </p-calendar>
                      <div
                        *ngIf="
                          bookingForm.get('startTime')?.invalid &&
                          bookingForm.get('startTime')?.touched
                        "
                        class="text-red-400 text-sm mt-1"
                      >
                        Please select a start time
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mt-4">
                  <label class="block mb-2 text-surface-200 text-sm"
                    >Number of Guests</label
                  >
                  <p-inputNumber
                    formControlName="guestCount"
                    [min]="1"
                    [max]="venue.capacity || 20"
                    [showButtons]="true"
                    styleClass="w-full bg-surface-700 border-surface-600 text-white"
                    placeholder="Enter number of guests"
                  >
                  </p-inputNumber>
                  <div
                    *ngIf="
                      bookingForm.get('guestCount')?.invalid &&
                      bookingForm.get('guestCount')?.touched
                    "
                    class="text-red-400 text-sm mt-1"
                  >
                    Please enter a valid number of guests
                  </div>
                </div>
              </animated-container>

              <animated-container
                [delay]="200"
                enterClass="animate-slidefadeup"
                className="bg-surface-800 rounded-2xl p-6 shadow-lg"
              >
                <h2
                  class="text-xl font-semibold text-white mb-4 flex items-center"
                >
                  <i class="pi pi-user mr-3 text-primary-400"></i>
                  Your Information
                </h2>

                <div class="space-y-4">
                  <div>
                    <label class="block mb-2 text-surface-200 text-sm"
                      >Full Name</label
                    >
                    <input
                      type="text"
                      formControlName="customerName"
                      class="w-full bg-surface-700 border border-surface-600 rounded-lg p-3 text-white"
                      placeholder="Enter your full name"
                    />
                    <div
                      *ngIf="
                        bookingForm.get('customerName')?.invalid &&
                        bookingForm.get('customerName')?.touched
                      "
                      class="text-red-400 text-sm mt-1"
                    >
                      Please enter your full name
                    </div>
                  </div>

                  <div>
                    <label class="block mb-2 text-surface-200 text-sm"
                      >Email Address</label
                    >
                    <input
                      type="email"
                      formControlName="customerEmail"
                      class="w-full bg-surface-700 border border-surface-600 rounded-lg p-3 text-white"
                      placeholder="Enter your email address"
                    />
                    <div
                      *ngIf="
                        bookingForm.get('customerEmail')?.invalid &&
                        bookingForm.get('customerEmail')?.touched
                      "
                      class="text-red-400 text-sm mt-1"
                    >
                      Please enter a valid email address
                    </div>
                  </div>

                  <div>
                    <label class="block mb-2 text-surface-200 text-sm"
                      >Phone Number</label
                    >
                    <input
                      type="tel"
                      formControlName="customerPhone"
                      class="w-full bg-surface-700 border border-surface-600 rounded-lg p-3 text-white"
                      placeholder="Enter your phone number"
                    />
                    <div
                      *ngIf="
                        bookingForm.get('customerPhone')?.invalid &&
                        bookingForm.get('customerPhone')?.touched
                      "
                      class="text-red-400 text-sm mt-1"
                    >
                      Please enter a valid phone number
                    </div>
                  </div>

                  <div>
                    <label class="block mb-2 text-surface-200 text-sm"
                      >Special Requests (Optional)</label
                    >
                    <textarea
                      formControlName="specialRequests"
                      rows="3"
                      class="w-full bg-surface-700 border border-surface-600 rounded-lg p-3 text-white"
                      placeholder="Any special requests or requirements?"
                    >
                    </textarea>
                  </div>
                </div>
              </animated-container>

              <animated-container
                [delay]="250"
                enterClass="animate-slidefadeup"
                className="bg-surface-800 rounded-2xl p-6 shadow-lg"
              >
                <h2
                  class="text-xl font-semibold text-white mb-4 flex items-center"
                >
                  <i class="pi pi-dollar mr-3 text-primary-400"></i>
                  Payment Options
                </h2>

                <div class="mb-6">
                  <label class="block mb-2 text-surface-200 text-sm"
                    >Payment Type</label
                  >
                  <div class="grid grid-cols-2 gap-4">
                    <div
                      class="p-4 border border-surface-600 rounded-xl cursor-pointer"
                      [class.bg-primary-900]="
                        bookingForm.get('paymentType')?.value === 'full'
                      "
                      [class.border-primary-400]="
                        bookingForm.get('paymentType')?.value === 'full'
                      "
                      (click)="setPaymentType('full')"
                    >
                      <div class="font-medium text-white text-center">
                        Full Payment
                      </div>
                      <div class="text-sm text-surface-300 text-center mt-1">
                        Pay the entire amount now
                      </div>
                      <div
                        class="text-lg font-semibold text-primary-400 text-center mt-2"
                      >
                        {{
                          calculateTotalPrice()
                            | currency: "ILS" : "symbol" : "1.0-0"
                        }}
                      </div>
                    </div>
                    <div
                      class="p-4 border border-surface-600 rounded-xl cursor-pointer"
                      [class.bg-primary-900]="
                        bookingForm.get('paymentType')?.value === 'deposit'
                      "
                      [class.border-primary-400]="
                        bookingForm.get('paymentType')?.value === 'deposit'
                      "
                      (click)="setPaymentType('deposit')"
                    >
                      <div class="font-medium text-white text-center">
                        Pay Deposit
                      </div>
                      <div class="text-sm text-surface-300 text-center mt-1">
                        Pay 30% now and the rest in hand
                      </div>
                      <div
                        class="text-lg font-semibold text-primary-400 text-center mt-2"
                      >
                        {{
                          calculateDepositAmount()
                            | currency: "ILS" : "symbol" : "1.0-0"
                        }}
                      </div>
                    </div>
                  </div>
                  <div
                    *ngIf="
                      bookingForm.get('paymentType')?.invalid &&
                      bookingForm.get('paymentType')?.touched
                    "
                    class="text-red-400 text-sm mt-1"
                  >
                    Please select a payment type
                  </div>
                </div>
              </animated-container>

              <animated-container
                [delay]="300"
                enterClass="animate-slidefadeup"
                className="bg-surface-800 rounded-2xl p-6 shadow-lg"
              >
                <h2
                  class="text-xl font-semibold text-white mb-4 flex items-center"
                >
                  <i class="pi pi-credit-card mr-3 text-primary-400"></i>
                  Payment Method
                </h2>

                <div class="space-y-4">
                  <div
                    class="flex items-center p-4 border border-surface-600 rounded-xl cursor-pointer"
                    [class.bg-primary-900]="
                      bookingForm.get('paymentMethod')?.value === 'apple-pay'
                    "
                    [class.border-primary-400]="
                      bookingForm.get('paymentMethod')?.value === 'apple-pay'
                    "
                    (click)="
                      bookingForm.get('paymentMethod')?.setValue('apple-pay')
                    "
                  >
                    <div class="flex-shrink-0 mr-4">
                      <div
                        class="w-12 h-8 bg-black rounded flex items-center justify-center"
                      >
                        <svg viewBox="0 0 24 24" class="w-6 h-6 fill-white">
                          <path
                            d="M17.0425 10.1843C17.0142 8.48448 18.4123 7.54576 18.4845 7.50221C17.6144 6.21131 16.2878 6.01521 15.8129 5.99854C14.6045 5.87976 13.4395 6.70131 12.8229 6.70131C12.1945 6.70131 11.2558 6.01521 10.2395 6.03187C8.92287 6.04854 7.68944 6.80131 7.01767 8.00131C5.63279 10.4346 6.66767 14.0013 7.99767 16.0013C8.66944 16.9846 9.44944 18.0846 10.4658 18.0513C11.4578 18.0179 11.8329 17.4179 13.0295 17.4179C14.2145 17.4179 14.5662 18.0513 15.6029 18.0346C16.6629 18.0179 17.3345 17.0513 17.9845 16.0679C18.7529 14.9346 19.0595 13.8179 19.0762 13.7679C19.0429 13.7513 17.0762 12.9846 17.0425 10.1843Z"
                          />
                          <path
                            d="M15.3129 4.31521C15.8462 3.64854 16.1978 2.73187 16.0795 1.79854C15.2978 1.83187 14.3229 2.33187 13.7729 2.98187C13.2845 3.56521 12.8562 4.51521 12.9912 5.41521C13.8629 5.48187 14.7629 4.98187 15.3129 4.31521Z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div class="flex-grow">
                      <div class="font-medium text-white">Apple Pay</div>
                      <div class="text-sm text-surface-300">
                        Pay securely with Apple Pay
                      </div>
                    </div>
                    <div class="flex-shrink-0 ml-4">
                      <div
                        class="w-6 h-6 rounded-full border-2"
                        [class.border-primary-400]="
                          bookingForm.get('paymentMethod')?.value ===
                          'apple-pay'
                        "
                        [class.border-surface-600]="
                          bookingForm.get('paymentMethod')?.value !==
                          'apple-pay'
                        "
                      >
                        <div
                          *ngIf="
                            bookingForm.get('paymentMethod')?.value ===
                            'apple-pay'
                          "
                          class="w-full h-full rounded-full bg-primary-400 flex items-center justify-center"
                        >
                          <i class="pi pi-check text-xs text-white"></i>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="flex items-center p-4 border border-surface-600 rounded-xl cursor-pointer"
                    [class.bg-primary-900]="
                      bookingForm.get('paymentMethod')?.value === 'credit-card'
                    "
                    [class.border-primary-400]="
                      bookingForm.get('paymentMethod')?.value === 'credit-card'
                    "
                    (click)="
                      bookingForm.get('paymentMethod')?.setValue('credit-card')
                    "
                  >
                    <div class="flex-shrink-0 mr-4">
                      <i
                        class="pi pi-credit-card text-2xl text-primary-400"
                      ></i>
                    </div>
                    <div class="flex-grow">
                      <div class="font-medium text-white">Credit Card</div>
                      <div class="text-sm text-surface-300">
                        Pay with Visa
                      </div>
                    </div>
                    <div class="flex-shrink-0 ml-4">
                      <div
                        class="w-6 h-6 rounded-full border-2"
                        [class.border-primary-400]="
                          bookingForm.get('paymentMethod')?.value ===
                          'credit-card'
                        "
                        [class.border-surface-600]="
                          bookingForm.get('paymentMethod')?.value !==
                          'credit-card'
                        "
                      >
                        <div
                          *ngIf="
                            bookingForm.get('paymentMethod')?.value ===
                            'credit-card'
                          "
                          class="w-full h-full rounded-full bg-primary-400 flex items-center justify-center"
                        >
                          <i class="pi pi-check text-xs text-white"></i>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="flex items-center p-4 border border-surface-600 rounded-xl cursor-pointer"
                    [class.bg-primary-900]="
                      bookingForm.get('paymentMethod')?.value === 'paypal'
                    "
                    [class.border-primary-400]="
                      bookingForm.get('paymentMethod')?.value === 'paypal'
                    "
                    (click)="
                      bookingForm.get('paymentMethod')?.setValue('paypal')
                    "
                  >
                    <div class="flex-shrink-0 mr-4">
                      <img src="/pages/travel/reflect.jpg" alt="PayPal" class="w-12 h-8 rounded object-cover" />
                    </div>
                    <div class="flex-grow">
                      <div class="font-medium text-white">Reflect</div>
                      <div class="text-sm text-surface-300">
                        Pay with Reflect
                      </div>
                    </div>
                    <div class="flex-shrink-0 ml-4">
                      <div
                        class="w-6 h-6 rounded-full border-2"
                        [class.border-primary-400]="
                          bookingForm.get('paymentMethod')?.value === 'paypal'
                        "
                        [class.border-surface-600]="
                          bookingForm.get('paymentMethod')?.value !== 'paypal'
                        "
                      >
                        <div
                          *ngIf="
                            bookingForm.get('paymentMethod')?.value === 'paypal'
                          "
                          class="w-full h-full rounded-full bg-primary-400 flex items-center justify-center"
                        >
                          <i class="pi pi-check text-xs text-white"></i>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    *ngIf="
                      bookingForm.get('paymentMethod')?.invalid &&
                      bookingForm.get('paymentMethod')?.touched
                    "
                    class="text-red-400 text-sm mt-1"
                  >
                    Please select a payment method
                  </div>
                </div>

                <div
                  *ngIf="
                    bookingForm.get('paymentMethod')?.value === 'credit-card'
                  "
                  class="mt-6 space-y-4"
                >
                  <div>
                    <label class="block mb-2 text-surface-200 text-sm"
                      >Card Number</label
                    >
                    <input
                      type="text"
                      formControlName="cardNumber"
                      class="w-full bg-surface-700 border border-surface-600 rounded-lg p-3 text-white"
                      placeholder="1234 5678 9012 3456"
                    />
                    <div
                      *ngIf="
                        bookingForm.get('cardNumber')?.invalid &&
                        bookingForm.get('cardNumber')?.touched
                      "
                      class="text-red-400 text-sm mt-1"
                    >
                      Please enter a valid card number
                    </div>
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block mb-2 text-surface-200 text-sm"
                        >Expiration Date</label
                      >
                      <input
                        type="text"
                        formControlName="cardExpiry"
                        class="w-full bg-surface-700 border border-surface-600 rounded-lg p-3 text-white"
                        placeholder="MM/YY"
                      />
                      <div
                        *ngIf="
                          bookingForm.get('cardExpiry')?.invalid &&
                          bookingForm.get('cardExpiry')?.touched
                        "
                        class="text-red-400 text-sm mt-1"
                      >
                        Please enter a valid expiry date
                      </div>
                    </div>

                    <div>
                      <label class="block mb-2 text-surface-200 text-sm"
                        >CVV</label
                      >
                      <input
                        type="text"
                        formControlName="cardCvv"
                        class="w-full bg-surface-700 border border-surface-600 rounded-lg p-3 text-white"
                        placeholder="123"
                      />
                      <div
                        *ngIf="
                          bookingForm.get('cardCvv')?.invalid &&
                          bookingForm.get('cardCvv')?.touched
                        "
                        class="text-red-400 text-sm mt-1"
                      >
                        Please enter a valid CVV
                      </div>
                    </div>
                  </div>

                  <div>
                    <label class="block mb-2 text-surface-200 text-sm"
                      >Cardholder Name</label
                    >
                    <input
                      type="text"
                      formControlName="cardholderName"
                      class="w-full bg-surface-700 border border-surface-600 rounded-lg p-3 text-white"
                      placeholder="Enter name as it appears on card"
                    />
                    <div
                      *ngIf="
                        bookingForm.get('cardholderName')?.invalid &&
                        bookingForm.get('cardholderName')?.touched
                      "
                      class="text-red-400 text-sm mt-1"
                    >
                      Please enter the cardholder name
                    </div>
                  </div>
                </div>
              </animated-container>

              <animated-container
                [delay]="400"
                enterClass="animate-slidefadeup"
                className="bg-surface-800 rounded-2xl p-6 shadow-lg"
              >
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="terms"
                      type="checkbox"
                      formControlName="termsAccepted"
                      class="w-4 h-4 border border-surface-600 rounded bg-surface-700 focus:ring-primary-500"
                    />
                  </div>
                  <label for="terms" class="ml-2 text-sm text-surface-300">
                    I agree to the
                    <a  class="text-primary-400 hover:underline"
                      >Terms and Conditions</a
                    >
                    and
                    <a  class="text-primary-400 hover:underline"
                      >Privacy Policy</a
                    >
                  </label>
                </div>
                <div
                  *ngIf="
                    bookingForm.get('termsAccepted')?.invalid &&
                    bookingForm.get('termsAccepted')?.touched
                  "
                  class="text-red-400 text-sm mt-1"
                >
                  You must accept the terms and conditions
                </div>
              </animated-container>
            </form>
          </div>

          <div class="space-y-6">
            <animated-container
              [delay]="150"
              enterClass="animate-slidefadeleft"
              className="bg-surface-800 rounded-2xl p-6 shadow-lg sticky top-4"
            >
              <h2
                class="text-xl font-semibold text-white mb-4 flex items-center"
              >
                <i class="pi pi-list mr-3 text-primary-400"></i>
                Booking Summary
              </h2>

              <div class="space-y-4">
                <div class="rounded-lg overflow-hidden h-40">
                  <img
                    [src]="venue.mainPicture"
                    class="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h3 class="text-lg font-semibold text-white">
                    {{ venue.title }}
                  </h3>
                  <div class="flex items-center text-surface-300 mt-1">
                    <i class="pi pi-map-marker mr-2 text-primary-400"></i>
                    {{ venue.location }}
                  </div>
                </div>

                <div
                  class="border-t border-b border-surface-700 py-4 space-y-3"
                >
                  <div class="flex justify-between">
                    <div class="text-surface-300">Date</div>
                    <div class="text-white text-right">
                      <ng-container
                        *ngIf="bookingForm.get('eventDate')?.value; else noDate"
                      >
                        {{
                          bookingForm.get("eventDate")?.value | date: "MMM d, y"
                        }}
                      </ng-container>
                      <ng-template #noDate>Select date</ng-template>
                    </div>
                  </div>

                  <div class="flex justify-between">
                    <div class="text-surface-300">
                      {{ venue.type === "wedding-hall" ? "Time" : "Duration" }}
                    </div>
                    <div class="text-white text-right">
                      <ng-container *ngIf="venue.type === 'wedding-hall'">
                        <ng-container
                          *ngIf="
                            bookingForm.get('weddingHallCheckInTime')?.value &&
                            bookingForm.get('weddingHallCheckoutTime')?.value
                          "
                        >
                          {{
                            bookingForm.get("weddingHallCheckInTime")?.value
                              | date: "shortTime"
                          }}
                          -
                          {{
                            bookingForm.get("weddingHallCheckoutTime")?.value
                              | date: "shortTime"
                          }}
                          <div class="text-sm text-surface-400">
                            {{ calculateHours() | number: "1.0-1" }} hours
                          </div>
                        </ng-container>
                      </ng-container>

                      <ng-container *ngIf="venue.type === 'chalet'">
                        <ng-container *ngIf="bookingForm.get('durationType')?.value === '12' && selected12hSlot">
                          <div class="text-white text-right">
                            {{ selected12hSlot.label }}<br />
                            <span class="text-surface-400 text-sm">
                              {{ selected12hSlot.startTime | date: 'h:mm a' }} - {{ selected12hSlot.endTime | date: 'h:mm a' }}
                            </span>
                          </div>
                        </ng-container>
                        <ng-container *ngIf="bookingForm.get('durationType')?.value === '24' && chalet24hStartTime && chalet24hEndTime">
                          24 hours
                          <div class="text-sm text-surface-400">
                            {{ chalet24hStartTime | date: 'h:mm a' }} - {{ chalet24hEndTime | date: 'h:mm a' }}
                          </div>
                        </ng-container>
                        <ng-container *ngIf="bookingForm.get('durationType')?.value === 'days'">
                          {{ bookingForm.get('selectedDuration')?.value / 24 }} Days
                        </ng-container>
                      </ng-container>
                    </div>
                  </div>

                  <div class="flex justify-between">
                    <div class="text-surface-300">Guests</div>
                    <div class="text-white">
                      {{ bookingForm.get("guestCount")?.value || 0 }}
                      {{
                        bookingForm.get("guestCount")?.value === 1
                          ? "guest"
                          : "guests"
                      }}
                    </div>
                  </div>

                  <div class="flex justify-between">
                    <div class="text-surface-300">
                      {{
                        venue.type === "wedding-hall"
                          ? "Venue rental"
                          : "Chalet rental"
                      }}
                    </div>
                    <div class="text-white">
                      {{
                        calculateBasePrice()
                          | currency: "ILS" : "symbol" : "1.0-0"
                      }}
                    </div>
                  </div>
                </div>

                <div class="flex justify-between items-center">
                  <div class="text-lg font-semibold text-white">Total</div>
                  <div class="text-xl font-bold text-primary-400">
                    {{
                      calculateTotalPrice()
                        | currency: "ILS" : "symbol" : "1.0-0"
                    }}
                  </div>
                </div>

                <div
                  *ngIf="bookingForm.get('paymentType')?.value === 'deposit'"
                  class="bg-primary-900/30 p-3 rounded-lg border border-primary-800"
                >
                  <div class="flex items-start">
                    <i
                      class="pi pi-info-circle text-primary-400 mt-0.5 mr-2"
                    ></i>
                    <div>
                      <div class="text-white font-medium">Deposit Payment</div>
                      <div class="text-sm text-surface-300">
                        You'll pay
                        {{
                          calculateDepositAmount()
                            | currency: "ILS" : "symbol" : "1.0-0"
                        }}
                        now (30%) and the remaining
                        {{
                          calculateTotalPrice() - calculateDepositAmount()
                            | currency: "ILS" : "symbol" : "1.0-0"
                        }}
                        in hand.
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  (click)="onSubmit()"
                  [disabled]="!bookingForm.valid || isSubmitting"
                  [ngClass]="{
                    'opacity-50 cursor-not-allowed':
                      !bookingForm.valid || isSubmitting,
                  }"
                  class="w-full py-4 px-6 bg-primary-500 text-white rounded-xl font-semibold text-lg hover:bg-primary-600 transition-colors flex items-center justify-center"
                >
                  <i class="pi pi-check mr-2"></i>
                  <span *ngIf="!isSubmitting">Complete Booking</span>
                  <span *ngIf="isSubmitting">Processing...</span>
                </button>

                <p class="text-sm text-surface-400 text-center">
                  You won't be charged until your request is approved
                </p>
              </div>
            </animated-container>
          </div>
        </div>
      </div>

      <div
        *ngIf="showConfirmation"
        class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      >
        <animated-container
          [delay]="0"
          enterClass="animate-zoomfadein"
          className="bg-surface-800 rounded-2xl p-8 shadow-2xl max-w-md w-full"
        >
          <div class="text-center">
            <div
              class="w-20 h-20 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <i class="pi pi-check-circle text-4xl text-primary-400"></i>
            </div>

            <h2 class="text-2xl font-bold text-white mb-2">
              Booking Confirmed!
            </h2>
            <p class="text-surface-300 mb-6"></p>

            <div class="bg-surface-700 rounded-xl p-4 mb-6">
              <div class="flex justify-between mb-2">
                <span class="text-surface-300"
                  >Your request has been sent to the Owner</span
                >
              </div>
              <div class="flex justify-between mb-2">
                <span class="text-surface-300">Date:</span>
                <span class="text-white">{{
                  bookingForm.get("eventDate")?.value | date: "MMM d, y"
                }}</span>
              </div>
              <div class="flex justify-between mb-2">
                <span class="text-surface-300">
                  {{
                    venue?.type === "wedding-hall" ? "Time:" : "durationType:"
                  }}
                </span>
                <span class="text-white">
                  <ng-container *ngIf="venue?.type === 'wedding-hall'">
                    {{ bookingForm.get("weddingHallCheckInTime")?.value | date: "h:mm a" }} -
                    {{ bookingForm.get("weddingHallCheckoutTime")?.value | date: "h:mm a" }}
                  </ng-container>
                  <ng-container *ngIf="venue?.type === 'chalet'">
                    <span *ngIf="bookingForm.get('durationType')?.value === 'days'">
                      {{ bookingForm.get("selectedDuration")?.value / 24 }} Days
                    </span>
                    <span *ngIf="bookingForm.get('durationType')?.value === '12'">
                      {{ selected12hSlot.label }}<br />
                      <span class="text-surface-400 text-sm">
                        {{ selected12hSlot.startTime | date: 'h:mm a' }} - {{ selected12hSlot.endTime | date: 'h:mm a' }}
                      </span>
                    </span>
                    <span *ngIf="bookingForm.get('durationType')?.value === '24'">
                      24 Hours
                    </span>
                  </ng-container>
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-surface-300">Total Amount:</span>
                <span class="text-primary-400 font-semibold">
                  {{
                    bookingForm.get("paymentType")?.value === "deposit"
                      ? (calculateDepositAmount()
                        | currency: "ILS" : "symbol" : "1.0-0")
                      : (calculateTotalPrice()
                        | currency: "ILS" : "symbol" : "1.0-0")
                  }}
                </span>
              </div>
              <div
                *ngIf="bookingForm.get('paymentType')?.value === 'deposit'"
                class="flex justify-between mt-2 pt-2 border-t border-surface-600"
              >
                <span class="text-surface-300">Remaining Balance:</span>
                <span class="text-white">{{
                  calculateTotalPrice() - calculateDepositAmount()
                    | currency: "ILS" : "symbol" : "1.0-0"
                }}</span>
              </div>
            </div>

            <button
              (click)="goToVenues()"
              class="w-full py-3 px-6 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors"
            >
              Continue Browsing
            </button>
          </div>
        </animated-container>
      </div>
    </div>
  `,
})
export class BookingComponent implements OnInit {
  venue: Venue | null = null;
  loading: boolean = true;
  error: string | null = null;
  bookingForm: FormGroup;
  isSubmitting: boolean = false;
  showConfirmation: boolean = false;
  bookingId: string = "";
  private authService = inject(AuthService);

  minDate: Date = new Date();
  maxDate: Date = new Date();

  availableDurations: PricingOption[] = [];

  private queryParamDate: string | null = null;
  private queryParamStart: string | null = null;
  private queryParamEnd: string | null = null;
  private queryParamDuration: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private venueService: VenueService,
    private bookingService: BookingService
  ) {
    this.maxDate.setFullYear(this.maxDate.getFullYear() + 1);

    this.bookingForm = this.fb.group({
      selectedDuration: [null],
      eventDate: [null, Validators.required],
      durationType: [null, Validators.required],
      guestCount: [1, [Validators.required, Validators.min(1)]],
      customerName: ["", Validators.required],
      customerEmail: ["", [Validators.required, Validators.email]],
      customerPhone: ["", Validators.required],
      specialRequests: [""],
      paymentType: ["full", Validators.required],
      paymentMethod: ["credit-card", Validators.required],
      cardNumber: [""],
      cardExpiry: [""],
      cardCvv: [""],
      cardholderName: [""],
      termsAccepted: [false, Validators.requiredTrue],
      customHours: [null],
      weddingHallCheckInTime: [null],
      weddingHallCheckoutTime: [null],
    });

    this.bookingForm.get("paymentMethod")?.valueChanges.subscribe((method) => {
      if (method === "credit-card") {
        this.bookingForm
          .get("cardNumber")
          ?.setValidators([Validators.required]);
        this.bookingForm
          .get("cardExpiry")
          ?.setValidators([Validators.required]);
        this.bookingForm.get("cardCvv")?.setValidators([Validators.required]);
        this.bookingForm
          .get("cardholderName")
          ?.setValidators([Validators.required]);
      } else {
        this.bookingForm.get("cardNumber")?.clearValidators();
        this.bookingForm.get("cardExpiry")?.clearValidators();
        this.bookingForm.get("cardCvv")?.clearValidators();
        this.bookingForm.get("cardholderName")?.clearValidators();
      }

      this.bookingForm.get("cardNumber")?.updateValueAndValidity();
      this.bookingForm.get("cardExpiry")?.updateValueAndValidity();
      this.bookingForm.get("cardCvv")?.updateValueAndValidity();
      this.bookingForm.get("cardholderName")?.updateValueAndValidity();
    });
  }
  multiDayDurations: any[] = [];
  chaletDurationOptions: any[] = [];
  chalet12hSlots: any[] = [];
  selected12hSlot: any = null;
  chalet24hStartTime: Date | null = null;
  chalet24hEndTime: Date | null = null;

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.queryParamDate = params.get("date");
      this.queryParamStart = params.get("start");
      this.queryParamEnd = params.get("end");
      this.queryParamDuration = params.get("duration");
      const timeSlot = params.get("timeSlot");

      console.log('Received date parameter:', this.queryParamDate);
      console.log('Received time slot:', timeSlot);

      if (this.queryParamDate) {
        try {
          const [year, month, day] = this.queryParamDate.split('-').map(Number);
          const exactDate = new Date(year, month - 1, day);
          console.log('Created date from parameters:',
            `${exactDate.getFullYear()}-${exactDate.getMonth() + 1}-${exactDate.getDate()}`);

          this.bookingForm.patchValue({
            eventDate: exactDate
          });
        } catch (error) {
          console.error('Error parsing date:', error);
          this.bookingForm.patchValue({
            eventDate: new Date(this.queryParamDate)
          });
        }
      }

      this.applyQueryParams();
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      if (id) {
        this.loadVenueDetails(id);
      }
    });
  }

  private applyQueryParams(): void {
    if (!this.venue) return;

    if (this.venue.type === 'chalet') {
      let durationType = this.queryParamDuration;
      const timeSlot = this.route.snapshot.queryParamMap.get("timeSlot");

      console.log('Applying query params for chalet:', {
        durationType,
        timeSlot,
        start: this.queryParamStart,
        end: this.queryParamEnd
      });

      if (this.queryParamStart && this.queryParamEnd && !durationType) {
        const startHours = parseInt(this.queryParamStart.split(':')[0]);
        const endHours = parseInt(this.queryParamEnd.split(':')[0]);

        if ((startHours === 0 && endHours === 12) ||
          (startHours === 12 && (endHours === 0 || endHours === 23))) {
          durationType = '12';
        } else if (startHours === 0 && (endHours === 23 || endHours === 0)) {
          durationType = '24';
        }
      }

      if (durationType) {
        this.setDuration(durationType as any);
        this.bookingForm.patchValue({
          durationType: durationType,
        });
      }
    }

    if (this.queryParamStart && this.queryParamEnd && this.venue.type === 'wedding-hall') {
      const eventDate = this.bookingForm.get('eventDate')?.value || new Date();

      const startTime = new Date(eventDate);
      const [startHours, startMinutes] = this.queryParamStart.split(':').map(Number);
      startTime.setHours(startHours, startMinutes || 0, 0, 0);

      const endTime = new Date(eventDate);
      const [endHours, endMinutes] = this.queryParamEnd.split(':').map(Number);
      endTime.setHours(endHours, endMinutes || 0, 0, 0);

      this.bookingForm.patchValue({
        weddingHallCheckInTime: startTime,
        weddingHallCheckoutTime: endTime
      });
    }

    this.updateTotalPrice();
  }

  private parseTimeString(timeString: string, baseDate: Date): Date {
    const [hours, minutes] = timeString.split(":").map(Number);
    const date = new Date(baseDate);
    date.setHours(hours, minutes || 0, 0, 0);
    if (hours >= 24) {
      date.setDate(date.getDate() + Math.floor(hours / 24));
      date.setHours(hours % 24);
    }
    return date;
  }

  private parseTimeValue(timeValue: any): Date | null {
    if (!timeValue) return null;

    if (timeValue instanceof Date) return timeValue;

    try {
      if (typeof timeValue === 'string') {
        if (timeValue.includes('T')) {
          const date = new Date(timeValue);
          if (!isNaN(date.getTime())) return date;
        }

        if (timeValue.includes(':')) {
          const [hours, minutes, seconds] = timeValue.split(':').map(Number);
          const date = new Date();
          date.setHours(hours || 0, minutes || 0, seconds || 0, 0);
          return date;
        }
      }

      const date = new Date(timeValue);
      if (!isNaN(date.getTime())) return date;
    } catch (error) {
      console.error('Error parsing time value:', error, timeValue);
    }

    return null;
  }

  private setDefaultWeddingHallTimes(): void {
    const defaultCheckIn = new Date();
    defaultCheckIn.setHours(12, 0, 0, 0);

    const defaultCheckOut = new Date();
    defaultCheckOut.setHours(18, 0, 0, 0);

    this.bookingForm.patchValue({
      weddingHallCheckInTime: defaultCheckIn,
      weddingHallCheckoutTime: defaultCheckOut
    });

    console.log('Set default wedding hall times:', {
      checkIn: defaultCheckIn,
      checkOut: defaultCheckOut
    });
  }

  loadVenueDetails(id: string): void {
    this.loading = true;
    this.error = null;

    this.venueService.getVenueDetails(id).subscribe({
      next: (venue) => {
        this.venue = venue;
        const v: any = this.venue;
        if (this.venue && !this.venue.pricing && Array.isArray(v.pricingOptions)) {
          this.venue.pricing = v.pricingOptions;
        }
        this.loading = false;

        if (venue.type === 'wedding-hall') {
          this.bookingForm.get('weddingHallCheckInTime')?.setValidators([Validators.required]);
          this.bookingForm.get('weddingHallCheckoutTime')?.setValidators([Validators.required]);
          this.bookingForm.get('durationType')?.clearValidators();
        } else {
          this.bookingForm.get('durationType')?.setValidators([Validators.required]);
          this.bookingForm.get('weddingHallCheckInTime')?.clearValidators();
          this.bookingForm.get('weddingHallCheckoutTime')?.clearValidators();
        }

        this.bookingForm.updateValueAndValidity();

        if (venue.type === 'chalet') {
          this.chaletDurationOptions = [];
          this.chalet12hSlots = [];
          this.multiDayDurations = [];

          const pricing = this.venue && this.venue.pricing ? this.venue.pricing : [];
          const byDuration: { [key: string]: any[] } = {};
          pricing.forEach((opt: any) => {
            if (!byDuration[opt.duration]) byDuration[opt.duration] = [];
            byDuration[opt.duration].push(opt);
          });

          if (byDuration['12']) {
            this.chalet12hSlots = byDuration['12'].map((opt: any) => ({
              label: opt.label || (opt.slotName ? `12 Hours - ${opt.slotName}` : '12 Hours'),
              value: opt,
              startTime: opt.startTime,
              endTime: opt.endTime,
              price: opt.price,
              slotName: opt.slotName || '',
            }));
            if (this.chalet12hSlots.length > 0) {
              this.chaletDurationOptions.push({
                label: '12 Hours',
                value: '12',
                slots: this.chalet12hSlots
              });
            }
          }

          if (byDuration['24']) {
            const opt = byDuration['24'][0];
            this.chaletDurationOptions.push({
              label: '24 Hours',
              value: '24',
              price: opt.price,
              startTime: opt.startTime,
              endTime: opt.endTime
            });
            this.chalet24hStartTime = opt.startTime ? new Date(opt.startTime) : null;
            this.chalet24hEndTime = opt.endTime ? new Date(opt.endTime) : null;
          } else {
            this.chalet24hStartTime = null;
            this.chalet24hEndTime = null;
          }

          Object.keys(byDuration).forEach((dur) => {
            const hours = parseInt(dur, 10);
            if (hours > 24 && hours % 24 === 0) {
              const opt = byDuration[dur][0];
              this.multiDayDurations.push({
                value: dur,
                label: this.getDurationLabel(dur),
                price: opt.price,
                startTime: opt.startTime,
                endTime: opt.endTime
              });
            }
          });
        }

        if (venue.capacity) {
          this.bookingForm
            .get("guestCount")
            ?.setValue(Math.min(2, venue.capacity));
        }

        this.applyQueryParams();

        if (venue.type === 'wedding-hall') {
          const checkInSet = !!this.bookingForm.get('weddingHallCheckInTime')?.value;
          const checkOutSet = !!this.bookingForm.get('weddingHallCheckoutTime')?.value;
          if (!checkInSet || !checkOutSet) {
            const globalTimeSlots = venue.globalTimeSlots || [];
            if (Array.isArray(globalTimeSlots) && globalTimeSlots.length > 0) {
              try {
                const firstSlot = globalTimeSlots[0];
                const startTime = this.parseTimeValue(firstSlot.startTime);
                const endTime = this.parseTimeValue(firstSlot.endTime);
                if (startTime && endTime) {
                  this.bookingForm.patchValue({
                    weddingHallCheckInTime: startTime,
                    weddingHallCheckoutTime: endTime
                  });
                  console.log('Set wedding hall times from global time slots:', {
                    checkIn: startTime,
                    checkOut: endTime
                  });
                }
              } catch (error) {
                console.error('Error setting wedding hall times from global time slots:', error);
                this.setDefaultWeddingHallTimes();
              }
            } else {
              this.setDefaultWeddingHallTimes();
            }
          }
        }
      },
      error: (err) => {
        console.error("Error loading venue details:", err);
        this.error = "Failed to load venue details. Please try again later.";
        this.loading = false;
      },
    });
  }

  public getDurationLabel(duration: string): string {
    const hours = parseInt(duration);
    const days = hours / 24;
    return days === 1 ? "24 Hours" : `${days} Days`;
  }

  calculateHours(): number {
    if (!this.venue) return 0;

    if (this.venue.type === 'wedding-hall') {
      const checkInTime = this.bookingForm.get('weddingHallCheckInTime')?.value;
      const checkOutTime = this.bookingForm.get('weddingHallCheckoutTime')?.value;

      if (checkInTime && checkOutTime) {
        const sameDay = new Date(this.bookingForm.get('eventDate')?.value || new Date());

        const startHours = new Date(checkInTime).getHours();
        const startMinutes = new Date(checkInTime).getMinutes();

        const endHours = new Date(checkOutTime).getHours();
        const endMinutes = new Date(checkOutTime).getMinutes();

        const start = new Date(sameDay);
        start.setHours(startHours, startMinutes, 0, 0);

        const end = new Date(sameDay);
        end.setHours(endHours, endMinutes, 0, 0);

        if (end < start) {
          end.setDate(end.getDate() + 1);
        }

        const diffMs = end.getTime() - start.getTime();
        return Math.max(1, Math.round(diffMs / (1000 * 60 * 60)));
      }
      return 0;
    }

    return this.bookingForm.get("durationType")?.value || 0;
  }

  calculateBasePrice(): number {
    if (!this.venue) return 0;
    if (this.venue.type === 'wedding-hall') {
      return this.venue.pricePerDay || 0;
    }
    if (this.venue.type === 'chalet') {
      const durationType = this.bookingForm.get('durationType')?.value;
      if (durationType === '12' && this.selected12hSlot) {
        return this.selected12hSlot.price;
      }
      if (durationType === '24') {
        const opt = this.chaletDurationOptions.find(o => o.value === '24');
        return opt ? opt.price : 0;
      }
      if (durationType === 'days') {
        const selected = this.bookingForm.get('selectedDuration')?.value;
        const opt = this.multiDayDurations.find(o => o.value === selected);
        return opt ? opt.price : 0;
      }
    }
    return 0;
  }

  calculateTotalPrice(): number {
    if (!this.venue) return 0;

    if (this.venue.type === "wedding-hall") {
      return this.venue.pricePerDay || 0;
    } else {
      const durationType = this.bookingForm.get("durationType")?.value;
      if (!durationType) return this.venue.pricePerDay || 0;

      let selectedDuration;
      if (durationType === "days") {
        selectedDuration = this.bookingForm.get("selectedDuration")?.value;
        if (!selectedDuration) {
          return this.venue.pricePerDay || 0;
        }
      } else {
        selectedDuration = durationType;
      }

      console.log("Looking for pricing option with duration:", selectedDuration);

      const pricingOption = this.venue.pricing?.find(
        opt => opt.duration === selectedDuration
      );

      if (pricingOption) {
        console.log("Found exact pricing option match:", pricingOption);
        return pricingOption.price;
      }

      if (durationType === "days" && this.multiDayDurations.length > 0) {
        const multiDayOption = this.multiDayDurations.find(
          opt => opt.value === selectedDuration
        );

        if (multiDayOption) {
          console.log("Found multi-day pricing option:", multiDayOption);
          return multiDayOption.price;
        }
      }

      console.log("No matching pricing option found, using default calculation");
      if (durationType === "12") {
        return (this.venue.pricePerDay || 0) / 2;
      } else if (durationType === "24") {
        return this.venue.pricePerDay || 0;
      } else if (durationType === "days" && selectedDuration) {
        try {
          const hours = parseInt(selectedDuration);
          if (!isNaN(hours)) {
            const days = hours / 24;
            return (this.venue.pricePerDay || 0) * days;
          }
        } catch (error) {
          console.error("Error calculating price for duration:", error);
        }
        return this.venue.pricePerDay || 0;
      } else {
        return this.venue.pricePerDay || 0;
      }
    }
  }

  calculateDepositAmount(): number {
    return this.calculateTotalPrice() * 0.3;
  }

  updateTotalPrice(): void {
    this.bookingForm.updateValueAndValidity();

    if (this.venue?.type === 'wedding-hall') {
      const checkInTime = this.bookingForm.get('weddingHallCheckInTime')?.value;
      const checkOutTime = this.bookingForm.get('weddingHallCheckoutTime')?.value;

      if (checkInTime && checkOutTime) {
        const startHours = new Date(checkInTime).getHours();
        const startMinutes = new Date(checkInTime).getMinutes();

        const endHours = new Date(checkOutTime).getHours();
        const endMinutes = new Date(checkOutTime).getMinutes();

        const sameDay = new Date();

        const start = new Date(sameDay);
        start.setHours(startHours, startMinutes, 0, 0);

        const end = new Date(sameDay);
        end.setHours(endHours, endMinutes, 0, 0);

        if (end <= start) {
          this.bookingForm.get('weddingHallCheckoutTime')?.setErrors({ invalidTime: true });
        } else {
          this.bookingForm.get('weddingHallCheckoutTime')?.updateValueAndValidity();
        }
      }
    }

    this.validateDateAvailability();
  }

  private validateDateAvailability(): void {
    const startDate = this.bookingForm.get("eventDate")?.value;
    const duration = this.bookingForm.get("selectedDuration")?.value;

    if (!startDate || !duration || !this.venue) return;

    const days = parseInt(duration) / 24;
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + days);

    const datesInRange = this.getDatesInRange(new Date(startDate), endDate);
    const isAvailable = datesInRange.every(
      (date) => !this.venue!.unavailableDates?.includes(this.formatDate(date))
    );

    if (!isAvailable) {
      this.bookingForm.setErrors({ unavailableDates: true });
      this.error =
        "Selected dates contain unavailable dates. Please adjust your selection.";
    } else {
      this.error = null;
      this.bookingForm.setErrors(null);
    }
  }

  private getDatesInRange(start: Date, end: Date): Date[] {
    const dates = [];
    let current = new Date(start);

    while (current <= end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return dates;
  }

  private formatDate(date: Date): string {
    return date.toISOString().split("T")[0];
  }

  setDuration(duration: string) {
    this.bookingForm.get('durationType')?.setValue(duration);
    if (duration === '12' && this.chalet12hSlots.length > 0) {
      this.selected12hSlot = this.chalet12hSlots[0];
      this.bookingForm.patchValue({
        startTime: this.selected12hSlot.startTime,
        endTime: this.selected12hSlot.endTime
      });
    } else if (duration === '24') {
      this.bookingForm.patchValue({
        startTime: this.chalet24hStartTime,
        endTime: this.chalet24hEndTime
      });
    }
    this.updateTotalPrice();
  }

  select12hSlot(slot: any) {
    this.selected12hSlot = slot;
    this.bookingForm.patchValue({
      startTime: slot.startTime,
      endTime: slot.endTime
    });
    this.updateTotalPrice();
  }

  contactOwner() {
    console.log("Redirecting to contact form...");
  }

  updateEndTime(): void {
    const startTime = this.bookingForm.get("startTime")?.value;
    if (startTime && this.bookingForm.get("durationType")?.value === "12") {
      const endTime = new Date(startTime);
      endTime.setHours(endTime.getHours() + 12);

      this.bookingForm.patchValue({ endTime });
      this.updateTotalPrice();
    }
  }

  setPaymentType(type: "full" | "deposit"): void {
    this.bookingForm.patchValue({ paymentType: type });
  }

  goBack(): void {
    this.router.navigate(["/details", this.venue?.id || ""]);
  }

  onSubmit(): void {
    if (this.bookingForm.invalid || this.isSubmitting) return;
    this.isSubmitting = true;
    const bookingData = this.bookingForm.value;

    let startDate: string, endDate: string;
    if (this.venue?.type === 'wedding-hall') {
      startDate = bookingData.eventDate;
      endDate = bookingData.eventDate;
    } else {
      startDate = bookingData.eventDate;
      if (bookingData.durationType === 'days') {
        const days = parseInt(bookingData.selectedDuration) / 24;
        const end = new Date(startDate);
        end.setDate(end.getDate() + days - 1);
        endDate = end.toISOString();
      } else {
        endDate = startDate;
      }
    }

    const totalPrice = this.calculateTotalPrice();
    const paidAmount = bookingData.paymentType === 'deposit'
      ? this.calculateDepositAmount()
      : totalPrice;

    const payload: any = {
      venueId: this.venue?.id || '',
      startDate,
      endDate,
      guestCount: bookingData.guestCount,
      customerName: bookingData.customerName,
      customerEmail: bookingData.customerEmail,
      customerPhone: bookingData.customerPhone,
      specialRequests: bookingData.specialRequests,
      calculatedTotalPrice: totalPrice,
      paidAmount,
      paymentType: bookingData.paymentType,
      paymentMethod: bookingData.paymentMethod,
      duration: this.getFinalDuration(),
      weddingHallCheckInTime: bookingData.weddingHallCheckInTime,
      weddingHallCheckoutTime: bookingData.weddingHallCheckoutTime,
      timeSlot: bookingData.timeSlot,
    };

    this.bookingService.createBooking(payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.showConfirmation = true;
      },
      error: (err) => {
        this.isSubmitting = false;
        this.error = err?.error?.message || "Booking failed. Please try again.";
      }
    });
  }

  private getFinalDuration(): string {
    if (this.venue?.type === 'wedding-hall') {
      const hours = this.calculateHours();
      return `${hours} hours`;
    } else {
      const durationType = this.bookingForm.get("durationType")?.value;
      const queryTimeSlot = this.route.snapshot.queryParamMap.get("timeSlot");

      switch (durationType) {
        case "days":
          return this.bookingForm.get("selectedDuration")?.value || "24";
        case "12":
          if (queryTimeSlot === 'morning') {
            return "12-morning";
          } else if (queryTimeSlot === 'evening') {
            return "12-evening";
          }

          const startHour = this.queryParamStart ?
            parseInt(this.queryParamStart.split(':')[0]) :
            new Date(this.bookingForm.get("eventDate")?.value).getHours();

          if (startHour < 12) {
            return "12-morning";
          } else {
            return "12-evening";
          }
        case "24":
          return "24";
        default:
          return durationType || "24";
      }
    }
  }

  goToVenues(): void {
    this.router.navigate(["/venues"]);
  }
}
