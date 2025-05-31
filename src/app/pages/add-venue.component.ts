import { VenueService } from "@/layout/service/venue.service";
import { Component, ElementRef, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormArray,
  FormControl,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  FormsModule,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { AppNavbar } from "../layout/components/app.navbar";
import { InputGroupModule } from "primeng/inputgroup";
import { InputGroupAddonModule } from "primeng/inputgroupaddon";
import { InputNumberModule } from "primeng/inputnumber";
import { SelectButtonModule } from "primeng/selectbutton";
import { CheckboxModule } from "primeng/checkbox";
import { CalendarModule } from "primeng/calendar";
import { AuthService } from "@/layout/service/auth.service";
import { LocalStorageService } from "@/layout/service/local-storage.service";
import { DropdownModule } from "primeng/dropdown";
import { AutoCompleteModule } from "primeng/autocomplete";
import { MultiSelectModule } from "primeng/multiselect";
import { Venue } from "@/layout/service/venue.model";
import { Availability } from "@/layout/service/availability.model";
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: "app-add-venue",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule,
    AppNavbar,
    InputGroupModule,
    InputGroupAddonModule,
    InputNumberModule,
    CheckboxModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    AutoCompleteModule,
    MultiSelectModule,
    ToastModule,
  ],
  providers: [MessageService],
  template: `
    <div class="min-h-screen bg-surface-900 text-surface-0">
      <app-navbar />
      <p-toast></p-toast>
      <div class="container mx-auto p-6">
        <div class="flex items-center mb-8">
          <i class="pi pi-plus-circle text-primary-400 text-3xl mr-4"></i>
          <h1 class="text-3xl md:text-4xl font-bold text-white">
            {{ isEditMode ? "Edit" : "Add New" }} Venue
          </h1>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2">
            <form
              [formGroup]="venueForm"
              (ngSubmit)="onSubmit()"
              class="space-y-6"
            >
              <div class="bg-surface-800 rounded-2xl p-6 shadow-lg">
                <h2
                  class="text-xl font-semibold text-white mb-4 flex items-center"
                >
                  <i class="pi pi-tag mr-3 text-primary-400"></i>
                  Venue Type <span class="text-red-500">*</span>
                </h2>
                <p-selectButton
                  [options]="venueTypes"
                  formControlName="type"
                  optionLabel="label"
                  optionValue="value"
                  styleClass="w-full"
                  (onChange)="onVenueTypeChange($event)"
                ></p-selectButton>
                <div class="flex justify-end mt-2">
                  <div class="text-sm text-primary-400">
                    Currently selected: <span class="font-bold">{{ venueForm.get('type')?.value === 'wedding-hall' ? 'Wedding Hall' : 'Chalet' }}</span>
                  </div>
                </div>
              </div>

              <div class="bg-surface-800 rounded-2xl p-6 shadow-lg">
                <h2
                  class="text-xl font-semibold text-white mb-4 flex items-center"
                >
                  <i class="pi pi-image mr-3 text-primary-400"></i>
                  Main Picture <span class="text-red-500">*</span>
                </h2>
                <div
                  class="relative group w-full h-56 rounded-xl border-2 border-dashed border-surface-600 flex items-center justify-center cursor-pointer hover:border-primary-400 transition-colors"
                  [class.border-red-500]="!mainPicturePreview && venueForm.get('mainPicture')?.touched"
                >
                  <input
                    #mainPictureInput
                    type="file"
                    (change)="onMainPictureSelect($event)"
                    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                    required
                  />
                  <div class="text-center" *ngIf="!mainPicturePreview">
                    <i
                      class="pi pi-cloud-upload text-4xl text-primary-400 mb-3"
                    ></i>
                    <p class="text-surface-200">
                      Click or drag to upload main picture
                    </p>
                    <p class="text-surface-400 text-sm mt-2">
                      This will be the featured image
                    </p>
                  </div>
                  <div
                    *ngIf="mainPicturePreview"
                    class="relative w-full h-full"
                  >
                    <img
                      [src]="mainPicturePreview"
                      class="w-full h-full object-cover rounded-xl"
                    />
                    <div
                      class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      <button
                        type="button"
                        class="bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-red-600"
                        (click)="removeMainPicture()"
                      >
                        <i class="pi pi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  *ngIf="!mainPicturePreview && venueForm.get('mainPicture')?.touched"
                  class="text-red-400 text-sm mt-2"
                >
                  Main picture is required
                </div>
                <div class="mt-3 flex justify-end" *ngIf="!mainPicturePreview">
                  <button
                    type="button"
                    class="bg-primary-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-primary-600"
                    (click)="useDefaultImage()"
                  >
                    Use Default Image
                  </button>
                </div>
              </div>

              <div class="bg-surface-800 rounded-2xl p-6 shadow-lg">
                <h2
                  class="text-xl font-semibold text-white mb-4 flex items-center"
                >
                  <i class="pi pi-info-circle mr-3 text-primary-400"></i>
                  Basic Information
                </h2>

                <div class="space-y-4">
                  <div>
                    <label class="block mb-2 text-surface-200 text-sm"
                      >Venue Title <span class="text-red-500">*</span></label
                    >
                    <p-inputGroup styleClass="w-full">
                      <p-inputGroupAddon>
                        <i class="pi pi-tag text-primary-400"></i>
                      </p-inputGroupAddon>
                      <input
                        pInputText
                        formControlName="title"
                        placeholder="Enter venue title"
                        class="w-full bg-surface-700 border-surface-600 text-white"
                      />
                    </p-inputGroup>
                    <div
                      *ngIf="venueForm.get('title')?.invalid && venueForm.get('title')?.touched"
                      class="text-red-400 text-sm mt-1"
                    >
                      Venue title is required
                    </div>
                  </div>

                  <div>
                    <label class="block mb-2 text-surface-200 text-sm"
                      >Location <span class="text-red-500">*</span></label
                    >
                    <p-inputGroup styleClass="w-full">
                      <p-inputGroupAddon>
                        <i class="pi pi-map-marker text-primary-400"></i>
                      </p-inputGroupAddon>
                      <input
                        pInputText
                        formControlName="location"
                        placeholder="Enter location"
                        class="w-full bg-surface-700 border-surface-600 text-white"
                      />
                    </p-inputGroup>
                    <div
                      *ngIf="venueForm.get('location')?.invalid && venueForm.get('location')?.touched"
                      class="text-red-400 text-sm mt-1"
                    >
                      Location is required
                    </div>
                  </div>

                  <div>
                    <label class="block mb-2 text-surface-200 text-sm"
                      >Description</label
                    >
                    <p-inputGroup styleClass="w-full">
                      <p-inputGroupAddon>
                        <i class="pi pi-align-left text-primary-400"></i>
                      </p-inputGroupAddon>
                      <textarea
                        pInputText
                        formControlName="description"
                        placeholder="Describe your venue"
                        rows="4"
                        class="w-full bg-surface-700 border-surface-600 text-white"
                      ></textarea>
                    </p-inputGroup>
                  </div>
                </div>
              </div>

              <div
                *ngIf="venueForm.get('type')?.value === 'wedding-hall'"
                class="bg-surface-800 rounded-2xl p-6 shadow-lg"
              >
                <h2
                  class="text-xl font-semibold text-white mb-4 flex items-center"
                >
                  <i class="pi pi-users mr-3 text-primary-400"></i>
                  Wedding Hall Details
                </h2>
                <div class="space-y-4">
                  <div>
                    <label class="block mb-2 text-surface-200 text-sm"
                      >Capacity <span class="text-red-500">*</span></label
                    >
                    <p-inputGroup styleClass="w-full">
                      <p-inputGroupAddon>
                        <i class="pi pi-users text-primary-400"></i>
                      </p-inputGroupAddon>
                      <p-inputNumber
                        formControlName="capacity"
                        placeholder="Number of guests"
                        [min]="1"
                        styleClass="w-full bg-surface-700 border-surface-600 text-white"
                      ></p-inputNumber>
                    </p-inputGroup>
                    <div
                      *ngIf="venueForm.get('capacity')?.invalid && venueForm.get('capacity')?.touched"
                      class="text-red-400 text-sm mt-1"
                    >
                      Please enter a valid capacity (minimum 1)
                    </div>
                  </div>
                  <div>
                    <label class="block mb-2 text-surface-200 text-sm"
                      >Price <span class="text-red-500">*</span></label
                    >
                    <p-inputGroup styleClass="w-full">
                      <p-inputGroupAddon>
                        <i class="pi pi-dollar text-primary-400"></i>
                      </p-inputGroupAddon>
                      <p-inputNumber
                        formControlName="pricePerDay"
                        placeholder="Enter price per day"
                        [min]="1"
                        styleClass="w-full bg-surface-700 border-surface-600 text-white"
                      ></p-inputNumber>
                    </p-inputGroup>
                    <div
                      *ngIf="venueForm.get('pricePerDay')?.invalid && venueForm.get('pricePerDay')?.touched"
                      class="text-red-400 text-sm mt-1"
                    >
                      Please enter a valid price (minimum $1)
                    </div>
                  </div>
                </div>
              </div>

              <div
                *ngIf="venueForm.get('type')?.value === 'chalet'"
                class="bg-surface-800 rounded-2xl p-6 shadow-lg"
              >
                <h2
                  class="text-xl font-semibold text-white mb-4 flex items-center"
                >
                  <i class="pi pi-home mr-3 text-primary-400"></i>
                  Chalet Details
                </h2>
                <div class="space-y-4">
                  <div>
                    <label class="block mb-2 text-surface-200 text-sm"
                      >Number of Rooms</label
                    >
                    <p-inputGroup styleClass="w-full">
                      <p-inputGroupAddon>
                        <i class="pi pi-door text-primary-400"></i>
                      </p-inputGroupAddon>
                      <p-inputNumber
                        formControlName="rooms"
                        placeholder="Number of rooms"
                        [min]="1"
                        styleClass="w-full bg-surface-700 border-surface-600 text-white"
                      ></p-inputNumber>
                    </p-inputGroup>
                  </div>

                  <div>
                    <label class="block mb-2 text-surface-200 text-sm"
                      >Number of Bathrooms</label
                    >
                    <p-inputGroup styleClass="w-full">
                      <p-inputGroupAddon>
                        <i class="pi pi-shower text-primary-400"></i>
                      </p-inputGroupAddon>
                      <p-inputNumber
                        formControlName="bathrooms"
                        placeholder="Number of bathrooms"
                        [min]="1"
                        styleClass="w-full bg-surface-700 border-surface-600 text-white"
                      ></p-inputNumber>
                    </p-inputGroup>
                  </div>
                </div>
              </div>

              <div class="bg-surface-800 rounded-2xl p-6 shadow-lg">
                <h2
                  class="text-xl font-semibold text-white mb-4 flex items-center"
                >
                  <i class="pi pi-images mr-3 text-primary-400"></i>
                  Additional Photos
                </h2>
                <div class="flex flex-wrap gap-4">
                  <div
                    *ngFor="let preview of additionalPhotosPreviews"
                    class="relative w-32 h-32 group"
                  >
                    <img
                      [src]="preview"
                      class="w-full h-full object-cover rounded-lg border border-surface-600"
                    />
                    <div
                      class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      <button
                        type="button"
                        class="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-red-600"
                        (click)="removePhoto(preview)"
                      >
                        <i class="pi pi-trash"></i>
                      </button>
                    </div>
                  </div>
                  <label
                    class="w-32 h-32 border border-dashed border-surface-600 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-surface-700/50 transition-colors"
                  >
                    <input
                      type="file"
                      multiple
                      (change)="onAdditionalPhotosSelect($event)"
                      class="hidden"
                      accept="image/*"
                    />
                    <i
                      class="pi pi-plus-circle text-2xl text-primary-400 mb-2"
                    ></i>
                    <span class="text-xs text-surface-300">Add photos</span>
                  </label>
                </div>
              </div>

              <div
                *ngIf="venueForm.get('type')?.value === 'chalet'"
                class="bg-surface-800 rounded-2xl p-6 shadow-lg"
              >
                <h2
                  class="text-xl font-semibold text-white mb-4 flex items-center"
                >
                  <i class="pi pi-list mr-3 text-primary-400"></i>
                  Amenities & Features
                </h2>
                <p-multiSelect
                  [options]="amenities"
                  formControlName="amenities"
                  placeholder="Select amenities"
                  [showToggleAll]="true"
                  [selectionLimit]="0"
                  class="w-full"
                >
                </p-multiSelect>
                <div
                  *ngIf="venueForm.get('amenities')?.errors?.['required']"
                  class="text-red-400 text-sm mt-2"
                >
                  Please select at least one amenity
                </div>
              </div>
              <div
                *ngIf="venueForm.get('type')?.value === 'chalet'"
                class="bg-surface-800 rounded-2xl p-6 shadow-lg"
              >
                <h2
                  class="text-xl font-semibold text-white mb-4 flex items-center"
                >
                  <i class="pi pi-dollar mr-3 text-primary-400"></i>
                  Pricing Options
                </h2>
                <div formArrayName="pricing" class="space-y-4">
                  <div
                    *ngFor="
                      let price of pricingFormArray.controls;
                      let i = index
                    "
                    [formGroupName]="i"
                    class="space-y-2"
                  >
                    <div class="grid grid-cols-5 gap-4 items-center">
                      <div>
                        <label class="block mb-2 text-surface-200 text-sm"
                          >Duration</label
                        >
                        <p-dropdown
                          formControlName="duration"
                          [options]="durationOptions"
                          placeholder="Select duration"
                          styleClass="w-full bg-surface-700 border-surface-600 text-white"
                          (onChange)="onPricingDurationChange(i)"
                        >
                        </p-dropdown>
                      </div>
                      <div>
                        <label class="block mb-2 text-surface-200 text-sm"
                          >Price</label
                        >
                        <p-inputNumber
                          formControlName="price"
                          mode="currency"
                          currency="ILS"
                          [min]="1"
                          styleClass="w-full bg-surface-700 border-surface-600 text-white"
                        >
                        </p-inputNumber>
                      </div>
                      <div>
                        <label class="block mb-2 text-surface-200 text-sm"
                          >Check-in Time</label
                        >
                        <p-calendar 
  formControlName="checkInTime"
  [timeOnly]="true"
  hourFormat="24"
  [showSeconds]="false"
  [showTime]="true"
  [hideOnDateTimeSelect]="true"
  placeholder="HH:mm"
></p-calendar>
                      </div>
                      <div>
                        <label class="block mb-2 text-surface-200 text-sm"
                          >Checkout Time</label
                        >
                        <p-calendar 
  formControlName="checkoutTime"
  [timeOnly]="true"
  hourFormat="24"
  [showSeconds]="false"
  [showTime]="true"
  [hideOnDateTimeSelect]="true"
  placeholder="HH:mm"
></p-calendar>
                      </div>
                      <div class="flex justify-end pt-3">
                        <button
                          type="button"
                          class="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-red-600"
                          (click)="removePricing(i)"
                        >
                          <i class="pi pi-trash"></i>
                        </button>
                      </div>
                    </div>
                    <div
                      *ngIf="price.errors?.['required']"
                      class="text-red-400 text-sm"
                    >
                      Price is required
                    </div>
                    <div
                      *ngIf="price.errors?.['min']"
                      class="text-red-400 text-sm"
                    >
                      Minimum price is $1
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  class="mt-4 bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600"
                  (click)="addPricing()"
                >
                  Add Pricing Option
                </button>
              </div>

              <div
                *ngIf="venueForm.get('type')?.value === 'wedding-hall'"
                class="bg-surface-800 rounded-2xl p-6 shadow-lg"
              >
                <h2
                  class="text-xl font-semibold text-white mb-4 flex items-center"
                >
                  <i class="pi pi-clock mr-3 text-primary-400"></i>
                  Available Times
                </h2>
                <div formArrayName="globalTimeSlots" class="space-y-4">
                  <div
                    *ngFor="let timeSlot of globalTimeSlotsFormArray.controls; let i = index"
                    [formGroupName]="i"
                    class="flex items-center space-x-4"
                  >
                    <p-calendar
                      formControlName="startTime"
                      [timeOnly]="true"
                      hourFormat="12"
                      [stepMinute]="30"
                      [readonlyInput]="true"
                      styleClass="w-full bg-surface-700 border-surface-600 text-white"
                      placeholder="Start time"
                    ></p-calendar>
                    <p-calendar
                      formControlName="endTime"
                      [timeOnly]="true"
                      hourFormat="12"
                      [stepMinute]="30"
                      [readonlyInput]="true"
                      styleClass="w-full bg-surface-700 border-surface-600 text-white"
                      placeholder="End time"
                    ></p-calendar>
                    <button
                      type="button"
                      class="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-red-600"
                      (click)="removeGlobalTimeSlot(i)"
                    >
                      <i class="pi pi-trash"></i>
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  class="mt-4 bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600"
                  (click)="addGlobalTimeSlot()"
                >
                  Add Times
                </button>
              </div>

              <div
                *ngIf="venueForm.get('type')?.value === 'wedding-hall'"
                class="bg-surface-800 rounded-2xl p-6 shadow-lg"
              >
                <h2
                  class="text-xl font-semibold text-white mb-4 flex items-center"
                >
                  <i class="pi pi-calendar mr-3 text-primary-400"></i>
                  Unavailable Dates and Times
                </h2>
                <div formArrayName="availability" class="space-y-4">
                  <div
                    *ngFor="
                      let availability of availabilityFormArray.controls;
                      let i = index
                    "
                    [formGroupName]="i"
                    class="space-y-2"
                  >
                    <div class="flex items-center space-x-4">
                      <p-calendar
                        formControlName="date"
                        [showIcon]="true"
                        [minDate]="minDate"
                        [readonlyInput]="true"
                        styleClass="w-full bg-surface-700 border-surface-600 text-white"
                        placeholder="Select date"
                      ></p-calendar>
                      <button
                        type="button"
                        class="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-red-600"
                        (click)="removeAvailability(i)"
                      >
                        <i class="pi pi-trash"></i>
                      </button>
                    </div>
                    <div formArrayName="times" class="space-y-2">
                      <div
                        *ngFor="let time of getTimesFormArray(i).controls; let j = index"
                        [formGroupName]="j"
                        class="flex items-center space-x-4"
                      >
                        <p-calendar
                          formControlName="startTime"
                          [timeOnly]="true"
                          hourFormat="12"
                          [stepMinute]="30"
                          [readonlyInput]="true"
                          styleClass="w-full bg-surface-700 border-surface-600 text-white"
                          placeholder="Start time"
                        ></p-calendar>
                        <p-calendar
                          formControlName="endTime"
                          [timeOnly]="true"
                          hourFormat="12"
                          [stepMinute]="30"
                          [readonlyInput]="true"
                          styleClass="w-full bg-surface-700 border-surface-600 text-white"
                          placeholder="End time"
                        ></p-calendar>
                        <button
                          type="button"
                          class="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-red-600"
                          (click)="removeTime(i, j)"
                        >
                          <i class="pi pi-trash"></i>
                        </button>
                      </div>
                      <button
                        type="button"
                        class="mt-2 bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600"
                        (click)="addTime(i)"
                      >
                        Add Unavailabel Time 
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  class="mt-4 bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600"
                  (click)="addAvailability()"
                >
                  Add Unavailability
                </button>
              </div>

              <div
                *ngIf="venueForm.get('type')?.value === 'chalet'"
                class="bg-surface-800 rounded-2xl p-6 shadow-lg"
              >
                <h2
                  class="text-xl font-semibold text-white mb-4 flex items-center"
                >
                  <i class="pi pi-calendar mr-3 text-primary-400"></i>
                  Unavailable Dates
                </h2>
                <div formArrayName="availability" class="space-y-4">
                  <div
                    *ngFor="
                      let availability of availabilityFormArray.controls;
                      let i = index
                    "
                    [formGroupName]="i"
                    class="space-y-2"
                  >
                    <div class="flex items-center space-x-4">
                      <p-calendar
                        formControlName="date"
                        [showIcon]="true"
                        [minDate]="minDate"
                        [readonlyInput]="true"
                        styleClass="w-full bg-surface-700 border-surface-600 text-white"
                        placeholder="Select date"
                      ></p-calendar>
                      <button
                        type="button"
                        class="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-red-600"
                        (click)="removeAvailability(i)"
                      >
                        <i class="pi pi-trash"></i>
                      </button>
                    </div>
                    <div
                      *ngIf="availability.get('date')?.errors?.['pastDate']"
                      class="text-red-400 text-sm"
                    >
                      Date cannot be in the past
                    </div>
                    <div
                      *ngIf="
                        availability.get('date')?.errors?.['duplicateDate']
                      "
                      class="text-red-400 text-sm"
                    >
                      Date already exists
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  class="mt-4 bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600"
                  (click)="addAvailability()"
                >
                  Add Availability
                </button>
              </div>
            </form>
          </div>

          <div class="space-y-6">
            <div class="bg-surface-800 rounded-2xl p-6 shadow-lg sticky top-4">
              <h2
                class="text-xl font-semibold text-white mb-4 flex items-center"
              >
                <i class="pi pi-check-circle mr-3 text-primary-400"></i>
                Finalize Venue
              </h2>

              <div class="space-y-4">
                <div
                  *ngIf="mainPicturePreview"
                  class="rounded-lg overflow-hidden h-40"
                >
                  <img
                    [src]="mainPicturePreview"
                    class="w-full h-full object-cover"
                  />
                </div>

                <div
                  *ngIf="!mainPicturePreview"
                  class="bg-surface-700 rounded-lg p-4 text-surface-300 text-sm"
                >
                  <i class="pi pi-info-circle mr-2"></i>
                  Upload a main picture to preview your venue
                </div>

                <div
                  *ngIf="venueForm.get('title')?.value"
                  class="text-xl font-semibold text-white"
                >
                  {{ venueForm.get("title")?.value }}
                </div>

                <div
                  *ngIf="venueForm.get('location')?.value"
                  class="flex items-center text-surface-300"
                >
                  <i class="pi pi-map-marker mr-2 text-primary-400"></i>
                  {{ venueForm.get("location")?.value }}
                </div>

                <div
                  *ngIf="venueForm.get('pricePerDay')?.value"
                  class="flex items-center text-primary-400 font-semibold"
                >
                  <i class="pi pi-dollar mr-2"></i>
                  {{
                    venueForm.get("pricePerDay")?.value
                      | currency: "USD" : "symbol" : "1.0-0"
                  }}
                  per day
                </div>

                <div class="pt-4 border-t border-surface-700 mt-4">
                  <button
                    type="button"
                    (click)="onSubmit()"
                    [disabled]="!areRequiredFieldsFilled()"
                    [ngClass]="{
                      'opacity-50 cursor-not-allowed': !areRequiredFieldsFilled(),
                    }"
                    class="w-full py-4 px-6 bg-primary-500 text-white rounded-xl font-semibold text-lg hover:bg-primary-600 transition-colors flex items-center justify-center"
                  >
                    <i class="pi pi-check mr-2"></i>
                    {{ isEditMode ? "Update" : "Create" }} Venue
                  </button>
                </div>

                <div
                  *ngIf="!areRequiredFieldsFilled()"
                  class="text-sm text-surface-400 text-center"
                >
                  <p class="mb-1">Please fill in all required fields:</p>
                  <ul class="text-xs text-left list-disc pl-5 mt-1">
                    <li *ngIf="!venueForm.get('title')?.value" class="text-red-400">Venue Title</li>
                    <li *ngIf="!venueForm.get('location')?.value" class="text-red-400">Location</li>
                    <li *ngIf="!mainPicturePreview" class="text-red-400">Main Picture</li>
                    <ng-container *ngIf="venueForm.get('type')?.value === 'wedding-hall'">
                      <li *ngIf="!venueForm.get('capacity')?.value" class="text-red-400">Capacity</li>
                      <li *ngIf="!venueForm.get('pricePerDay')?.value" class="text-red-400">Price Per Day</li>
                    </ng-container>
                    <ng-container *ngIf="venueForm.get('type')?.value === 'chalet'">
                      <li *ngIf="!venueForm.get('rooms')?.value" class="text-red-400">Number of Rooms</li>
                      <li *ngIf="!venueForm.get('bathrooms')?.value" class="text-red-400">Number of Bathrooms</li>
                      <li *ngIf="!venueForm.get('amenities')?.value?.length" class="text-red-400">Amenities</li>
                    </ng-container>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AddVenueComponent {
  venueForm: FormGroup;
  minDate: Date = new Date();
  @ViewChild("mainPictureInput") mainPictureInput!: ElementRef;
  isEditMode = false;
  currentVenueId: string | null = null;
  mainPicturePreview?: string;
  additionalPhotosPreviews: string[] = [];
  amenities = ["WiFi", "Parking", "AC", "Gym", "Playground", "Heated Pool"];
  venueTypes = [
    { label: "Wedding Hall", value: "wedding-hall" },
    { label: "Chalet", value: "chalet" },
  ];
  durationOptions = [
    { label: "12 Hours", value: "12" },
    { label: "24 Hours", value: "24" },
    { label: "2 Days", value: "48" },
    { label: "3 Days", value: "72" },
    { label: "4 Days", value: "96" },
    { label: "5 Days", value: "120" },
    { label: "6 Days", value: "144" },
    { label: "1 Week", value: "168" },
  ];
  private originalVenue: Venue | null = null;
  selectedAmenities: string[] = [];
  filteredAmenities: string[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private venueService: VenueService,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.minDate = new Date();
    this.minDate.setHours(0, 0, 0, 0);

    this.venueForm = this.fb.group({
      title: ["", Validators.required],
      description: [""],
      type: ["wedding-hall", Validators.required],
      location: ["", Validators.required],
      pricing: this.fb.array([], [this.uniqueDurationsValidator()]),
      mainPicture: [null, Validators.required],
      amenities: [[]],
      availability: this.fb.array([]),
      globalTimeSlots: this.fb.array([]),
      capacity: [100, [Validators.required, Validators.min(1)]],
      pricePerDay: [1000, [Validators.required, Validators.min(1)]],
      rooms: [null],
      bathrooms: [null]
    });

    this.initializeFormArrays();

    this.updateFormControlsBasedOnType("wedding-hall");

    this.initializeDefaultGlobalTimeSlots();

    this.activatedRoute.params.subscribe((params) => {
      if (params["id"]) {
        this.isEditMode = true;
        this.currentVenueId = params["id"];
        if (this.currentVenueId) {
          this.loadVenueData(this.currentVenueId);
        }
      }
    });

    this.venueForm.get("type")?.valueChanges.subscribe((type) => {
      console.log('Type changed to:', type);
      this.updateFormControlsBasedOnType(type);
      this.availabilityFormArray.clear();
      this.addAvailability();

      setTimeout(() => {
        this.debugVenueFormValidation();
      }, 0);
    });

    setTimeout(() => {
      this.debugVenueFormValidation();
    }, 0);
  }

  get pricingFormArray() {
    return this.venueForm.get("pricing") as FormArray;
  }
  addPricing() {
    const { checkIn, checkout } = this.initializeDefaultTimes();

    const newGroup = this.fb.group(
      {
        duration: ["", [Validators.required]],
        price: [null, [Validators.required, Validators.min(1)]],
        checkInTime: [
          checkIn,
          [Validators.required],
        ],
        checkoutTime: [checkout, [Validators.required]],
      }
    );

    const updateCheckoutTime = () => {
      const duration = newGroup.get('duration')?.value;
      const checkInTime = newGroup.get('checkInTime')?.value;

      if (duration && checkInTime) {
        const checkoutTime = this.calculateCheckoutTimeForPricing(checkInTime, duration);
        newGroup.patchValue({ checkoutTime });
      }
    };

    newGroup.get('checkInTime')?.valueChanges.subscribe(updateCheckoutTime);
    newGroup.get('duration')?.valueChanges.subscribe(updateCheckoutTime);

    this.pricingFormArray.push(newGroup);
    this.pricingFormArray.updateValueAndValidity();
  }

  removePricing(index: number) {
    this.pricingFormArray.removeAt(index);
  }

  private initializeFormArrays() {
    if (this.pricingFormArray.length === 0) {
      this.addPricing();
    }
    if (this.availabilityFormArray.length === 0) {
      this.addAvailability();
    }
  }

  private uniqueDurationsValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const durations = (control as FormArray).controls
        .map((c) => c.get("duration")?.value)
        .filter((v) => !!v);

      const hasDuplicates = new Set(durations).size !== durations.length;
      return hasDuplicates ? { duplicateDuration: true } : null;
    };
  }

  private calculateCheckoutTimeForPricing(
    checkInTime: Date,
    duration: string
  ): Date {
    const checkoutTime = new Date(checkInTime);
    const hours = parseInt(duration, 10);

    if (!isNaN(hours)) {
      checkoutTime.setHours(checkoutTime.getHours() + hours);
    }

    return this.roundToNearestHalfHour(checkoutTime);
  }

  onPricingDurationChange(index: number): void {
    const pricingGroup = this.pricingFormArray.at(index) as FormGroup;
    const duration = pricingGroup.get("duration")?.value;
    const checkInTime = pricingGroup.get("checkInTime")?.value;

    if (duration && checkInTime) {
      const roundedCheckInTime = this.roundToNearestHalfHour(
        new Date(checkInTime)
      );
      const checkoutTime = this.calculateCheckoutTimeForPricing(
        roundedCheckInTime,
        duration
      );

      const roundedCheckoutTime = this.roundToNearestHalfHour(checkoutTime);

      pricingGroup.patchValue({
        checkInTime: roundedCheckInTime,
        checkoutTime: roundedCheckoutTime,
      });
    }
  }

  private roundToNearestHalfHour(date: Date): Date {
    const minutes = date.getMinutes();
    const roundedMinutes = minutes < 30 ? 0 : 30;
    const roundedDate = new Date(date);
    roundedDate.setMinutes(roundedMinutes, 0, 0);
    return roundedDate;
  }

  private createAvailabilityGroup(type: string): FormGroup {
    if (type === "wedding-hall") {
      const defaultStart = new Date();
      defaultStart.setHours(12, 0, 0, 0);

      const defaultEnd = new Date();
      defaultEnd.setHours(13, 0, 0, 0);

      return this.fb.group(
        {
          date: [
            null,
            [
              Validators.required,
              this.dateNotPastValidator(),
              this.duplicateDateValidator(),
            ],
          ],
          times: this.fb.array([
            this.fb.group({
              startTime: [
                defaultStart,
                [Validators.required],
              ],
              endTime: [defaultEnd, Validators.required],
            }),
          ]),
        }
      );
    }
    return this.fb.group({
      date: [
        null,
        [
          Validators.required,
          this.dateNotPastValidator(),
          this.duplicateDateValidator(),
        ],
      ],
    });
  }

  private dateNotPastValidator(): ValidatorFn {
    return () => null;
  }

  private duplicateDateValidator(): ValidatorFn {
    return () => null;
  }

  private loadVenueData(venueId: string): void {
    this.venueService.getVenueById(venueId).subscribe({
      next: (venue) => {
        this.venueForm.patchValue({ type: venue.type });

        this.updateFormControlsBasedOnType(venue.type);

        this.populateForm(venue);
      },
      error: (err) => {
        console.error("Error loading venue:", err);
        alert("Failed to load venue data");
      },
    });
  }

  private populateForm(venue: Venue): void {
    this.originalVenue = venue;

    this.venueForm.patchValue({ type: venue.type });
    this.updateFormControlsBasedOnType(venue.type);

    function extractValues<T>(input: any): T[] {
      if (Array.isArray(input)) return input;
      if (input && Array.isArray(input.$values)) return input.$values;
      return [];
    }

    const amenities = extractValues(venue.amenities).map((a: any) => typeof a === 'string' ? a : a.name);
    const photos = extractValues(venue.photos).map((p: any) => p?.photoUrl || p?.PhotoUrl || (typeof p === 'string' ? p : ''));
    const pricing = extractValues((venue as any).pricingOptions ?? venue.pricing);
    const unavailableDates = extractValues(venue.unavailableDates);
    const globalTimeSlots = extractValues(venue.globalTimeSlots);
    const availabilities = extractValues((venue as any).availabilities ?? venue.availability);

    this.venueForm.patchValue({
      mainPicture: venue.mainPicture,
      title: venue.title,
      description: venue.description,
      location: venue.location,
      ...(venue.type === "wedding-hall" && { capacity: venue.capacity }),
      ...(venue.type === "wedding-hall" && { pricePerDay: venue.pricePerDay }),
      ...(venue.type === "chalet" && {
        rooms: venue.rooms,
        bathrooms: venue.bathrooms,
      }),
      amenities,
    });

    this.mainPicturePreview = venue.mainPicture;
    this.additionalPhotosPreviews = photos.slice(1);

    this.pricingFormArray.clear();
    if (Array.isArray(pricing)) {
      pricing.forEach((pricingOption: any) => {
        let checkInTime: Date;
        let checkoutTime: Date;
        try {
          checkInTime = pricingOption.checkInTime ? new Date(pricingOption.checkInTime) : new Date();
          if (isNaN(checkInTime.getTime())) checkInTime = new Date();
        } catch {
          checkInTime = new Date();
        }
        checkInTime = this.roundToNearestHalfHour(checkInTime);
        try {
          checkoutTime = pricingOption.checkoutTime ? new Date(pricingOption.checkoutTime) : this.calculateCheckoutTimeForPricing(checkInTime, pricingOption.duration || "24");
          if (isNaN(checkoutTime.getTime())) checkoutTime = this.calculateCheckoutTimeForPricing(checkInTime, pricingOption.duration || "24");
        } catch {
          checkoutTime = this.calculateCheckoutTimeForPricing(checkInTime, pricingOption.duration || "24");
        }

        this.pricingFormArray.push(
          this.fb.group(
            {
              duration: [pricingOption.duration, Validators.required],
              price: [
                pricingOption.price,
                [Validators.required, Validators.min(1)],
              ],
              checkInTime: [
                checkInTime,
                [Validators.required],
              ],
              checkoutTime: [checkoutTime, Validators.required],
            }
          )
        );
      });
    }

    this.availabilityFormArray.clear();
    availabilities.forEach((avail: any) => {
      const group = this.createAvailabilityGroup(venue.type);
      const date = avail.date ? new Date(avail.date) : new Date();
      date.setHours(0, 0, 0, 0);
      if (venue.type === "wedding-hall") {
        const timesArray = group.get("times") as FormArray;
        timesArray.clear();
        if (avail.times) {
          avail.times.forEach((time: any) => {
            const parseTimeString = (timeStr: string | any) => {
              if (!timeStr) return this.roundToNearestHalfHour(new Date());

              try {
                if (timeStr instanceof Date) return this.roundToNearestHalfHour(timeStr);

                if (typeof timeStr === 'string') {
                  if (timeStr.includes('T')) {
                    return this.roundToNearestHalfHour(new Date(timeStr));
                  } else if (timeStr.includes(':')) {
                    const [hours, minutes, seconds] = timeStr.split(':').map(Number);
                    const date = new Date();
                    date.setHours(hours || 0, minutes || 0, seconds || 0, 0);
                    return this.roundToNearestHalfHour(date);
                  }
                }

                return this.roundToNearestHalfHour(new Date());
              } catch (e) {
                console.error('Error parsing time:', timeStr, e);
                return this.roundToNearestHalfHour(new Date());
              }
            };

            const startTime = parseTimeString(time.startTime);
            const endTime = time.endTime
              ? parseTimeString(time.endTime)
              : this.roundToNearestHalfHour(new Date(startTime.getTime() + 60 * 60 * 1000));

            timesArray.push(
              this.fb.group({
                startTime: [startTime, [Validators.required]],
                endTime: [endTime, Validators.required],
              })
            );
          });
        }
        group.patchValue({ date: date });
      } else {
        group.patchValue({ date: date });
      }
      this.availabilityFormArray.push(group);
    });

    this.globalTimeSlotsFormArray.clear();
    if (Array.isArray(globalTimeSlots)) {
      globalTimeSlots.forEach((slot: any) => {
        const parseTimeString = (timeStr: string | any) => {
          if (!timeStr) return this.roundToNearestHalfHour(new Date());

          try {
            if (timeStr instanceof Date) return this.roundToNearestHalfHour(timeStr);

            if (typeof timeStr === 'string') {
              if (timeStr.includes('T')) {
                return this.roundToNearestHalfHour(new Date(timeStr));
              } else if (timeStr.includes(':')) {
                const [hours, minutes, seconds] = timeStr.split(':').map(Number);
                const date = new Date();
                date.setHours(hours || 0, minutes || 0, seconds || 0, 0);
                return this.roundToNearestHalfHour(date);
              }
            }

            return this.roundToNearestHalfHour(new Date());
          } catch (e) {
            console.error('Error parsing time:', timeStr, e);
            return this.roundToNearestHalfHour(new Date());
          }
        };

        const startTime = parseTimeString(slot.startTime);
        const endTime = parseTimeString(slot.endTime);

        this.globalTimeSlotsFormArray.push(
          this.fb.group({
            startTime: [startTime, [Validators.required]],
            endTime: [endTime, [Validators.required]],
          })
        );
      });
    }
  }

  formatTime(date: Date | null): string {
    if (!date) return "";
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  removeMainPicture() {
    this.mainPicturePreview = undefined;
    this.venueForm.patchValue({ mainPicture: null });
    this.mainPictureInput.nativeElement.value = "";
    this.venueForm.get('mainPicture')?.updateValueAndValidity();
  }

  get availabilityFormArray() {
    return this.venueForm.get("availability") as FormArray;
  }

  onMainPictureSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.venueService.uploadMainPicture(file).subscribe({
        next: (thumbnailUrl) => {
          this.mainPicturePreview = thumbnailUrl;
          this.venueForm.patchValue({ mainPicture: thumbnailUrl });
          this.venueForm.get('mainPicture')?.updateValueAndValidity();
          console.log('Main picture updated with thumbnail URL:', thumbnailUrl);
        },
        error: (err) => {
          console.error('Failed to upload main picture:', err);
        }
      });
    }
  }

  onAdditionalPhotosSelect(event: any) {
    const files = event.target.files;
    if (files) {
      Array.from<File>(files).forEach((file: File) => {
        this.venueService.uploadAdditionalPhoto(file).subscribe({
          next: (thumbnailUrl) => {
            this.additionalPhotosPreviews.push(thumbnailUrl);
          },
          error: (err) => {
            console.error('Failed to upload additional photo:', err);
          }
        });
      });
    }
  }

  removePhoto(preview: string) {
    this.additionalPhotosPreviews = this.additionalPhotosPreviews.filter(
      (p) => p !== preview
    );
  }

  addAvailability() {
    const type = this.venueForm.get("type")?.value;
    const availabilityGroup = this.createAvailabilityGroup(type);
    this.availabilityFormArray.push(availabilityGroup);
  }

  getDurationLabel(value: string): string {
    return (
      this.durationOptions.find((opt) => opt.value === value)?.label || "Custom"
    );
  }

  removeAvailability(index: number) {
    this.availabilityFormArray.removeAt(index);
  }

  addTime(availabilityIndex: number) {
    const timesArray = this.getTimesFormArray(availabilityIndex);
    const defaultStart = new Date();
    defaultStart.setHours(12, 0, 0, 0);

    const defaultEnd = new Date();
    defaultEnd.setHours(13, 0, 0, 0);

    timesArray.push(
      this.fb.group({
        startTime: [
          defaultStart,
          [Validators.required],
        ],
        endTime: [defaultEnd, Validators.required],
      })
    );
  }

  removeTime(availabilityIndex: number, timeIndex: number) {
    const timesArray = this.getTimesFormArray(availabilityIndex);
    timesArray.removeAt(timeIndex);
  }

  getTimesFormArray(availabilityIndex: number): FormArray {
    return this.availabilityFormArray
      .at(availabilityIndex)
      .get("times") as FormArray;
  }

  private processGlobalTimeSlots(): any[] {
    return this.globalTimeSlotsFormArray.value.map((slot: any) => {
      const parseTime = (timeValue: any): Date => {
        if (timeValue instanceof Date && !isNaN(timeValue.getTime())) {
          return timeValue;
        }

        try {
          if (typeof timeValue === 'string') {
            if (timeValue.includes('T')) {
              const date = new Date(timeValue);
              if (!isNaN(date.getTime())) return date;
            } else if (timeValue.includes(':')) {
              const [hours, minutes, seconds] = timeValue.split(':').map(Number);
              const date = new Date();
              date.setHours(hours || 0, minutes || 0, seconds || 0, 0);
              return date;
            }
          }
        } catch (e) {
          console.error('Error processing time slot:', e);
        }

        return new Date();
      };

      const start = parseTime(slot.startTime);
      const end = parseTime(slot.endTime);

      if (end <= start) {
        end.setTime(start.getTime() + 60 * 60 * 1000);
      }

      return {
        startTime: start.toISOString(),
        endTime: end.toISOString()
      };
    });
  }

  private forceValidation(): void {
    const venueType = this.venueForm.get('type')?.value;

    if (venueType === 'wedding-hall') {
      const capacity = this.venueForm.get('capacity');
      const pricePerDay = this.venueForm.get('pricePerDay');

      if (!capacity?.value || capacity?.value < 1) {
        capacity?.setErrors({ 'required': true });
      } else {
        capacity?.setErrors(null);
      }

      if (!pricePerDay?.value || pricePerDay?.value < 1) {
        pricePerDay?.setErrors({ 'required': true });
      } else {
        pricePerDay?.setErrors(null);
      }

    } else if (venueType === 'chalet') {
      const rooms = this.venueForm.get('rooms');
      const bathrooms = this.venueForm.get('bathrooms');
      const amenities = this.venueForm.get('amenities');

      if (!rooms?.value || rooms?.value < 1) {
        rooms?.setErrors({ 'required': true });
      } else {
        rooms?.setErrors(null);
      }

      if (!bathrooms?.value || bathrooms?.value < 1) {
        bathrooms?.setErrors({ 'required': true });
      } else {
        bathrooms?.setErrors(null);
      }

      if (!amenities?.value || !amenities?.value.length) {
        amenities?.setErrors({ 'required': true });
      } else {
        amenities?.setErrors(null);
      }
    }

    const title = this.venueForm.get('title');
    const location = this.venueForm.get('location');
    const mainPicture = this.venueForm.get('mainPicture');

    if (!title?.value) {
      title?.setErrors({ 'required': true });
    } else {
      title?.setErrors(null);
    }

    if (!location?.value) {
      location?.setErrors({ 'required': true });
    } else {
      location?.setErrors(null);
    }

    if (!this.mainPicturePreview) {
      mainPicture?.setErrors({ 'required': true });
    } else {
      mainPicture?.setErrors(null);
    }

    this.venueForm.updateValueAndValidity();
  }

  async onSubmit() {
    const venueType = this.venueForm.get('type')?.value;

    console.log('Form submitted for venue type:', venueType);

    if (venueType === 'wedding-hall') {
      const weddingHallForm = this.fb.group({
        title: [this.venueForm.get('title')?.value, Validators.required],
        location: [this.venueForm.get('location')?.value, Validators.required],
        mainPicture: [this.venueForm.get('mainPicture')?.value, Validators.required],
        capacity: [this.venueForm.get('capacity')?.value, [Validators.required, Validators.min(1)]],
        pricePerDay: [this.venueForm.get('pricePerDay')?.value, [Validators.required, Validators.min(1)]]
      });

      if (!weddingHallForm.valid) {
        console.log('Wedding hall form is invalid:', weddingHallForm.errors);
        this.markFormControlsAsTouched(weddingHallForm);
        this.messageService.add({
          severity: 'error',
          summary: 'Validation Error',
          detail: 'Please fill in all wedding hall fields correctly.'
        });
        return;
      }
    }
    else if (venueType === 'chalet') {
      const chaletForm = this.fb.group({
        title: [this.venueForm.get('title')?.value, Validators.required],
        location: [this.venueForm.get('location')?.value, Validators.required],
        mainPicture: [this.venueForm.get('mainPicture')?.value, Validators.required],
        rooms: [this.venueForm.get('rooms')?.value, [Validators.required, Validators.min(1)]],
        bathrooms: [this.venueForm.get('bathrooms')?.value, [Validators.required, Validators.min(1)]],
        amenities: [this.venueForm.get('amenities')?.value, Validators.required]
      });

      if (!chaletForm.valid) {
        console.log('Chalet form is invalid:', chaletForm.errors);
        this.markFormControlsAsTouched(chaletForm);
        this.messageService.add({
          severity: 'error',
          summary: 'Validation Error',
          detail: 'Please fill in all chalet fields correctly.'
        });
        return;
      }
    }

    try {
      const ownerId = this.getCurrentOwnerId();
      const photos = [
        this.mainPicturePreview,
        ...this.additionalPhotosPreviews,
      ].filter((p) => p);

      if (!photos.length) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Main picture is required'
        });
        return;
      }

      const venueData: any = {
        title: this.venueForm.get("title")?.value,
        description: this.venueForm.get("description")?.value,
        type: venueType,
        location: this.venueForm.get("location")?.value,
        photos: photos,
        mainPicture: this.mainPicturePreview || photos[0],
        availability: this.processAvailability(),
        globalTimeSlots: this.processGlobalTimeSlots(),
      };

      const pricingData = this.processPricing();
      venueData.pricing = pricingData;

      console.log('Processed pricing data:', pricingData);

      if (venueType === 'wedding-hall') {
        venueData.capacity = Number(this.venueForm.get("capacity")?.value);
        const pricePerDay = this.venueForm.get("pricePerDay")?.value;
        venueData.pricePerDay = typeof pricePerDay === 'string'
          ? Number(pricePerDay.replace(/[^\d.-]/g, ''))
          : Number(pricePerDay);
        venueData.amenities = [];
      } else if (venueType === 'chalet') {
        venueData.rooms = Number(this.venueForm.get("rooms")?.value);
        venueData.bathrooms = Number(this.venueForm.get("bathrooms")?.value);
        venueData.amenities = this.venueForm.get("amenities")?.value || [];
      }

      console.log('Prepared venue data before API call:', venueData);

      console.log('Submitting venue data:', venueData);

      if (this.isEditMode && this.currentVenueId) {
        await this.venueService
          .updateVenue(this.currentVenueId, venueData)
          .toPromise();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Venue updated successfully'
        });
        this.router.navigate(["/my-venues"]);
      } else {
        const createdVenue = await this.venueService
          .createVenueWithPendingStatus(venueData, ownerId)
          .toPromise();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Your venue has been submitted and is pending approval. You will be notified once it is reviewed.'
        });
        this.router.navigate(["/pending-venues"]);
      }
    } catch (error) {
      console.error("Error saving venue:", error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error saving venue. Please try again.'
      });
    }
  }

  private markFormControlsAsTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  private processAvailability(): any[] {
    const venueType = this.venueForm.get("type")?.value;
    return this.availabilityFormArray.value.map((avail: any) => {
      const date = new Date(avail.date);
      date.setHours(0, 0, 0, 0);

      if (venueType === "wedding-hall") {
        return {
          date: date.toISOString(),
          times: avail.times.map((time: any) => {
            const parseTime = (timeValue: any): string => {
              if (timeValue instanceof Date) {
                return timeValue.toISOString();
              }

              try {
                if (typeof timeValue === 'string') {
                  if (!timeValue.includes('T')) {
                    const [hours, minutes, seconds] = timeValue.split(':').map(Number);
                    const date = new Date();
                    date.setHours(hours || 0, minutes || 0, seconds || 0, 0);
                    return date.toISOString();
                  }
                  return timeValue;
                }
              } catch (e) {
                console.error('Error processing availability time:', e);
              }

              return new Date().toISOString();
            };

            return {
              startTime: parseTime(time.startTime),
              endTime: parseTime(time.endTime),
            };
          }),
        };
      }
      return { date: date.toISOString() };
    });
  }

  private processPricing(): any[] {
    return this.pricingFormArray.value.map((price: any) => {
      let parsedPrice = price.price;
      if (typeof parsedPrice === 'string') {
        parsedPrice = parsedPrice.replace(/[^\d.-]/g, '');
        parsedPrice = Number(parsedPrice);
      }

      return {
        duration: price.duration,
        price: parsedPrice,
        checkInTime: price.checkInTime,
        checkoutTime: price.checkoutTime,
      };
    });
  }

  private parseTimeWithDate(time: string | Date, referenceDate: Date): Date {
    if (time instanceof Date) return time;

    const date = new Date(referenceDate);

    const timeParts = time.match(/(\d+):(\d+)\s?(AM|PM)?/i);
    if (timeParts) {
      let hours = parseInt(timeParts[1]);
      const minutes = parseInt(timeParts[2]);
      const period = timeParts[3]?.toUpperCase();

      if (period === "PM" && hours < 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;

      date.setHours(hours);
      date.setMinutes(minutes);
    }

    return date;
  }

  private formatTimeForBackend(time: Date | string): string | null {
    if (!time) return null;

    try {
      if (typeof time === "string") {
        return time;
      }

      return `${time.getHours()}:${time.getMinutes()}`;
    } catch (e) {
      console.error("Invalid time format:", time);
      return null;
    }
  }

  private markFormGroupTouched(formGroup: FormGroup | FormArray) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      }
    });
  }

  private updateFormControlsBasedOnType(type: string): void {
    console.log('Updating form controls for type:', type);

    if (type === "chalet") {
      this.venueForm.patchValue({
        capacity: null,
        pricePerDay: null
      });

      this.venueForm.get('rooms')?.setValidators([Validators.required, Validators.min(1)]);
      this.venueForm.get('bathrooms')?.setValidators([Validators.required, Validators.min(1)]);
      this.venueForm.get('amenities')?.setValidators([Validators.required]);

      this.venueForm.get('capacity')?.clearValidators();
      this.venueForm.get('pricePerDay')?.clearValidators();
    } else if (type === "wedding-hall") {
      this.venueForm.patchValue({
        rooms: null,
        bathrooms: null,
        amenities: []
      });

      this.venueForm.get('capacity')?.setValidators([Validators.required, Validators.min(1)]);
      this.venueForm.get('pricePerDay')?.setValidators([Validators.required, Validators.min(1)]);

      this.venueForm.get('rooms')?.clearValidators();
      this.venueForm.get('bathrooms')?.clearValidators();
      this.venueForm.get('amenities')?.clearValidators();

      this.initializeDefaultGlobalTimeSlots();
    }

    this.venueForm.get('rooms')?.updateValueAndValidity();
    this.venueForm.get('bathrooms')?.updateValueAndValidity();
    this.venueForm.get('capacity')?.updateValueAndValidity();
    this.venueForm.get('pricePerDay')?.updateValueAndValidity();
    this.venueForm.get('amenities')?.updateValueAndValidity();

    setTimeout(() => {
      this.forceValidation();
    }, 0);

    console.log('Form valid after type change:', this.venueForm.valid);
  }

  private initializeDefaultTimes(): { checkIn: Date; checkout: Date } {
    const checkIn = new Date();
    checkIn.setHours(12, 0, 0, 0);

    const checkout = new Date(checkIn);
    checkout.setDate(checkout.getDate() + 1);
    checkout.setHours(12, 0, 0, 0);

    return {
      checkIn: this.roundToNearestHalfHour(checkIn),
      checkout: this.roundToNearestHalfHour(checkout),
    };
  }

  private getCurrentOwnerId(): string {
    const currentUser = LocalStorageService.CurrentUser;
    if (currentUser && currentUser.role === "owner") {
      return currentUser.id;
    }
    throw new Error("Current user is not an owner or not logged in");
  }

  searchAmenities(event: any) {
    const query = event.query.toLowerCase();
    this.filteredAmenities = this.amenities.filter((amenity) =>
      amenity.toLowerCase().includes(query)
    );
  }

  get globalTimeSlotsFormArray() {
    return this.venueForm.get("globalTimeSlots") as FormArray;
  }

  addGlobalTimeSlot() {
    const defaultStart = new Date();
    defaultStart.setHours(12, 0, 0, 0);

    const defaultEnd = new Date();
    defaultEnd.setHours(13, 0, 0, 0);

    this.globalTimeSlotsFormArray.push(
      this.fb.group({
        startTime: [
          defaultStart,
          [Validators.required],
        ],
        endTime: [defaultEnd, Validators.required],
      })
    );
  }

  removeGlobalTimeSlot(index: number) {
    this.globalTimeSlotsFormArray.removeAt(index);
  }

  private debugVenueFormValidation(): void {
    console.log('========== Venue Form Validation Debug ==========');
    console.log('Form valid:', this.venueForm.valid);
    console.log('Venue type:', this.venueForm.get('type')?.value);

    const formControls = [
      'title',
      'location',
      'mainPicture',
      'capacity',
      'pricePerDay',
      'rooms',
      'bathrooms',
      'amenities'
    ];

    formControls.forEach(control => {
      const ctrl = this.venueForm.get(control);
      console.log(`${control} - value: ${ctrl?.value}, valid: ${ctrl?.valid}, errors:`, ctrl?.errors);
    });
    console.log('=================================================');
  }

  onVenueTypeChange(event: any): void {
    console.log('Venue type changed to:', event.value);
  }

  useDefaultImage(): void {
    const defaultImage = 'assets/images/default-venue.jpg';
    this.mainPicturePreview = defaultImage;
    this.venueForm.patchValue({ mainPicture: defaultImage });
    this.venueForm.get('mainPicture')?.updateValueAndValidity();
    console.log('Using default image');
    this.debugVenueFormValidation();
  }

  areRequiredFieldsFilled(): boolean {
    const venueType = this.venueForm.get('type')?.value;

    if (!this.venueForm.get('title')?.value ||
      !this.venueForm.get('location')?.value ||
      !this.mainPicturePreview) {
      return false;
    }

    if (venueType === 'wedding-hall') {
      return !!this.venueForm.get('capacity')?.value &&
        !!this.venueForm.get('pricePerDay')?.value;
    } else if (venueType === 'chalet') {
      return !!this.venueForm.get('rooms')?.value &&
        !!this.venueForm.get('bathrooms')?.value &&
        !!this.venueForm.get('amenities')?.value?.length;
    }

    return true;
  }

  private initializeDefaultGlobalTimeSlots(): void {
    this.globalTimeSlotsFormArray.clear();

    const defaultTimeSlots = [
      { start: 8, end: 10 },
      { start: 10, end: 12 },
      { start: 12, end: 14 },
      { start: 14, end: 16 },
      { start: 16, end: 18 },
      { start: 18, end: 20 },
      { start: 20, end: 22 }
    ];

    defaultTimeSlots.forEach(slot => {
      const today = new Date();

      const startTime = new Date(today);
      startTime.setHours(slot.start, 0, 0, 0);

      const endTime = new Date(today);
      endTime.setHours(slot.end, 0, 0, 0);

      this.globalTimeSlotsFormArray.push(
        this.fb.group({
          startTime: [startTime, [Validators.required]],
          endTime: [endTime, Validators.required]
        })
      );
    });
  }
}

