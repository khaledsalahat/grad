import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: "logistic-features",
  standalone: true,
  imports: [CommonModule, AnimatedContainer],
  template: `
    <div class="container max-w-[73rem] flex flex-col gap-24 lg:gap-60 mt-60">
      <animated-container
        *ngFor="let item of logisticFeaturesData; let index = index"
        [className]="{
          'flex md:flex-row flex-col-reverse items-center justify-between gap-16 lg:gap-20': true,
          'md:flex-row-reverse flex-col-reverse': index % 2 !== 0,
        }"
      >
        <div class="flex-1">
          <div class="badge">{{ item.badge }}</div>
          <h3
            class="text-3xl lg:text-5xl text-surface-950 dark:text-surface-0 font-semibold leading-tight mt-4"
          >
            {{ item.title }}
          </h3>
          <p
            class="text-lg lg:text-xl text-surface-500 dark:text-white/64 mt-6"
          >
            {{ item.description }}
          </p>
          <ul class="flex flex-col gap-3.5 mt-8">
            <li
              *ngFor="let detailItem of item.details; let j = index"
              class="flex items-center gap-3 text-surface-500 dark:text-white/64 text-lg lg:text-xl"
            >
              <i class="pi pi-check-circle !text-base"></i>
              {{ detailItem }}
            </li>
          </ul>
          <a class="cursor-pointer button-gradient mt-8"> Get Started </a>
        </div>
        <div
          class="w-full md:flex-1 h-[31rem] relative rounded-4xl overflow-hidden shadow-blue-card"
        >
          <div
            class="absolute inset-0 -z-1 bg-[linear-gradient(0deg,rgba(0,0,0,0.20)_0%,rgba(0,0,0,0.20)_100%)]"
          ></div>
          <img
            class="object-cover -z-2 absolute w-full h-full"
            [src]="item.image"
            alt="Logistic Feautre Image"
          />
        </div>
      </animated-container>
    </div>
  `,
})
export class LogisticFeatures {
  logisticFeaturesData = [
    {
      badge: "Business",
      title: "Optimize Your Supply Chain with Confidence",
      image: "/pages/logistic/feature-business.jpg",
      description:
        "Utilize our advanced logistics solutions to streamline your supply chain and enhance efficiency.",
      details: [
        "Real-Time Tracking",
        "Automated Inventory Management",
        "Secure Freight Services",
      ],
    },
    {
      badge: "Optimize",
      title: "Enhance Your Logistics Operations",
      image: "/pages/logistic/feature-optimize.jpg",
      description:
        "Boost your logistics performance with our cutting-edge tools designed for optimal efficiency.",
      details: [
        "Route Optimization",
        "Integrated Communication Systems",
        "Real-Time Data Analytics",
      ],
    },
  ];
}
