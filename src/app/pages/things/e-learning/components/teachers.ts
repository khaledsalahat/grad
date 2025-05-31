import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { IconTextFade } from "@/layout/components/icon/textfade";
import { UICarousel } from "@/layout/components/UI/carousel";
import { UICarouselItem } from "@/layout/components/UI/carousel-item";
import { LayoutService } from "@/layout/service/layout.service";
import { CommonModule } from "@angular/common";
import { Component, computed, inject } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "e-learning-teachers",
  standalone: true,
  imports: [
    AnimatedContainer,
    CommonModule,
    UICarousel,
    UICarouselItem,
    RouterLink,
    IconTextFade,
  ],
  template: `
    <div class="mt-24 lg:mt-64">
      <div class="icon-box">
        <IconTextFade className="w-9 h-9 lg:w-11 lg:h-11" />
      </div>
      <h1
        class="px-4 text-3xl lg:text-5xl font-semibold text-surface-950 dark:text-surface-0 leading-tight mt-10 mx-auto max-w-xl text-center"
      >
        Classroom Chronicles Voices from the Chalk Line
      </h1>
      <p
        class="px-4 text-xl text-surface-500 dark:text-white/64 mt-6 max-w-2xl text-center mx-auto"
      >
        Explore modern education through candid conversations with passionate
        teachers, highlighting innovative strategies across diverse subjects.
      </p>
      <div class="mt-24">
        <ui-carousel
          [size]="isMobile() ? '75%' : '20%'"
          height="27rem"
          [hideMask]="isMobile() ? true : false"
          [options]="{ loop: true, align: 'center' }"
        >
          <ui-carousel-item
            *ngFor="let item of elearningTeachersData; let index = index"
            class="w-full h-full"
          >
            <animated-container
              [delay]="200 * index"
              className="w-full h-full lg:w-64 rounded-3xl shadow-stroke dark:shadow-black-card border-0 dark:border border-white/12 relative overflow-hidden"
            >
              <div class="flex flex-col h-full items-center">
                <div class="w-full flex-1 h-[80%] relative block">
                  <img
                    class="object-contain absolute bottom-0 w-full h-full"
                    [src]="item.image"
                    alt="E-learning Teacher Image"
                  />
                  <div
                    class="z-2 absolute inset-x-0 bottom-0 h-11 bg-[linear-gradient(180deg,rgba(255,255,255,0.00)_0%,#FFF_100%)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.00)_0%,rgb(var(--surface-950))_100%)]"
                  ></div>
                </div>
                <div class="p-6">
                  <h5
                    class="font-semibold text-surface-950 dark:text-surface-0 text-center"
                  >
                    {{ item.name }}
                  </h5>
                  <p
                    class="mt-1 text-sm text-surface-500 dark:text-white/64 text-center w-fit mx-auto"
                  >
                    {{ item.job }}
                  </p>
                  <div class="mt-4 flex items-center gap-2">
                    <a
                      [routerLink]="item.youtube"
                      class="h-8 flex items-center justify-center flex-1 px-4 rounded-full shadow-stroke dark:shadow-black-card border-0 dark:border border-white/12 hover:bg-surface-100 dark:hover:bg-surface-800 transition-all"
                    >
                      <i class="pi pi-youtube leading-none !text-sm"></i>
                    </a>
                    <a
                      [routerLink]="item.twitter"
                      class="h-8 flex items-center justify-center flex-1 px-4 rounded-full shadow-stroke dark:shadow-black-card border-0 dark:border border-white/12 hover:bg-surface-100 dark:hover:bg-surface-800 transition-all"
                    >
                      <i class="pi pi-twitter leading-none !text-sm"></i>
                    </a>
                    <a
                      [routerLink]="item.discord"
                      class="h-8 flex items-center justify-center flex-1 px-4 rounded-full shadow-stroke dark:shadow-black-card border-0 dark:border border-white/12 hover:bg-surface-100 dark:hover:bg-surface-800 transition-all"
                    >
                      <i class="pi pi-discord leading-none !text-sm"></i>
                    </a>
                  </div>
                </div>
              </div>
            </animated-container>
          </ui-carousel-item>
        </ui-carousel>
      </div>
    </div>
  `,
})
export class ELearningTeachers {
  layoutService = inject(LayoutService);

  isMobile = computed(() => this.layoutService.isMobile());

  elearningTeachersData = [
    {
      name: "Michael Brown",
      job: "History Teacher",
      image: "/pages/e-learning/micheal.png",
      youtube: "",
      twitter: "",
      discord: "",
    },
    {
      name: "Sarah Thompson",
      job: "Mathematics Teacher",
      image: "/pages/e-learning/sarah.png",
      youtube: "",
      twitter: "",
      discord: "",
    },
    {
      name: "Ava Nguyen",
      job: "Physical Education Teacher",
      image: "/pages/e-learning/ava.png",
      youtube: "",
      twitter: "",
      discord: "",
    },
    {
      name: "Olivia Garcia",
      job: "English Language Teacher",
      image: "/pages/e-learning/olivia.png",
      youtube: "",
      twitter: "",
      discord: "",
    },
    {
      name: "Emma Watson",
      job: "Science Teacher",
      image: "/pages/e-learning/emma.png",
      youtube: "",
      twitter: "",
      discord: "",
    },
    {
      name: "Ava Nguyen",
      job: "Physical Education Teacher",
      image: "/pages/e-learning/ava.png",
      youtube: "",
      twitter: "",
      discord: "",
    },
    {
      name: "Olivia Garcia",
      job: "English Language Teacher",
      image: "/pages/e-learning/olivia.png",
      youtube: "",
      twitter: "",
      discord: "",
    },
  ];
}
