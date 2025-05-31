import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { CommonModule } from "@angular/common";
import { chaletsGridCard } from "./gridcard";
import { VenueService } from "@/layout/service/venue.service";
import { RouterModule } from "@angular/router";
import { Venue } from "@/layout/service/venue.model";

@Component({
  selector: "chalets-grid",
  standalone: true,
  imports: [CommonModule, chaletsGridCard, RouterModule],
  template: ` <div class="px-4 overflow-hidden w-full">
    <div *ngIf="loading" class="text-center p-8">
      <div
        class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"
      ></div>
    </div>

    <div *ngIf="error" class="text-red-400 text-center p-4">
      {{ error }}
    </div>

    <div *ngIf="!loading && venues.length === 0 && !error" class="text-center p-8">
      <p>No chalets available at the moment.</p>
      <p class="text-sm text-gray-500 mt-2">Our chalets will be available soon!</p>
    </div>

    <div *ngIf="!loading && venues.length > 0 && !error" class="mx-auto mt-14 w-full max-w-[2000px]">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[350px]"
       >
        <ng-container  
          *ngFor="let venue of venues; let i = index; trackBy: trackByFn"
        >
          <chalets-grid-card 
            [cardIndex]="i"
            [class]="getCardClass(i)"
            [image]="venue.mainPicture || (venue.photos && venue.photos.length > 0 ? venue.photos[0] : '')"
            [title]="venue.title"
            [location]="venue.location"
            [href]="'/details/' + venue.id"
            [delay]="100 + (i * 50)"
          />
        </ng-container>
      </div>
    </div>
  </div>`,
})
export class chaletsGrid implements OnChanges {
  @Input() locationFilter?: string;
  @Input() dateFilter?: Date;

  venues: Venue[] = [];
  loading = true;
  error?: string;

  constructor(private venueService: VenueService) { }

  ngOnChanges(changes: SimpleChanges) {
    this.loadVenues();
  }

  private loadVenues() {
    this.loading = true;
    this.error = undefined;

    this.venueService
      .getFilteredchalets({
        location: this.locationFilter,
        date: this.dateFilter,
      })
      .subscribe({
        next: (venues) => {
          let filteredVenues = venues.filter(venue =>
            venue.type === "chalet" &&
            venue.photos?.length > 0
          );

          console.log(`Grid: found ${filteredVenues.length} chalets (all statuses)`);

          const approvedVenues = filteredVenues.filter(v => v.status === "approved");

          if (approvedVenues.length === 0 && filteredVenues.length > 0) {
            console.log("Grid: No approved chalets found, showing all chalets instead");
          } else if (approvedVenues.length > 0) {
            filteredVenues = approvedVenues;
            console.log(`Grid: Using ${approvedVenues.length} approved chalets`);
          }

          this.venues = filteredVenues.map(venue => {
            venue.photos = this.venueService.fixPhotoUrls(venue.photos || []);
            return venue;
          });

          this.loading = false;
        },
        error: (err) => {
          console.error("Error loading venues for grid:", err);
          this.error = "Failed to load venues. Please try again later.";
          this.loading = false;
        },
      });
  }

  trackByFn(index: number, item: Venue): string {
    return item.id;
  }

  getCardClass(index: number): string {
    let position = index % 7;
    switch (position) {
      case 0:
        return "col-span-1 row-span-2";
      case 1:
        return "col-span-2 row-span-1";
      case 2:
        return "col-span-1 row-span-2";
      case 3:
        return "col-span-1 row-span-1";
      case 4:
        return "col-span-1 row-span-1";
      case 5:
        return "col-span-1 row-span-2";
      case 6:
        return "col-span-2 row-span-1";
      default:
        return "col-span-1 row-span-1";
    }
  }
}
