import { Component } from "@angular/core";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { CommonModule } from "@angular/common";
import { IconQuation } from "@/layout/components/icon/quatation";
import { AvatarModule } from "primeng/avatar";

@Component({
  selector: "real-estate-testimonials",
  standalone: true,
  imports: [AnimatedContainer, CommonModule, AvatarModule, IconQuation],
  template: `
    <div class="container mt-24 lg:mt-64">
      <div class="w-full flex flex-wrap items-center justify-between gap-6">
        <h1
          class="max-w-[36rem] text-3xl lg:text-6xl font-semibold text-surface-950 dark:text-surface-0 !leading-tight"
        >
          What Do Our Happy Customers Say?
        </h1>
        <div class="max-w-[34rem]">
          <p class="text-xl text-surface-500 dark:text-white/64">
            We take pride in delivering exceptional service and ensuring our
            clients find their perfect homes. Here’s what some of our satisfied
            clients have to say about their experiences working with us.
          </p>
        </div>
      </div>
      <div class="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <animated-container
          *ngFor="let item of realEstateTestimonialsData; let index = index"
          [delay]="index * 150"
          className="rounded-4xl overflow-hidden shadow-blue-card dark:shadow-none border-0 dark:border border-white/12 flex flex-col"
        >
          <div
            class="h-32 w-full bg-main-gradient flex items-center justify-center"
          >
            <span class="title text-4xl">Genesis</span>
          </div>
          <div class="relative z-1 p-6 pt-4 flex flex-col flex-1">
            <p-avatar
              [image]="item.avatar"
              class="absolute -top-10"
              size="xlarge"
              shape="circle"
            />
            <div class="w-full flex items-end justify-end">
              <IconQuatation />
            </div>
            <p class="mt-1 text-lg text-surface-600 dark:text-white/64 flex-1">
              {{ item.text }}
            </p>
            <div class="mt-4 flex flex-col gap-1">
              <span
                class="text-xl font-semibold text-surface-950 dark:text-surface-0"
                >{{ item.name }}</span
              >
              <span class="text-surface-600 dark:text-white/64">{{
                item.job
              }}</span>
            </div>
          </div>
        </animated-container>
      </div>
    </div>
  `,
})
export class RealEstateTestimonials {
  realEstateTestimonialsData = [
    {
      avatar: "/avatars/male-1.jpg",
      text: "An exceptional experience from start to finish. The team was professional, knowledgeable, and attentive to all our needs. Highly recommend!",
      name: "John Smith",
      job: "Homeowner",
    },
    {
      avatar: "/avatars/female-1.jpg",
      text: "Their expertise and dedication helped us find the ideal property. The process was smooth and stress-free. We couldn’t be happier!",
      name: "Emily Johnson",
      job: "First-Time Buyer",
    },
    {
      avatar: "/avatars/male-2.jpg",
      text: "The level of service and attention to detail was outstanding. They truly care about their clients and go above and beyond to meet expectations.",
      name: "Michael Brown",
      job: "Investor",
    },
    {
      avatar: "/avatars/female-2.jpg",
      text: "Finding our dream home was a breeze thanks to their guidance and support. The entire team was fantastic to work with.",
      name: "Sarah Davis",
      job: "New Homeowner",
    },
    {
      avatar: "/avatars/male-3.jpg",
      text: "Their market knowledge and negotiation skills were instrumental in securing our perfect property. We are extremely satisfied.",
      name: "David Wilson",
      job: "Relocation Client",
    },
    {
      avatar: "/avatars/female-3.jpg",
      text: "Professional, reliable, and always available to answer our questions. They made the home buying process enjoyable and straightforward",
      name: "Jessica Miller",
      job: "Happy Client",
    },
  ];
}
