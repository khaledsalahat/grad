import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { UICarousel } from "@/layout/components/UI/carousel";
import { UICarouselItem } from "@/layout/components/UI/carousel-item";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";

@Component({
  selector: "wedding-destination-gallery",
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
      <br />Vacation Destinations
    </h1>
    <p class="px-4 text-lg mt-6 text-surface-500 text-center mx-auto max-w-2xl">
      Discover Palestine's most popular vacation spots, perfect for creating
      unforgettable memories
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
export class WeddingDestinationGallery {
  galleryData = [
    "/pages/travel/rawnaq2.jpg",
    "/pages/travel/rawnaq3.jpg",
    "/pages/travel/rawnaq4.jpg",
    "/pages/travel/w1.jpg",
    "/pages/travel/w2.jpg",
    "/pages/travel/w3.jpg",
    "/pages/travel/w4.jpg",
  ];
}
