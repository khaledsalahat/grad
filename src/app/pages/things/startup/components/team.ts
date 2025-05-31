import { Component, computed, inject, ViewChild } from "@angular/core";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { UICarousel } from "@/layout/components/UI/carousel";
import { UICarouselItem } from "@/layout/components/UI/carousel-item";
import { LayoutService } from "@/layout/service/layout.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "startup-team",
  standalone: true,
  imports: [CommonModule, AnimatedContainer, UICarousel, UICarouselItem],
  template: `
    <animated-container className="w-full overflow-hidden pb-6">
      <div
        class="container px-0 lg:px-4 overflow-visible mt-24 lg:mt-64 relative"
      >
        <h1
          class="px-4 lg:px-0 text-center lg:text-left text-3xl lg:text-8xl text-surface-950 dark:text-surface-0 font-semibold !leading-snug"
        >
          Meet Our Talented <br class="lg:block hidden" />
          Team
        </h1>
        <p
          class="px-4 lg:px-0 mt-3 lg:mt-8 mx-auto lg:mx-0 text-lg lg:text-xl text-surface-500 max-w-md lg:max-w-sm lg:text-left text-center"
        >
          Our diverse team of experts is dedicated to driving innovation and
          delivering exceptional results. With a blend of creativity, technical
          expertise, and strategic thinking, each member brings a unique set of
          skills and experiences to the table.
        </p>
        <div class="mt-14 mb-0 hidden lg:flex items-center gap-6">
          <button
            class="w-[5.5rem] h-12 shadow-stroke dark:shadow-none border-0 dark:border border-white/12 rounded-full"
            (click)="handlePrev()"
          >
            <i class="pi pi-arrow-left !text-xl"></i>
          </button>
          <button
            class="w-[5.5rem] h-12 shadow-stroke dark:shadow-none border-0 dark:border border-white/12 rounded-full"
            (click)="handleNext()"
          >
            <i class="pi pi-arrow-right !text-xl"></i>
          </button>
        </div>
        <div
          class="w-full overflow-hidden lg:absolute lg:left-[30rem] lg:top-[8.5rem] mt-10 lg:mt-0 pl-12 lg:pl-0"
        >
          <div
            class="w-40 h-full absolute right-0 z-10 bg-[linear-gradient(-90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_80%)] dark:bg-[linear-gradient(-90deg,rgba(var(--surface-950))_0%,rgba(255,255,255,0)_80%)]"
          ></div>
          <ui-carousel
            #carousel
            [hideButtons]="true"
            [hideMask]="true"
            height="26rem"
            [options]="{ loop: true, align: isMobile() ? 'center' : 'start' }"
            className="max-w-none"
            refContainerClass="overflow-visible lg:overflow-hidden relative"
          >
            <ui-carousel-item
              *ngFor="let item of startupTeamData; let index = index"
              className="min-w-[18.5rem]"
            >
              <animated-container
                [delay]="200 * index"
                className="group relative w-full h-full rounded-3xl lg:rounded-4xl shadow-blue-card overflow-hidden"
              >
                <img
                  class="object-cover -z-2"
                  [src]="item.image"
                  alt="Startup Team Item"
                />
                <div
                  class="opacity-0 group-hover:opacity-100 transition-all absolute inset-0 z-1 bg-[linear-gradient(0deg,rgba(0,0,0,0.49)_0%,rgba(0,0,0,0.49)_100%)]"
                ></div>
                <div
                  class="opacity-0 group-hover:opacity-100 transition-all absolute z-2 bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center"
                >
                  <div class="flex items-center justify-center gap-2">
                    <a
                      class="cursor-pointer w-14 h-8 rounded-full flex items-center justify-center text-surface-0 border border-white/12 backdrop-blur-sm bg-white/4"
                    >
                      <i class="pi pi-facebook"></i>
                    </a>
                    <a
                      class="cursor-pointer w-14 h-8 rounded-full flex items-center justify-center text-surface-0 border border-white/12 backdrop-blur-sm bg-white/4"
                    >
                      <i class="pi pi-twitter"></i>
                    </a>
                    <a
                      class="cursor-pointer w-14 h-8 rounded-full flex items-center justify-center text-surface-0 border border-white/12 backdrop-blur-sm bg-white/4"
                    >
                      <i class="pi pi-github"></i>
                    </a>
                  </div>
                  <span
                    class="mt-4 text-center text-2xl text-surface-0 font-semibold"
                    >{{ item.name }}</span
                  >
                </div>
              </animated-container>
            </ui-carousel-item>
          </ui-carousel>
        </div>
        <div class="flex items-center justify-center lg:hidden gap-6 mt-10">
          <button
            class="w-[5.5rem] h-12 shadow-stroke dark:shadow-none border-0 dark:border border-white/12 rounded-full"
            (click)="handlePrev()"
          >
            <i class="pi pi-arrow-left !text-xl"></i>
          </button>
          <button
            class="w-[5.5rem] h-12 shadow-stroke dark:shadow-none border-0 dark:border border-white/12 rounded-full"
            (click)="handleNext()"
          >
            <i class="pi pi-arrow-right !text-xl"></i>
          </button>
        </div>
      </div>
    </animated-container>
  `,
})
export class StartupTeam {
  @ViewChild("carousel") carousel!: UICarousel;

  layoutService = inject(LayoutService);

  isMobile = computed(() => this.layoutService.isMobile());

  handlePrev = () => {
    this.carousel.scrollPrev();
  };

  handleNext = () => {
    this.carousel.scrollNext();
  };

  startupTeamData = [
    {
      image: "/pages/startup/team-person-1.jpg",
      name: "Emma Johnson",
      twitter: "/",
      facebook: "/",
      github: "/",
    },
    {
      image: "/pages/startup/team-person-2.jpg",
      name: "Robert Jonas",
      twitter: "/",
      facebook: "/",
      github: "/",
    },
    {
      image: "/pages/startup/team-person-3.jpg",
      name: "Olivia Smith",
      twitter: "/",
      facebook: "/",
      github: "/",
    },
    {
      image: "/pages/startup/team-person-4.jpg",
      name: "Sophia Williams",
      twitter: "/",
      facebook: "/",
      github: "/",
    },
    {
      image: "/pages/startup/team-person-1.jpg",
      name: "Emma Johnson",
      twitter: "/",
      facebook: "/",
      github: "/",
    },
    {
      image: "/pages/startup/team-person-3.jpg",
      name: "Olivia Smith",
      twitter: "/",
      facebook: "/",
      github: "/",
    },
  ];
}
