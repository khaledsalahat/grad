import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";

@Component({
  selector: "about-vision-mission",
  standalone: true,
  imports: [CommonModule, AnimatedContainer],
  template: ` <div class="container flex flex-col gap-24 lg:gap-40 mt-24">
    <animated-container
      *ngFor="let item of data; let index = index"
      [className]="{
        'flex items-center gap-10 lg:gap-28': true,
        'lg:flex-row flex-col-reverse': index % 2 === 0,
        'lg:flex-row-reverse flex-col': index % 2 !== 0,
      }"
    >
      <div class="flex-1">
        <span class="badge">{{ item.badge }}</span>
        <h6
          class="mt-4 text-3xl lg:text-5xl font-semibold text-surface-950 dark:text-surface-0"
        >
          {{ item.title }}
        </h6>
        <p class="mt-6 text-lg lg:text-xl text-surface-500 dark:text-white/64">
          <span *ngFor="let p of item.text; let j = index">
            {{ p }}
            <ng-container *ngIf="j < item.text.length - 1">
              <br />
              <br />
            </ng-container>
          </span>
        </p>
      </div>
      <div
        class="h-[25rem] w-full lg:flex-1 relative rounded-4xl shadow-blue-card overflow-hidden"
      >
        <img
          class="object-cover w-full h-full"
          [src]="item.image"
          alt="Vision Mission Image"
        />
      </div>
    </animated-container>
  </div>`,
})
export class AboutVisionMission {
  data = [
    {
      badge: "Vision",
      title: "Our Vision",
      text: [
        "Our vision is to enhance our clients’ business processes with cutting-edge technologies, increasing their efficiency and competitiveness. We aim to be a leader in providing innovative solutions that drive transformation and achieve sustainable success in the business world. ",
        "By understanding the unique needs of each client, we prioritize offering tailored solutions that help them achieve their business goals.",
      ],
      image: "/pages/about/vision-image.jpg",
    },
    {
      badge: "Mission",
      title: "Our Mission",
      text: [
        "Our mission is to deliver the highest quality services to help our clients reach their business objectives. We are dedicated to developing reliable and innovative solutions that simplify our clients’ operations and support their growth. By building long-term relationships based on trust and transparency, we strive to be a constant support for our clients. ",
        "With a commitment to continuous improvement and customer satisfaction, we aim to make a significant impact in the industry.",
      ],
      image: "/pages/about/mission-image.jpg",
    },
  ];
}
