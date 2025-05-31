import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { Cloudfade } from "@/layout/components/icon/cloudfade";

@Component({
  selector: "enterprise-growth",
  standalone: true,
  imports: [CommonModule, AnimatedContainer, Cloudfade],
  template: `
    <div class="container mt-24 lg:mt-64">
      <div class="icon-box">
        <IconCloudFade className="h-9 w-9 lg:w-11 lg:h-11" />
      </div>
      <h1
        class="text-3xl lg:text-5xl text-surface-950 dark:text-surface-0 font-semibold max-w-xs lg:max-w-lg text-center mx-auto mt-10"
      >
        Discover Your Data and Accelerate Growth
      </h1>
      <p
        class="mt-6 mx-auto max-w-lg text-center text-lg lg:text-xl text-surface-500 dark:text-white/64"
      >
        Unlock the potential of your data. Support your business growth with
        deep insights and actionable information provided by our advanced
        analytics tools.
      </p>
      <div class="mt-16 flex lg:flex-row flex-col items-center gap-6">
        <animated-container
          *ngFor="let item of enterpriseGrowthData; let index = index"
          [delay]="index * 400"
          className="lg:flex-1 h-[32rem] max-w-[26rem] w-full relative rounded-3xl lg:rounded-4xl bg-main-gradient shadow-stroke"
        >
          <img
            class="h-[289px] w-auto max-w-none absolute top-[28px] left-1/2 -translate-x-1/2 [filter:drop-shadow(0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06))]"
            [src]="item.image"
            alt="Growth Image"
          />
          <div class="absolute inset-x-8 bottom-8">
            <h5 class="title text-xl">{{ item.title }}</h5>
            <p class="mt-4 text-white/64">{{ item.description }}</p>
          </div>
        </animated-container>
      </div>
    </div>
  `,
})
export class EnterpriseGrowth {
  enterpriseGrowthData = [
    {
      title: "Shape the Future with Data Analytics",
      description:
        "Enhance business performance with quick real-time data tracking and analysis.",
      image: "/pages/enterprise/growth-img-1.png",
    },
    {
      title: "Comprehensive Analytics",
      description:
        "Create custom analytics dashboards tailored for your business needs and preferences.",
      image: "/pages/enterprise/growth-img-2.png",
    },
    {
      title: "Intelligent Reporting Systems",
      description:
        "Automate your reporting processes and save valuable time efficiently.",
      image: "/pages/enterprise/growth-img-3.png",
    },
  ];
}
