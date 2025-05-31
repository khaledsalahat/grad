import { Component, computed, inject, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { UICarousel } from "@/layout/components/UI/carousel";
import { UICarouselItem } from "@/layout/components/UI/carousel-item";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { LayoutService } from "@/layout/service/layout.service";

@Component({
  selector: "travel-escape-gallery",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    UICarousel,
    UICarouselItem,
    AnimatedContainer,
  ],
  template: ` <div class="container mt-24 lg:mt-64">
    <div
      class="min-h-[54rem] lg:min-h-[44rem] relative rounded-3xl lg:rounded-4xl overflow-hidden shadow-blue-card lg:py-0"
    >
      <img
        class="object-cover -z-2 w-full h-full min-h-[54rem] lg:min-h-[44rem]"
        src="/pages/travel/escape-gallery-bg.jpg"
        alt="Travel Escape Gallery Background"
      />
      <div
        class="absolute inset-0 -z-1 bg-[linear-gradient(0deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.12)_100%)]"
      ></div>
      <div
        class="absolute lg:px-0 inset-x-16 inset-y-16 flex flex-col justify-between"
      >
        <div>
          <h1
            class="text-4xl lg:text-[5.625rem] leading-tight text-surface-0 font-semibold max-w-3xl"
          >
            Find Your
            <span
              class="text-white/12 [-webkit-text-stroke-width:1px] [-webkit-text-stroke-color:white]"
              >Perfect Escape</span
            >
          </h1>
          <p class="text-white/80 mt-7 max-w-xs">
            Whether you seek sun-soaked beaches, serene natural landscapes, or
            thrilling adventures, discover destinations tailored to your dream
            getaway.
          </p>
        </div>
        <div class="mt-auto mb-0 hidden lg:flex items-center gap-6">
          <button
            class="w-[5.5rem] h-12 border border-white/12 backdrop-blur-[48px] rounded-full bg-white/12 shadow-[0px_10px_10px_-8px_rgba(18,18,23,0.02),0px_2px_2px_-1.5px_rgba(18,18,23,0.02),0px_1px_1px_-0.5px_rgba(18,18,23,0.02)]"
            (click)="handlePrev()"
          >
            <i class="pi pi-arrow-left text-surface-0 !text-xl"></i>
          </button>
          <button
            class="w-[5.5rem] h-12 border border-white/12 backdrop-blur-[48px] rounded-full bg-white/12 shadow-[0px_10px_10px_-8px_rgba(18,18,23,0.02),0px_2px_2px_-1.5px_rgba(18,18,23,0.02),0px_1px_1px_-0.5px_rgba(18,18,23,0.02)]"
            (click)="handleNext()"
          >
            <i class="pi pi-arrow-right text-surface-0 !text-xl"></i>
          </button>
        </div>
      </div>
      <div class="absolute lg:left-[26.5rem] lg:bottom-16 lg:mt-0 bottom-32">
        <ui-carousel
          #carouselRef
          [hideButtons]="true"
          [hideMask]="true"
          height="26rem"
          [options]="{ loop: true, align: isMobile() ? 'center' : 'start' }"
          className="max-w-[60rem]"
          refContainerClass="overflow-visible lg:overflow-hidden"
        >
          <ui-carousel-item
            *ngFor="let item of escapeGalleryData; let index = index"
            className="min-w-[18rem]"
          >
            <animated-container
              [delay]="200 * index"
              className="relative w-full h-full rounded-3xl shadow-blue-card overflow-hidden"
            >
              <img
                class="object-cover w-full h-full"
                [src]="item.image"
                alt="Escape Gallery Item"
              />
              <div
                class="absolute inset-0 -z-1 bg-[linear-gradient(0deg,rgba(0,0,0,0.16)_0%,rgba(0,0,0,0.16)_100%)]"
              ></div>
            </animated-container>
          </ui-carousel-item>
        </ui-carousel>
      </div>
      <div
        class="flex items-center justify-center lg:hidden gap-6 absolute bottom-16 w-full"
      >
        <button
          class="w-[5.5rem] h-12 border border-white/12 backdrop-blur-[48px] rounded-full bg-white/12 shadow-[0px_10px_10px_-8px_rgba(18,18,23,0.02),0px_2px_2px_-1.5px_rgba(18,18,23,0.02),0px_1px_1px_-0.5px_rgba(18,18,23,0.02)]"
          (click)="handlePrev()"
        >
          <i class="pi pi-arrow-left text-surface-0 !text-xl"></i>
        </button>
        <button
          class="w-[5.5rem] h-12 border border-white/12 backdrop-blur-[48px] rounded-full bg-white/12 shadow-[0px_10px_10px_-8px_rgba(18,18,23,0.02),0px_2px_2px_-1.5px_rgba(18,18,23,0.02),0px_1px_1px_-0.5px_rgba(18,18,23,0.02)]"
          (click)="handleNext()"
        >
          <i class="pi pi-arrow-right text-surface-0 !text-xl"></i>
        </button>
      </div>
    </div>
  </div>`,
})
export class TravelEscapeGallery {
  @ViewChild("carouselRef") carouselRef!: UICarousel;

  layoutService = inject(LayoutService);

  isMobile = computed(() => this.layoutService.isMobile());

  escapeGalleryData = [
    { title: "Beach", image: "/pages/travel/escape-beach.jpg" },
    { title: "Beach", image: "/pages/travel/escape-nature.jpg" },
    { title: "Beach", image: "/pages/travel/escape-hotel.jpg" },
    { title: "Beach", image: "/pages/travel/escape-beach.jpg" },
    { title: "Beach", image: "/pages/travel/escape-nature.jpg" },
    { title: "Beach", image: "/pages/travel/escape-hotel.jpg" },
  ];

  handlePrev() {
    const carousel = this.carouselRef;
    if (carousel && carousel.scrollPrev) {
      carousel.scrollPrev();
    }
  }

  handleNext() {
    const carousel = this.carouselRef;
    if (carousel && carousel.scrollNext) {
      carousel.scrollNext();
    }
  }
}
