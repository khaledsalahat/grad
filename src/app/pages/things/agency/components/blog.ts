import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";

@Component({
  selector: "agency-blog",
  standalone: true,
  imports: [CommonModule, AnimatedContainer],
  template: ` <div class="container mt-24 lg:mt-64">
    <span class="text-xl font-semibold text-surface-950 dark:text-surface-0"
      >Blog</span
    >
    <h1
      class="mt-2 text-3xl lg:text-6xl font-semibold text-surface-950 dark:text-surface-0"
    >
      Navigating the Future of Creativity
    </h1>
    <div class="mt-16 grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-6">
      <animated-container
        *ngFor="let item of agencyBlogData; let index = index"
        [delay]="index * 400"
      >
        <div class="h-64 rounded-2xl overflow-hidden relative">
          <img
            class="object-cover w-full h-full"
            [src]="item.image"
            alt="Agency Blog Image"
          />
        </div>
        <div class="p-3 mt-4">
          <h6 class="text-xl font-medium text-surface-950 dark:text-surface-0">
            {{ item.title }}
          </h6>
          <p class="mt-2 text-surface-500 dark:text-white/64">
            {{ item.description }}
          </p>
          <button
            class="w-full text-surface-950 dark:text-surface-0 hover:bg-surface-100 dark:hover:bg-surface-900 transition-colors mt-7 inline-flex items-center justify-between px-4 py-1 rounded-full shadow-stroke dark:shadow-none border-0 dark:border border-surface-700"
          >
            <span class="font-medium">Learn More</span>
            <i class="pi pi-arrow-right text-sm"></i>
          </button>
        </div>
      </animated-container>
    </div>
  </div>`,
})
export class AgencyBlog {
  agencyBlogData = [
    {
      title: "Unlocking the Potential of Brand Identity",
      description:
        "Discover strategic approaches and creative solutions to strengthen your brand identity.",
      image: "/pages/agency/blog-image-1.jpg",
      to: "",
    },
    {
      title: "Mastering Digital Marketing Trends",
      description:
        "Explore 2025 digital marketing trends and enhance your brand's online presence.",
      image: "/pages/agency/blog-image-2.jpg",
      to: "",
    },
    {
      title: "From Concept to Creation",
      description:
        "Learn the fundamentals of turning creative ideas into reality through design processes.",
      image: "/pages/agency/blog-image-3.jpg",
      to: "",
    },
  ];
}
