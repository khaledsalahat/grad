import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AnimatedContainer } from "./animatedcontainer";
import { AvatarModule } from "primeng/avatar";
import { CirclePattern } from "./circlepattern";
import { AppFooter } from "./app.footer";
import { twMerge } from "tailwind-merge";

@Component({
  selector: "app-footer-with-cta",
  standalone: true,
  imports: [
    CommonModule,
    AnimatedContainer,
    AvatarModule,
    CirclePattern,
    AppFooter,
  ],
  template: `
    <animated-container>
      <app-footer
        [className]="
          twMerge('relative rounded-3xl lg:rounded-[3rem]', className)
        "
      >
        <circle-pattern
          className="absolute -top-1/2 left-1/2 -translate-x-1/2 translate-y-[36rem] lg:-translate-y-[5.5rem] rotate-180 w-[50rem] lg:w-[82rem] opacity-40 "
        />
        <div
          class="mb-20 pb-36 pt-16 flex items-center justify-center border-b border-white/10 border-dashed"
        >
          <div class="max-w-[34rem] mx-auto">
            <h1
              class="title text-4xl lg:text-6xl font-semibold text-center !leading-tight"
            >
              Begin Your <br />
              Free Trial Today
            </h1>
            <p
              class="text-lg lg:text-xl text-white/64 text-center max-w-[25rem] mx-auto mt-6"
            >
              Experience the full power of our SaaS platform with a risk-free
              trial and see how it can transform your business.
            </p>
            <button class="mt-10 button-regular mx-auto">Get Started</button>
          </div>
        </div>
        <div class="lg:block hidden absolute left-60 top-40">
          <span
            class="absolute w-[110%] aspect-square left-1/2 -translate-x-1/2 top-1/2 -translate-y-[56%] rounded-full backdrop-blur-[2px] bg-white/4 z-10"
          ></span>
          <p-avatar
            image="/avatars/male-1.jpg"
            class="backdrop-blur-lg"
            shape="circle"
          />
        </div>
        <p-avatar
          image="/avatars/male-4.jpg"
          class="lg:!block !hidden absolute top-72 left-48 backdrop-blur-lg"
          size="xlarge"
          shape="circle"
        />
        <div class="lg:block hidden absolute left-[22rem] top-[28rem]">
          <span
            class="absolute w-[110%] aspect-square left-1/2 -translate-x-1/2 top-1/2 -translate-y-[56%] rounded-full backdrop-blur-[2px] bg-white/4 z-10"
          ></span>
          <p-avatar
            image="/avatars/female-4.jpg"
            size="large"
            class="backdrop-blur-lg"
            shape="circle"
          />
        </div>
        <div
          class="lg:block hidden absolute left-[calc(100%-24rem)] top-[26rem]"
        >
          <span
            class="absolute w-[110%] aspect-square left-1/2 -translate-x-1/2 top-1/2 -translate-y-[56%] rounded-full backdrop-blur-[2px] bg-white/4 z-10"
          ></span>
          <p-avatar
            image="/avatars/female-6.jpg"
            size="xlarge"
            class="backdrop-blur-lg"
            shape="circle"
          />
        </div>
        <p-avatar
          image="/avatars/female-7.jpg"
          class="lg:!block !hidden absolute top-64 left-[calc(100%-15rem)] backdrop-blur-lg"
          size="large"
          shape="circle"
        />
        <div class="lg:block hidden absolute left-[calc(100%-16rem)] top-36">
          <span
            class="absolute w-[110%] aspect-square left-1/2 -translate-x-1/2 top-1/2 -translate-y-[56%] rounded-full backdrop-blur-[2px] bg-white/4 z-10"
          ></span>
          <p-avatar
            image="/avatars/male-5.jpg"
            size="large"
            class="backdrop-blur-lg"
            shape="circle"
          />
        </div>
      </app-footer>
    </animated-container>
  `,
})
export class AppFooterWithCTA {
  @Input() className?: string;

  twMerge = twMerge;
}
