import { UICarousel } from "@/layout/components/UI/carousel";
import { UICarouselItem } from "@/layout/components/UI/carousel-item";
import { LayoutService } from "@/layout/service/layout.service";
import { CommonModule } from "@angular/common";
import { Component, computed, inject } from "@angular/core";
import { AvatarModule } from "primeng/avatar";

@Component({
  selector: "logistic-testimonials",
  standalone: true,
  imports: [CommonModule, AvatarModule, UICarousel, UICarouselItem],
  template: `
    <div class="mt-64">
      <div class="max-w-[40rem] mx-auto px-4">
        <h1
          class="text-3xl lg:text-7xl font-semibold text-surface-950 dark:text-surface-0 leading-tight"
        >
          What Our
          <br />
          Happy Clients Say
        </h1>
        <p class="text-lg lg:text-xl text-surface-500 dark:text-white/64 mt-7">
          Our clients’ satisfaction is our top priority. Hear from those who
          have experienced our exceptional logistics services firsthand. Their
          feedback drives us to continuously improve and innovate.
        </p>
      </div>
      <div class="mt-24 relative">
        <ui-carousel
          [scaled]="true"
          [options]="{ align: 'center', loop: true }"
          [height]="isMobile() ? '40rem' : '24rem'"
          size="85%"
          spacing="0"
        >
          <ui-carousel-item
            *ngFor="let item of logisticTestimonialsData; let index = index"
            [scaled]="true"
            className="w-full lg:min-w-[43.5rem] max-w-[50rem]"
          >
            <div
              class="h-full w-full flex lg:flex-row flex-col-reverse items-center border border-surface-200 dark:border-white/12 rounded-3xl lg:rounded-4xl shadow-blue-card dark:shadow-none overflow-hidden"
            >
              <div class="flex-1 p-6 lg:p-10 h-full">
                <svg
                  class="w-8 lg:w-14 h-auto fill-black/32 dark:fill-white/32"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 56 43"
                  fill="none"
                >
                  <path
                    d="M4.97157 39.2933C1.73675 35.8538 0 31.9961 0 25.7428C0 14.7389 7.71645 4.87629 18.9378 0L21.7424 4.33238C11.2685 10.0041 9.2208 17.3641 8.40424 22.0046C10.0907 21.1306 12.2986 20.8256 14.4625 21.0268C20.1281 21.5519 24.594 26.2081 24.594 31.9961C24.594 34.9145 23.4359 37.7134 21.3745 39.777C19.3131 41.8407 16.5172 43 13.6019 43C10.2321 43 7.00982 41.4595 4.97157 39.2933ZM36.3775 39.2933C33.1427 35.8538 31.406 31.9961 31.406 25.7428C31.406 14.7389 39.1224 4.87629 50.3438 0L53.1483 4.33238C42.6744 10.0041 40.6268 17.3641 39.8102 22.0046C41.4967 21.1306 43.7046 20.8256 45.8684 21.0268C51.5341 21.5519 56 26.2081 56 31.9961C56 34.9145 54.8419 37.7134 52.7805 39.777C50.7191 41.8407 47.9232 43 45.0079 43C41.638 43 38.4158 41.4595 36.3775 39.2933Z"
                  />
                </svg>
                <h5
                  class="text-base lg:text-xl font-semibold text-surface-950 dark:text-surface-0 mt-4 lg:mt-8"
                >
                  {{ item.title }}
                </h5>
                <p
                  class="text-sm lg:text-base mt-3.5 lg:mt-4 text-surface-500 dark:text-white/64"
                >
                  {{ item.description }}
                </p>
                <div class="flex items-center gap-3 mt-4 lg:mt-6">
                  <p-avatar [image]="item.avatar" size="xlarge" />
                  <div>
                    <div
                      class="font-semibold text-surface-950 dark:text-surface-0"
                    >
                      {{ item.name }}
                    </div>
                    <div
                      class="text-sm text-surface-500 dark:text-white/64 mt-1"
                    >
                      {{ item.job }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full lg:w-80 h-full relative overflow-hidden">
                <div
                  class="w-full h-20 z-1 absolute lg:hidden bottom-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.00)_23.7%,#FFF_88.88%)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.00)_23.7%,rgb(var(--surface-950))_88.88%)]"
                ></div>
                <img
                  class="object-cover w-full h-full"
                  [src]="item.image"
                  alt="Pricing Testimonial Image"
                />
              </div>
            </div>
          </ui-carousel-item>
        </ui-carousel>
      </div>
    </div>
  `,
})
export class LogisticTestimonials {
  layoutService = inject(LayoutService);

  isMobile = computed(() => this.layoutService.isMobile());

  logisticTestimonialsData = [
    {
      title: "Innovative Technology Integration",
      description:
        "Their advanced logistics technology has streamlined our processes and reduced costs. The integration of AI and real-time data analytics has been a game-changer for us.",
      avatar: "/avatars/female-9.jpg",
      name: "Amy Elsner",
      job: "Supply Chain Coordinator",
      image: "/pages/logistic/testimonial-1.jpg",
    },
    {
      title: "Efficient and Reliable Logistics Solutions",
      description:
        "Using their logistics services has greatly improved our supply chain efficiency. The real-time tracking and automated inventory management have been transformative for our operations.",
      avatar: "/avatars/female-8.jpg",
      name: "Emily Johnson",
      job: "CEO",
      image: "/pages/logistic/testimonial-2.jpg",
    },
    {
      title: "Exceptional Freight Forwarding",
      description:
        "Their freight forwarding services are exceptional. The team handled all aspects of shipping, from documentation to customs clearance, with remarkable efficiency.",
      avatar: "/avatars/male-1.jpg",
      name: "Mark Johnson",
      job: "Environmental Compliance Officer",
      image: "/pages/logistic/testimonial-3.jpg",
    },
    {
      title: "Seamless End-to-End Supply Chain Management",
      description:
        "Their supply chain management solutions have been instrumental in optimizing our entire operation. From procurement to delivery.",
      avatar: "/avatars/female-9.jpg",
      name: "Amy Elsner",
      job: "Supply Chain Coordinator",
      image: "/pages/logistic/services-background.jpg",
    },
  ];
}
