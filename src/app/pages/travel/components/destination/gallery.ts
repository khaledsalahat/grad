import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { UICarousel } from "@/layout/components/UI/carousel";
import { UICarouselItem } from "@/layout/components/UI/carousel-item";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";

@Component({
  selector: "travel-destination-gallery",
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
    >
      Escape to Top
      <br />Dream Destinations
    </h1>
    <p class="px-4 text-lg mt-6 text-surface-500 text-center mx-auto max-w-2xl">
      Discover Palestine's most popular vacation spots and wedding halls,
      perfect for creating unforgettable memories
    </p>
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
              alt="Destination Gallery Image"
            />
          </animated-container>
        </ui-carousel-item>
      </ui-carousel>
    </div>
  </div>`,
})
export class TravelDestinationGallery {
  galleryData = [
    "/pages/travel/gardinea/gardinea2.jpg",
    "/pages/travel/w/w2.jpg",
    "/pages/travel/salfit/salfit5.jpg",
    "/pages/travel/rawnaq/rawnaq2.jpg",
    "/pages/travel/rawnaq/rawnaq3.jpg",
    "/pages/travel/andalus/andalus2.jpg",
    "/pages/travel/ibiza/ibiza2.jpg",
    "/pages/travel/opera/opera4.jpg",
    "/pages/travel/w/w3.jpg",
    "/pages/travel/lords/lords2.jpg",
    "/pages/travel/opera/opera2.jpg",
    "/pages/travel/w/w1.jpg",
    "/pages/travel/elya/elya2.jpg",
    "/pages/travel/gloria/gloria3.jpg",
  ];
}
