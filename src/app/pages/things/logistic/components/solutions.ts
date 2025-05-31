import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: "logistic-solutions",
  standalone: true,
  imports: [AnimatedContainer, CommonModule],
  template: `
    <div class="container mt-64">
      <div class="max-w-[40rem] mx-auto">
        <h1
          class="text-3xl lg:text-7xl font-semibold text-surface-950 dark:text-surface-0"
        >
          Sustainable Logistics Solutions
        </h1>
        <p class="text-xl text-surface-500 dark:text-white/64 mt-6">
          Explore the latest trends and advancements in logistics with expert
          insights and practical tips.
        </p>
        <a class="cursor-pointer button-gradient mt-6">
          All Blogs
          <i class="pi pi-arrow-right !text-sm"></i>
        </a>
      </div>
      <div
        class="mt-24 grid grid-cols-1 lg:grid-cols-3 gap-px rounded-4xl overflow-hidden"
      >
        <animated-container
          *ngFor="let item of solutionsData; let index = index"
          [delay]="index * 200"
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
              <span class="text-4xl text-white/72 font-semibold">{{
                getFormattedIndex(index)
              }}</span>
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
    </div>
  `,
})
export class LogisticSolutions {
  solutionsData = [
    {
      title: "Supply Chain Optimization",
      description:
        "Learn strategies to streamline your supply chain and improve efficiency.",
      image: "/pages/logistic/solution-1-image.jpg",
    },
    {
      title: "Yellow Logistics",
      description:
        "Discover eco-friendly practices to make your logistics operations sustainable.",
      image: "/pages/logistic/solution-2-image.jpg",
    },
    {
      title: "Future of Logistics Tech",
      description:
        "Explore the latest technological advancements transforming the logistics industry.",
      image: "/pages/logistic/solution-3-image.jpg",
    },
  ];
  getFormattedIndex(index: number): string {
    return (index + 1).toString().padStart(2, "0");
  }
}
