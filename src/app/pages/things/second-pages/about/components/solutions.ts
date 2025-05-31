import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { IconEditSmall } from "@/layout/components/icon/editsmall";

@Component({
  selector: "about-solutions",
  standalone: true,
  imports: [CommonModule, AnimatedContainer, IconEditSmall],
  template: ` <div class="container mt-64">
    <div class="icon-box">
      <IconEditSmall className="w-9 h-9 lg:w-11 lg:h-11" />
    </div>
    <h1
      class="mt-10 text-3xl lg:text-6xl font-semibold text-surface-950 dark:text-surface-0 leading-tight text-center"
    >
      Innovative
      <br />
      Startup Solutions
    </h1>
    <p
      class="mt-7 text-lg lg:text-xl text-surface-500 dark:text-white/64 max-w-[32rem] text-center mx-auto"
    >
      Explore the latest trends and developments in the startup world with
      expert insights and practical tips.
    </p>
    <div
      class="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-px rounded-4xl overflow-hidden"
    >
      <animated-container
        *ngFor="let item of solutionsData; let index = index"
        [delay]="index * 100"
        className="relative h-[34rem] group"
      >
        <div
          class="absolute inset-0 -z-1 bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_0%,rgba(0,0,0,0.40)_64.82%)] group-hover:bg-[rgba(37,99,235,0.10)] transition-all"
        ></div>
        <img
          class="select-none object-cover -z-2 group-hover:grayscale transition-all absolute w-full h-full"
          [src]="item.image"
          alt="Logistic Solutions Image"
        />
        <div class="absolute left-8 right-8 bottom-8 flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <span class="text-4xl text-white/72 font-semibold">
              {{ getFormattedIndex(index) }}</span
            >
            <a
              class="cursor-pointer group-hover:opacity-100 opacity-0 button-regular h-8 min-w-0 px-4"
            >
              <i
                class="pi pi-arrow-right bg-main-gradient bg-clip-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]"
              ></i>
            </a>
          </div>
          <h5 class="text-2xl title">{{ item.title }}</h5>
          <p class="text-white/72 text-lg">{{ item.description }}</p>
        </div>
      </animated-container>
    </div>
  </div>`,
})
export class AboutSolutions {
  solutionsData = [
    {
      title: "Product Development",
      description:
        "Optimize your product development strategies and accelerate innovation.",
      image: "/pages/about/solution-image-1.jpg",
    },
    {
      title: "Lean Startup Methodology",
      description:
        "Discover the lean startup methodology and grow efficiently using resources.",
      image: "/pages/about/solution-image-2.jpg",
    },
    {
      title: "Future of Tech Startups",
      description:
        "Explore the latest technological advancements transforming the startup ecosystem.",
      image: "/pages/about/solution-image-3.jpg",
    },
  ];

  getFormattedIndex(index: number): string {
    return (index + 1).toString().padStart(2, "0");
  }
}
