import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "blog-list",
  standalone: true,
  imports: [CommonModule, RouterLink, AnimatedContainer],
  template: ` <div
    class="container grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 lg:mt-32"
  >
    <animated-container
      *ngFor="let item of blogListData; let index = index"
      [delay]="index * 100"
      className="group relative h-[34rem] rounded-3xl overflow-hidden shadow-blue-card dark:shadow-none border-0 dark:border border-white/12"
    >
      <img
        class="object-cover -z-2 absolute w-full h-full rounded-b-[2rem]"
        [src]="item.image"
        alt="Blog List Image"
      />
      <div
        class="-z-1 inset-0 absolute bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_0%,rgba(0,0,0,0.48)_64.82%)] rounded-b-[2rem]"
      ></div>
      <div
        class="bottom-0 absolute z-1 left-0 right-0 p-8 bg-surface-0 dark:bg-surface-950 rounded-t-3xl transition-all duration-300"
      >
        <a routerLink="detail" class="flex items-center justify-between gap-2">
          <h5
            class="text-lg font-semibold text-surface-950 dark:text-surface-0"
          >
            {{ item.title }}
          </h5>
          <i class="pi pi-arrow-right !text-sm"></i>
        </a>
        <p class="mt-3 text-surface-500 dark:text-white/64">
          {{ item.description }}
        </p>
      </div>
    </animated-container>
  </div>`,
})
export class BlogList {
  blogListData = [
    {
      title: "Top SaaS Sectors 2025",
      description:
        "Discover SaaS sectors with highest return potential. Leading solutions in finance, healthcare, education.",
      image: "/pages/blog/blog-list-1.jpg",
    },
    {
      title: "Successful SaaS Product",
      description:
        "Key tips for product design, user experience, marketing, and customer support.",
      image: "/pages/blog/blog-list-2.jpg",
    },
    {
      title: "SaaS Business Models",
      description:
        "Learn about subscription-based, usage-based, and hybrid models. Choose the best fit.",
      image: "/pages/blog/blog-list-3.jpg",
    },
    {
      title: "2025 SaaS Security Trends",
      description:
        "Latest trends and best practices in data protection, encryption, and cybersecurity measures.",
      image: "/pages/blog/blog-list-4.jpg",
    },
    {
      title: "SaaS User Training",
      description:
        "Increase customer satisfaction and loyalty through user training and support strategies.",
      image: "/pages/blog/blog-list-5.jpg",
    },
    {
      title: "SaaS Subscription Models",
      description:
        "Learn differences between flexible pricing, tiered models, and annual subscriptions.",
      image: "/pages/blog/blog-list-6.jpg",
    },
    {
      title: "SaaS and AI",
      description:
        "Transform your business with AI in automation, data analytics, and customer service.",
      image: "/pages/blog/blog-list-7.jpg",
    },
    {
      title: "SaaS Marketing Strategies",
      description:
        "Tips on digital marketing, content marketing, social media, and email campaigns.",
      image: "/pages/blog/blog-list-8.jpg",
    },
    {
      title: "SaaS Success Metrics",
      description:
        "Customer acquisition cost, monthly recurring revenue, churn rate, and more.",
      image: "/pages/blog/blog-list-9.jpg",
    },
  ];
}
