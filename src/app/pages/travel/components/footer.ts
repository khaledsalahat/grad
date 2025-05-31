import { Component } from "@angular/core";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { CommonModule } from "@angular/common";
import { AppFooter } from "@/layout/components/app.footer";

@Component({
  selector: "travel-footer",
  standalone: true,
  imports: [AnimatedContainer, CommonModule, AppFooter],
  template: `
    <animated-container className="max-w-[82rem] px-4 mx-auto mt-24 lg:mt-64 ">
      <div
        class="w-full h-full relative rounded-3xl lg:rounded-4xl overflow-hidden block pt-4 lg:pt-[32rem]"
      >
        <div class="absolute inset-0">
          <img
            class="object-cover absolute inset-0 max-w-none w-full h-full"
            src="/pages/travel/footer-bg.jpg"
            alt="Footer Background Image"
          />
        </div>
        <div
          class="lg:block hidden absolute left-1/2 -translate-x-1/2 z-2 text-[6rem] lg:text-[18rem] top-60 lg:top-0 font-semibold title [background-image:radial-gradient(235.17%_97.94%_at_53.25%_-29.68%,#FFF_0%,rgba(255,255,255,0.00)_97%)]"
        >
          Booking
        </div>
        <app-footer [noContainer]="true" [transparent]="true" />
      </div>
    </animated-container>
  `,
})
export class TravelFooter {}
