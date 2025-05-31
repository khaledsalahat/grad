import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: "logistic-who-we-are",
  standalone: true,
  imports: [CommonModule, AnimatedContainer],
  template: `
    <div class="container mt-24 lg:mt-48">
      <div class="flex lg:flex-row flex-col items-center gap-28">
        <div class="flex-1">
          <h2
            class="text-3xl lg:text-7xl font-semibold text-surface-950 dark:text-surface-0 [text-shadow:var(--black-card-shadow)]"
          >
            Who We Are
          </h2>
          <p class="mt-8 text-lg text-surface-500 dark:text-white/64">
            With over 20 years of experience in the logistics industry, we are
            committed to providing tailored logistics solutions that enhance
            your supply chain efficiency and reliability. Our mission is to
            empower businesses with innovative strategies, advanced technology,
            and dedicated customer support.
          </p>
          <div class="mt-16">
            <h6
              class="text-2xl font-semibold text-surface-950 dark:text-surface-0 [text-shadow:var(--black-card-shadow)]"
            >
              Our Mission
            </h6>
            <p class="mt-6 text-lg text-surface-500 dark:text-white/64">
              We strive to deliver efficient, reliable, and scalable logistics
              solutions, continuously innovating to meet the evolving needs of
              our clients while promoting sustainability and integrity.
            </p>
          </div>
        </div>
        <div class="relative w-full max-w-[35rem] h-[31rem] overflow-hidden">
          <img
            class="object-contain w-full h-full"
            src="/pages/logistic/who-we-are.png"
            alt="Logistic Who We Are Image"
          />
        </div>
      </div>
      <div class="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <animated-container
          *ngFor="let item of whoWeAreData; let index = index"
          [delay]="index * 300"
          className="relative min-h-[30rem] rounded-4xl overflow-hidden shadow-blue-card dark:shadow-none"
        >
          <img
            class="object-cover -z-2 absolute w-full h-full"
            [src]="item.image"
            alt="Logistic Who We Are Detail Image"
          />
          <div
            class="absolute inset-0 -z-1 bg-[linear-gradient(180deg,rgba(0,0,0,0.14)_0%,rgba(0,0,0,0.70)_100%)]"
          ></div>
          <div class="absolute bottom-6 left-6 right-6">
            <h3 class="text-8xl title">{{ item.stats }}</h3>
            <h5 class="title font-semibold text-2xl">{{ item.title }}</h5>
            <p class="mt-2 text-white/72">{{ item.description }}</p>
          </div>
        </animated-container>
      </div>
    </div>
  `,
})
export class LogisticWhoWeAre {
  whoWeAreData = [
    {
      stats: "20+",
      title: "Years on the market",
      image: "/pages/logistic/who-we-are-detail-1.jpg",
      description:
        "Leverage our extensive experience for top-notch logistics solutions tailored to your needs.",
    },
    {
      stats: "17+",
      title: "Award-Winning Service",
      image: "/pages/logistic/who-we-are-detail-2.jpg",
      description:
        "Recognized with industry awards, we deliver outstanding service and high standards.",
    },
    {
      stats: "172+",
      title: "Innovation in Logistics",
      image: "/pages/logistic/who-we-are-detail-3.jpg",
      description:
        "We invest in cutting-edge technologies to keep you ahead of market trends.",
    },
    {
      stats: "27+",
      title: "Local Expertise",
      image: "/pages/logistic/who-we-are-detail-4.jpg",
      description:
        "Our global network and local experts provide personalized service and insights.",
    },
  ];
}
