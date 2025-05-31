import { Component } from "@angular/core";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";

@Component({
  selector: "startup-features",
  standalone: true,
  imports: [AnimatedContainer],
  template: `
    <div class="container mt-24 lg:mt-64">
      <div
        class="max-w-[26rem] mx-auto lg:max-w-[72rem] flex flex-col gap-24 lg:gap-64"
      >
        <div
          class="flex lg:flex-row flex-col gap-20 items-center justify-between"
        >
          <div class="lg:flex-1 max-w-lg">
            <span class="badge">Business</span>
            <h2 class="mt-4 text-3xl lg:text-5xl font-semibold leading-tight">
              Scale Your Business with Confidence
            </h2>
            <p class="mt-6 text-lg text-surface-500">
              Utilize our scalable infrastructure and resources to support your
              startup’s growth and reach new heights.
            </p>
            <ul class="mt-8 flex flex-col gap-3.5">
              <li class="inline-flex items-center gap-3 text-surface-500">
                <i class="pi pi-check-circle"></i>
                <span class="text-lg">Cloud-Based Solutions</span>
              </li>
              <li class="inline-flex items-center gap-3 text-surface-500">
                <i class="pi pi-check-circle"></i>
                <span class="text-lg">Scalable Server Capacity</span>
              </li>
              <li class="inline-flex items-center gap-3 text-surface-500">
                <i class="pi pi-check-circle"></i>
                <span class="text-lg">Robust Backup Systems</span>
              </li>
            </ul>
            <button class="button-gradient mt-8">Get Started</button>
          </div>
          <animated-container
            enterClass="animate-slidefadeinright"
            className="lg:flex-1 w-full max-w-[35rem] h-[23rem] lg:h-[31rem] bg-main-gradient rounded-3xl relative lg:rounded-4xl"
          >
            <img
              class="w-full h-auto absolute max-w-none"
              src="/pages/startup/feature-img-1.png"
              alt="Startup Features Image 1"
            />
          </animated-container>
        </div>
        <div
          class="flex flex-col lg:flex-row-reverse items-center justify-between gap-20 lg:gap-0"
        >
          <div class="lg:flex-1 max-w-[29.3rem]">
            <span class="badge">Optimize</span>
            <h2 class="mt-4 text-3xl lg:text-5xl font-semibold leading-tight">
              Optimize Your Startup Operations
            </h2>
            <p class="mt-6 text-lg text-surface-500">
              Enhance your startup’s efficiency and productivity with our
              innovative solutions tailored for emerging businesses.
            </p>
            <ul class="mt-8 flex flex-col gap-3.5">
              <li class="inline-flex items-center gap-3 text-surface-500">
                <i class="pi pi-check-circle"></i>
                <span class="text-lg">Automated Task Management</span>
              </li>
              <li class="inline-flex items-center gap-3 text-surface-500">
                <i class="pi pi-check-circle"></i>
                <span class="text-lg">Real-Time Collaboration Tools</span>
              </li>
              <li class="inline-flex items-center gap-3 text-surface-500">
                <i class="pi pi-check-circle"></i>
                <span class="text-lg">Performance Analytics</span>
              </li>
            </ul>
            <button class="button-gradient mt-8">Get Started</button>
          </div>
          <animated-container
            enterClass="animate-slidefadeinleft"
            className="w-full lg:flex-1 max-w-[35rem] h-[23rem] lg:h-[31rem] bg-main-gradient rounded-3xl lg:rounded-4xl relative"
          >
            <img
              class="w-full h-auto absolute max-w-none"
              src="/pages/startup/feature-img-2.png"
              alt="Startup Features Image 2"
            />
          </animated-container>
        </div>
      </div>
    </div>
  `,
})
export class StartupFeatures {}
