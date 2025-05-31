import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { Component } from "@angular/core";

@Component({
  selector: "logistic-streamline",
  standalone: true,
  imports: [AnimatedContainer],
  template: `
    <div class="container relative mt-64">
      <div class="lg:max-w-[40rem] mx-auto">
        <h1
          class="text-surface-950 dark:text-surface-0 text-3xl lg:text-7xl font-semibold"
        >
          Streamline
          <br />
          Your Operations
        </h1>
        <p class="text-lg lg:text-xl text-surface-500 dark:text-white/64 mt-7">
          Experience unparalleled efficiency and innovation in logistics.
          Partner with us to optimize your supply chain and achieve your
          business goals. Get started today and see the difference our expertise
          can make.
        </p>
        <a class="cursor-pointer button-gradient mt-8">
          Get Started
          <i class="pi pi-arrow-right !text-sm"></i>
        </a>
      </div>
      <div class="mt-6 lg:h-[40rem] relative flex items-center justify-center">
        <animated-container
          [delay]="200"
          className="lg:flex hidden w-[332px] h-[452px] rounded-4xl overflow-hidden absolute left-0 top-7 "
        >
          <div
            class="absolute inset-0 -z-1 bg-[linear-gradient(180deg,rgba(0,0,0,0.24)_0%,rgba(0,0,0,0.24)_49%,rgba(0,0,0,0.10)_100%)]"
          ></div>
          <img
            class="w-full h-full absolute object-cover -z-2"
            src="/pages/logistic/streamline-image-1.jpg"
            alt="Logistic Streamline Image"
          />
        </animated-container>
        <animated-container
          className="w-full lg:w-[390px] h-[452px] rounded-4xl overflow-hidden relative lg:absolute lg:top-[102px] lg:left-[371px]"
        >
          <div
            class="absolute inset-0 -z-1 bg-[linear-gradient(180deg,rgba(0,0,0,0.24)_0%,rgba(0,0,0,0.24)_49%,rgba(0,0,0,0.10)_100%)]"
          ></div>
          <img
            class="w-full h-full absolute object-cover -z-2"
            src="/pages/logistic/streamline-image-2.jpg"
            alt="Logistic Streamline Image"
          />
        </animated-container>
        <animated-container
          [delay]="500"
          className="lg:block hidden w-[371px] h-[452px] rounded-4xl overflow-hidden absolute top-0 left-[781px]"
        >
          <div
            class="absolute inset-0 -z-1 bg-[linear-gradient(180deg,rgba(0,0,0,0.24)_0%,rgba(0,0,0,0.24)_49%,rgba(0,0,0,0.10)_100%)]"
          ></div>
          <img
            class="w-full h-full absolute object-cover -z-2"
            src="/pages/logistic/streamline-image-3.jpg"
            alt="Logistic Streamline Image"
          />
        </animated-container>
      </div>
    </div>
  `,
})
export class LogisticStreamline {}
