import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { UICarousel } from "@/layout/components/UI/carousel";
import { UICarouselItem } from "@/layout/components/UI/carousel-item";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { VenueService } from "@/layout/service/venue.service";

@Component({
  selector: "chalets-gallery",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    UICarousel,
    UICarouselItem,
    AnimatedContainer,
  ],
  template: ` <div class="mt-24">
    <h1
      class="px-4 text-3xl lg:text-6xl font-semibold text-center mx-auto max-w-2xl leading-tight"
    >Explore Our Chalets</h1>

    <div *ngIf="loading" class="mt-14 flex justify-center items-center h-64">
      <div
        class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"
      ></div>
    </div>

    <div
      *ngIf="error"
      class="mt-14 bg-red-900/20 border border-red-600 text-white px-4 py-3 rounded-xl text-center max-w-2xl mx-auto"
    >
      Error loading chalets: {{ error }}
    </div>

    <div *ngIf="!loading && !error && chalets.length === 0" class="mt-14 text-center">
      <p class="text-xl">No chalets available at the moment.</p>
      <p class="text-base text-gray-500 mt-2">Our chalets will be available soon!</p>
    </div>

    <div *ngIf="!loading && !error && chalets.length > 0" class="mt-14">
      <ui-carousel
        [scaled]="true"
        height="34rem"
        size="0%"
        [scale]="0.12"
        [options]="{ align: 'center', loop: true }"
      >
        <ng-container *ngFor="let venue of chalets; let venueIndex = index">
          <ui-carousel-item
            *ngFor="let photo of venue.photos || []; let photoIndex = index; trackBy: trackByPhotoFn"
            [scaled]="true"
            className="min-w-[24rem]"
          >
            <animated-container
              [delay]="(venueIndex * 150) + (photoIndex * 50)"
              className="h-full w-[23rem] relative rounded-3xl overflow-hidden"
            >
              <img
                class="object-cover h-full w-full"
                [src]="photo"
                [alt]="venue.title + ' chalets image ' + (photoIndex + 1)"
                (error)="handleImageError($event)"
              />
              <div
                class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent"
              >
                <h3 class="text-xl font-semibold text-white">
                  {{ venue.title }}
                </h3>
                <p class="text-surface-100 flex items-center mt-1">
                  <i class="pi pi-map-marker text-sm mr-2"></i>
                  {{ venue.location }}
                </p>
                
              </div>
            </animated-container>
          </ui-carousel-item>
        </ng-container>
      </ui-carousel>
    </div>
  </div>`,
})
export class chaletsGallery implements OnInit {
  chalets: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private venueService: VenueService) { }

  ngOnInit() {
    this.loadchalets();
  }

  trackByPhotoFn(index: number, item: string): string {
    return item || index.toString();
  }

  handleImageError(event: any) {
    event.target.src = '/assets/images/venues/placeholder.svg';
    event.target.onerror = null;
  }

  loadchalets() {
    this.venueService.getVenuesByType("chalet").subscribe({
      next: (venues) => {
        let filteredVenues = Array.isArray(venues)
          ? venues.filter(v => v.type === "chalet")
          : [];

        console.log(`Found ${filteredVenues.length} chalets (all statuses)`);

        const approvedVenues = filteredVenues.filter(v => v.status === "approved");

        if (approvedVenues.length === 0 && filteredVenues.length > 0) {
          console.log("No approved chalets found, showing all chalets instead");
        } else if (approvedVenues.length > 0) {
          filteredVenues = approvedVenues;
          console.log(`Using ${approvedVenues.length} approved chalets`);
        }

        this.chalets = filteredVenues.map(venue => {
          if (venue.mainPicture) {
            venue.mainPicture = this.venueService.fixPhotoUrls([venue.mainPicture])[0];
          }

          let allPhotos = [];

          if (venue.mainPicture) {
            allPhotos.push(venue.mainPicture);
          }

          if (venue.photos && venue.photos.length > 0) {
            const additionalPhotos = venue.photos.filter(photo => {
              const photoUrl = typeof photo === 'object' && photo !== null
                ? ((photo as any).photoUrl || (photo as any).PhotoUrl || '')
                : photo as string;
              return photoUrl !== venue.mainPicture;
            });

            allPhotos = [...allPhotos, ...this.venueService.fixPhotoUrls(additionalPhotos)];
          }

          venue.photos = allPhotos;
          return venue;
        });

        this.loading = false;
      },
      error: (err) => {
        console.error("Error loading chalets:", err);
        this.error = err.message || "Failed to load chalets";
        this.loading = false;
      },
    });
  }
}
