import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { IconBook } from "@/layout/components/icon/book";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { AvatarModule } from "primeng/avatar";

@Component({
  selector: "e-learning-network",
  standalone: true,
  imports: [AnimatedContainer, CommonModule, AvatarModule, IconBook],
  template: `
    <div class="container mt-24 lg:mt-64">
      <div class="icon-box">
        <IconBook className="w-8 h-8 lg:w-10 lg:h-10" />
      </div>
      <h1
        class="mt-10 text-3xl lg:text-5xl font-semibold text-surface-950 dark:text-surface-0 max-w-sm text-center mx-auto"
      >
        Expansive Learning Network
      </h1>
      <p
        class="mt-6 text-lg text-surface-500 dark:text-white/64 max-w-md mx-auto text-center"
      >
        Discover a wide range of courses tailored to enhance your skills and
        knowledge across various disciplines.
      </p>
      <div class="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <animated-container
          *ngFor="let item of networkData; let index = index"
          [delay]="index * 400"
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
                <span class="text-sm text-surface-500">{{ item.job }}</span>
              </div>
            </div>
            <div
              class="my-5 w-full border-b border-surface-200 dark:border-white/24 border-dashed"
            ></div>
            <div class="flex flex-wrap items-center justify-between gap-2">
              <span
                class="font-medium text-surface-950 dark:text-surface-0 text-2xl"
                >{{ item.price }}</span
              >
              <div class="flex items-center gap-4">
                <div
                  class="h-8 px-4 shadow-stroke rounded-full inline-flex items-center gap-2 font-medium text-surface-950 dark:text-surface-0"
                >
                  <i class="pi pi-book !text-sm"></i>
                  {{ item.content_length }}
                </div>
                <div
                  class="h-8 px-4 shadow-stroke rounded-full inline-flex items-center gap-2 font-medium text-surface-950 dark:text-surface-0"
                >
                  <i class="pi pi-user !text-sm"></i>
                  {{ item.student_length }}
                </div>
              </div>
            </div>
          </div>
        </animated-container>
      </div>
    </div>
  `,
})
export class ELearningNetwork {
  networkData = [
    {
      image: "/pages/e-learning/network-course-1.jpg",
      title: "Introduction to Data Science",
      description:
        "Learn the fundamentals of data science and start deriving meaningful insights from large datasets.",
      avatar: "/avatars/male-1.jpg",
      name: "Ethan Blackwood",
      job: "Teacher",
      price: "$200",
      content_length: "40",
      student_length: "80",
    },
    {
      image: "/pages/e-learning/network-course-2.jpg",
      title: "Digital Marketing Essentials",
      description:
        "Explore modern marketing strategies and strengthen your online brand presence.",
      avatar: "/avatars/female-2.jpg",
      name: "Luna Prescott",
      job: "Teacher",
      price: "$132",
      content_length: "56",
      student_length: "72",
    },
    {
      image: "/pages/e-learning/network-course-3.jpg",
      title: "Web Development Fundamentals",
      description:
        "Learn the basics of creating websites with HTML, CSS, and JavaScript.",
      avatar: "/avatars/male-4.jpg",
      name: "Jasper Holloway",
      job: "Teacher",
      price: "$280",
      content_length: "36",
      student_length: "112",
    },
  ];
}
