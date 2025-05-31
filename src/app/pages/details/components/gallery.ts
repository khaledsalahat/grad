import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { UICarousel } from "@/layout/components/UI/carousel";
import { UICarouselItem } from "@/layout/components/UI/carousel-item";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { VenueService } from "@/layout/service/venue.service";

@Component({
  selector: "details-gallery",
  standalone: true,
  imports: [CommonModule, UICarousel, UICarouselItem, AnimatedContainer],
  template: `
    <div class="mt-24">
      <h1
        class="px-4 text-3xl lg:text-6xl font-semibold text-center mx-auto max-w-2xl leading-tight"
      ></h1>
      <div class="mt-14">
        <ui-carousel
          [scaled]="true"
          height="34rem"
          size="0%"
          [scale]="0.12"
          [options]="{ align: 'center', loop: true }"
        >
          <ui-carousel-item
            *ngFor="let item of galleryData; let index = index"
            [scaled]="true"
            className="min-w-[24rem]"
          >
            <animated-container
              [delay]="index * 150"
              className="h-full w-[23rem] relative rounded-3xl overflow-hidden"
            >
              <img
                class="object-cover h-full w-full"
                [src]="item"
                [alt]="'Gallery image ' + (index + 1)"
              />
            </animated-container>
          </ui-carousel-item>
        </ui-carousel>
      </div>
    </div>
  `,
})
export class detailsGallery implements OnInit {
  galleryData: string[] = [];
  venueTitle = "";

  constructor(
    private route: ActivatedRoute,
    private venueService: VenueService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      if (id) {
        this.venueService.getVenueDetails(id).subscribe({
          next: (venue) => {
            let allPhotos = [...(venue.photos || [])];

            if (venue.mainPicture) {
              allPhotos.unshift(venue.mainPicture);

              for (let i = 1; i < allPhotos.length; i++) {
                if (allPhotos[i] === venue.mainPicture ||
                  (typeof allPhotos[i] === 'object' && allPhotos[i].photoUrl === venue.mainPicture)) {
                  allPhotos.splice(i, 1);
                  i--;
                }
              }
            }

            this.galleryData = this.venueService.fixPhotoUrls(allPhotos);
            this.venueTitle = venue.title;
          },
          error: (err) => {
            console.error("Error loading venue:", err);
          },
        });
      }
    });
  }
}
