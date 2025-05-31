import { Component } from "@angular/core";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { CommonModule } from "@angular/common";
import { IconStar } from "@/layout/components/icon/star";

@Component({
  selector: "e-learning-features",
  standalone: true,
  imports: [AnimatedContainer, CommonModule, IconStar],
  template: `
    <div
      class="container max-w-[72rem] mt-24 lg:mt-64 flex flex-col gap-24 lg:gap-64"
    >
      <div
        class="flex lg:flex-row flex-col-reverse items-center gap-32 lg:gap-20"
      >
        <div class="w-full lg:flex-1">
          <h5
            class="text-3xl lg:text-5xl font-semibold text-surface-950 dark:text-surface-0 leading-tight"
          >
            Optimize Your Learning with Confidence
          </h5>
          <p class="text-lg text-surface-500 dark:text-white/64 mt-6">
            Utilize our advanced educational solutions to streamline your
            learning process and enhance academic efficiency.
          </p>
          <ul class="mt-8 flex flex-col gap-3.5">
            <li
              class="flex items-center gap-3 text-surface-500 dark:text-white/64"
            >
              <i class="pi pi-check-circle"></i>
              <span class="text-lg">Real-Time Progress Tracking</span>
            </li>
            <li
              class="flex items-center gap-3 text-surface-500 dark:text-white/64"
            >
              <i class="pi pi-check-circle"></i>
              <span class="text-lg">Automated Study Schedule Management</span>
            </li>
            <li
              class="flex items-center gap-3 text-surface-500 dark:text-white/64"
            >
              <i class="pi pi-check-circle"></i>
              <span class="text-lg">Secure Online Learning Platforms</span>
            </li>
          </ul>
          <button class="button-gradient mt-8">Get Started</button>
        </div>
        <animated-container
          enterClass="animate-slidefadeinright"
          className="lg:flex-1 w-full h-[27rem] relative"
        >
          <div
            class="w-full h-full rounded-4xl relative shadow-black-card overflow-hidden"
          >
            <div
              class="absolute -z-1 inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.20)_0%,rgba(0,0,0,0.20)_100%)]"
            ></div>
            <img
              class="object-cover -z-2 absolute"
              src="/pages/e-learning/feature-1.jpg"
              alt="E-learning Features Image"
            />
          </div>
          <div
            class="absolute lg:-left-16 -bottom-20 left-1/2 -translate-x-1/2 lg:translate-x-0 w-[90%] lg:w-auto max-w-96 pb-6 px-6 pt-5 shadow-blue-card dark:shadow-black-card border-1 dark:border border-white/12 bg-surface-0 dark:bg-surface-950 rounded-3xl"
          >
            <div
              class="inline-flex items-center gap-2 pb-4 border-b border-surface-200 dark:border-white/12 border-dashed"
            >
              <span
                class="px-3 py-1 rounded-full shadow-stroke dark:shadow-black-card bg-white/8 flex items-center justify-center"
              >
                <IconStar
                  className="w-4 h-4 fill-surface-950 dark:fill-surface-0"
                />
              </span>
              <span class="font-medium text-surface-950 dark:text-surface-0"
                >12+ Students Complated</span
              >
            </div>
            <div
              class="mt-4 h-6 px-2 rounded-full dark:bg-white/8 shadow-stroke dark:shadow-black-card flex items-center gap-12"
            >
              <span
                class="flex-1 bg-surface-950 dark:bg-surface-0 h-2 rounded-full"
              ></span>
              <span class="text-xs text-surface-950 dark:text-surface-0"
                >80%</span
              >
            </div>
            <div
              class="px-3 py-1 rounded-full shadow-stroke dark:shadow-black-card text-sm font-medium text-surface-950 dark:text-surface-0 dark:bg-white/8 w-fit mt-4"
            >
              4K +Active Student
            </div>
            <div
              class="px-3 py-1 rounded-full shadow-stroke dark:shadow-black-card text-sm font-medium text-surface-950 dark:text-surface-0 dark:bg-white/8 w-fit mt-3"
            >
              8K + Graduate student
            </div>
          </div>
        </animated-container>
      </div>
      <div
        class="flex flex-col-reverse lg:flex-row-reverse items-center gap-20"
      >
        <div class="w-full lg:flex-1">
          <h5
            class="text-3xl lg:text-5xl font-semibold text-surface-950 dark:text-surface-0 leading-tight"
          >
            Enhance Your Academic Performance
          </h5>
          <p class="text-lg text-surface-500 dark:text-white/64 mt-6">
            Boost your educational outcomes with our cutting-edge tools designed
            for optimal learning efficiency.
          </p>
          <ul class="mt-8 flex flex-col gap-3.5">
            <li
              class="flex items-center gap-3 text-surface-500 dark:text-white/64"
            >
              <i class="pi pi-check-circle"></i>
              <span class="text-lg">Route Optimization</span>
            </li>
            <li
              class="flex items-center gap-3 text-surface-500 dark:text-white/64"
            >
              <i class="pi pi-check-circle"></i>
              <span class="text-lg">Integrated Communication Systems</span>
            </li>
            <li
              class="flex items-center gap-3 text-surface-500 dark:text-white/64"
            >
              <i class="pi pi-check-circle"></i>
              <span class="text-lg">Real-Time Data Analytics</span>
            </li>
          </ul>
          <button class="button-gradient mt-8">Get Started</button>
        </div>
        <animated-container
          enterClass="animate-slidefadeinleft"
          className="w-full lg:flex-1 h-[27rem] relative"
        >
          <div
            class="w-full h-full rounded-4xl relative shadow-black-card overflow-hidden"
          >
            <div
              class="absolute -z-1 inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.20)_0%,rgba(0,0,0,0.20)_100%)]"
            ></div>
            <img
              class="object-cover -z-2"
              src="/pages/e-learning/feature-2.jpg"
              alt="E-learning Features Image"
            />
          </div>
          <div
            class="absolute left-1/2 -translate-x-1/2 -bottom-12 p-4 w-[90%] max-w-96 lg:w-auto shadow-blue-card dark:shadow-black-card border-0 dark:border border-white/12 bg-surface-0 dark:bg-surface-950 rounded-3xl flex items-center gap-4"
          >
            <span
              class="w-16 h-16 inline-flex items-center justify-center shadow-stroke dark:shadow-black-card border-0 dark:border border-white/12 rounded-2xl"
            >
              <IconStar
                className="w-8 h-8 fill-surface-950 dark:fill-surface-0"
              />
            </span>
            <div class="flex flex-col gap-3 flex-1">
              <span class="font-medium text-surface-950 dark:text-surface-0"
                >4+ Customer Review</span
              >
              <span
                class="w-48 bg-surface-200 dark:bg-white/8 h-4 rounded-full shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]"
              ></span>
            </div>
          </div>
        </animated-container>
      </div>
    </div>
  `,
})
export class ELearningFeatures {}
