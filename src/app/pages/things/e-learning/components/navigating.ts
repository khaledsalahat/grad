import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { FileFade } from "@/layout/components/icon/filefade";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { AvatarModule } from "primeng/avatar";

@Component({
  selector: "e-learning-navigating",
  standalone: true,
  imports: [AnimatedContainer, CommonModule, AvatarModule, FileFade],
  template: `
    <div class="container mt-24 lg:mt-64">
      <div class="icon-box">
        <IconFileFade className="w-8 h-8 lg:w-10 lg:h-10" />
      </div>
      <h1
        class="mt-10 text-3xl lg:text-5xl font-semibold text-surface-950 dark:text-surface-0 max-w-md !leading-tight text-center mx-auto"
      >
        Navigating the Future of Education
      </h1>
      <p
        class="mt-6 text-lg text-surface-500 dark:text-white/64 max-w-lg mx-auto text-center"
      >
        Explore cutting-edge educational trends, innovative teaching strategies,
        and emerging technologies shaping the future of learning across diverse
        disciplines.
      </p>
      <div class="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <animated-container
          *ngFor="let item of navigatingData; let index = index"
          [delay]="index * 300"
        >
          <div class="w-full h-[15.5rem] rounded-2xl relative overflow-hidden">
            <img
              class="object-cover"
              [src]="item.image"
              alt="Network Course Image"
            />
          </div>
          <div class="p-3 mt-4">
            <h5
              class="text-xl font-medium text-surface-950 dark:text-surface-0"
            >
              {{ item.title }}
            </h5>
            <p class="mt-2 text-surface-500 dark:text-white/64">
              {{ item.description }}
            </p>
            <div class="flex items-center gap-3 mt-6">
              <p-avatar [image]="item.avatar" size="large" shape="circle" />
              <div class="flex flex-col">
                <span
                  class="font-medium text-surface-950 dark:text-surface-0"
                  >{{ item.name }}</span
                >
                <span class="text-sm text-surface-500 dark:text-white/64">{{
                  item.job
                }}</span>
              </div>
            </div>
            <div
              class="my-5 w-full border-b border-surface-200 dark:border-white/24 border-dashed"
            ></div>
            <button
              class="flex items-center gap-2 justify-between px-4 py-2 w-full shadow-stroke dark:shadow-none border-0 dark:border border-white/12 rounded-full hover:bg-surface-100 dark:hover:bg-surface-800 transition-all"
            >
              <span>Learn More</span>
              <i class="pi pi-arrow-right"></i>
            </button>
          </div>
        </animated-container>
      </div>
    </div>
  `,
})
export class ELearningNavigating {
  navigatingData = [
    {
      image: "/pages/e-learning/navigating-course-1.jpg",
      title: "Unlocking the Power of Big Data",
      description:
        "Your Gateway to Data Science Introduction to Data Science Learn the fundamentals of data science and start deriving meaningful insights from large datasets.",
      avatar: "/avatars/male-3.jpg",
      name: "David Chen",
      job: "Teacher",
      to: "",
    },
    {
      image: "/pages/e-learning/navigating-course-2.jpg",
      title: "Mastering the Digital Landscape",
      description:
        "Essential Marketing Strategies for 2025 Digital Marketing Essentials Explore modern marketing strategies and strengthen your online brand presence.",
      avatar: "/avatars/female-5.jpg",
      name: "Isabella Kim",
      job: "Teacher",
      to: "",
    },
    {
      image: "/pages/e-learning/navigating-course-3.jpg",
      title: "From Novice to Developer",
      description:
        "Building Your First Website from Scratch Web Development Fundamentals Learn the basics of creating websites with HTML, CSS, and JavaScript.",
      avatar: "/avatars/male-2.jpg",
      name: "James Wilson",
      job: "Teacher",
      to: "",
    },
  ];
}
