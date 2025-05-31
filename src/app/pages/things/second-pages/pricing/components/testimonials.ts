import { Component, computed, inject } from "@angular/core";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { CommonModule } from "@angular/common";
import { LayoutService } from "@/layout/service/layout.service";
import { BubbleMessage } from "@/layout/components/icon/bubblemessage";
import { UICarousel } from "@/layout/components/UI/carousel";
import { UICarouselItem } from "@/layout/components/UI/carousel-item";

@Component({
  selector: "pricing-testimonials",
  standalone: true,
  imports: [
    AnimatedContainer,
    CommonModule,
    BubbleMessage,
    UICarousel,
    UICarouselItem,
  ],
  template: ` <div class="mt-64">
    <div class="icon-box">
      <IconBubbleMessage className="w-8 h-8 lg:w-10 lg:h-10" />
    </div>
    <h1
      class="px-6 mt-10 text-3xl lg:text-5xl font-semibold max-w-xs lg:max-w-lg mx-auto text-center text-surface-950 dark:text-surface-0 leading-tight"
    >
      Hear from Our Satisfied Customers
    </h1>
    <p
      class="px-6 mt-6 max-w-lg mx-auto text-center text-lg lg:text-xl text-surface-500 dark:text-white/64"
    >
      Read what our clients say about their success with our innovative
      solutions and outstanding service.
    </p>
    <div class="mt-20 relative">
      <ui-carousel
        [scaled]="true"
        [hideMask]="isMobile() ? true : false"
        [options]="{ align: 'center', loop: true }"
        [height]="isMobile() ? '40rem' : '25rem'"
        [size]="isMobile() ? '85%' : '45%'"
        [spacing]="isMobile() ? '16rem' : '0'"
      >
        <ui-carousel-item
          *ngFor="let item of pricingTestimonialsData; let index = index"
          :key="index"
          [scaled]="true"
        >
          <animated-container
            [delay]="100 * index"
            className="h-full w-full flex lg:flex-row flex-col-reverse items-center border border-surface-200 dark:border-white/12 rounded-4xl shadow-blue-card dark:shadow-black-card overflow-hidden"
          >
            <div class="lg:flex-1 p-6 sm:p-8 lg:py-10 lg:pl-10 lg:h-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 56 43"
                fill="none"
                class="fill-surface-200 dark:fill-white/16 w-10 lg:w-14"
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
                class="mt-3.5 lg:mt-4 lg:text-base text-sm text-surface-500 dark:text-white/64"
              >
                {{ item.description }}
              </p>
              <div
                class="font-semibold text-surface-950 dark:text-surface-0 mt-4 lg:mt-6 text-sm lg:text-base"
              >
                {{ item.name }}
              </div>
              <div
                class="text-xs lg:text-sm text-surface-500 dark:text-white/64 mt-1"
              >
                {{ item.job }}
              </div>
            </div>
            <div
              class="lg:w-72 w-full h-full relative lg:-mb-8 flex justify-center overflow-hidden"
            >
              <div
                class="w-full h-20 z-1 absolute lg:hidden bottom-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.00)_23.7%,#FFF_88.88%)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.00)_23.7%,rgb(var(--surface-950))_88.88%)]"
              ></div>
              <img
                class="object-contain h-full w-auto"
                [src]="item.image"
                alt="Pricing Testimonial Image"
              />
            </div>
          </animated-container>
        </ui-carousel-item>
      </ui-carousel>
    </div>
  </div>`,
})
export class PricingTestimonials {
  layoutService = inject(LayoutService);

  isMobile = computed(() => this.layoutService.isMobile());

  pricingTestimonialsData = [
    {
      title: "Outstanding Customer Support",
      description:
        "The customer support team is always responsive and helpful. The detailed spending reports have given us great insights into our financial health.",
      name: "Sophia Lee",
      job: "CFO at GreenTech",
      image: "/pages/pricing/testimonial-sophia.png",
    },
    {
      title: "Exceptional Service and Reliability",
      description:
        "Using this SaaS platform has significantly streamlined our operations. The real-time collaboration and comprehensive dashboards have been game-changers for us.",
      name: "Emily Johnson",
      job: "Marketing Manager at TechCorp",
      image: "/pages/pricing/testimonial-emily.png",
    },
    {
      title: "Boosted Efficiency and Productivity",
      description:
        "Implementing this solution has boosted our team’s productivity. The time-saving automations and live balance updates are incredibly helpful.",
      name: "Amy Elsner",
      job: "Operations Director at FinServe",
      image: "/pages/pricing/testimonial-amy.png",
    },
    {
      title: "Incredible Scalability",
      description:
        "As our business grew, this platform scaled effortlessly to meet our increasing demands. It's reliable, and the seamless integrations have been invaluable.",
      name: "Jennifer Clarke",
      job: "CFO at GreenTech",
      image:
        "https://primefaces.org/cdn/templates/genesis/pages/pricing/testimonial-jennifer.png",
    },
  ];
}
