import { Component } from "@angular/core";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { CommonModule } from "@angular/common";
import { FloridaIcon } from "@/layout/components/icon/shapes/florida";
import { CaliforniaIcon } from "@/layout/components/icon/shapes/california";
import { NewYorkIcon } from "@/layout/components/icon/shapes/newyork";

@Component({
  selector: "contact-address",
  standalone: true,
  imports: [AnimatedContainer, CommonModule],
  template: `
    <div
      class="container mt-40 flex items-center lg:flex-row flex-col-reverse gap-6"
    >
      <div class="flex-1 flex flex-col w-full gap-8">
        <animated-container
          *ngFor="let item of contactData; let index = index"
          [delay]="index * 200"
          enterClass="animate-slidefadeinleft"
          className="p-4 lg:p-8 rounded-3xl lg:rounded-4xl shadow-stroke flex items-start gap-6 dark:shadow-none border-0 dark:border border-white/12"
        >
          <div
            class="w-14 h-14 flex items-center justify-center rounded-2xl bg-main-gradient overflow-hidden backdrop-blur-[7px] shadow-[0px_-12px_24px_0px_rgba(159,114,255,0.20)_inset]"
          >
            <ng-container *ngComponentOutlet="item.icon"></ng-container>
          </div>
          <div>
            <div
              class="mt-1 text-2xl font-semibold text-surface-950 dark:text-surface-0"
            >
              {{ item.title }}
            </div>
            <p
              class="mt-4 flex flex-col gap-1 text-lg text-surface-600 dark:text-white/64"
            >
              <span *ngFor="let c of item.content; let j = index">{{ c }}</span>
            </p>
          </div>
        </animated-container>
      </div>
      <animated-container
        enterClass="animate-slidefadeinright"
        className="w-full lg:flex-1 relative h-[38rem] rounded-3xl lg:rounded-4xl shadow-blue-card overflow-hidden"
      >
        <img
          class="object-cover w-full h-full"
          src="/pages/contact/map-image.jpg"
          alt="Contact Map"
        />
      </animated-container>
    </div>
  `,
})
export class ContactAddress {
  contactData = [
    {
      icon: FloridaIcon,
      title: "Florida",
      content: ["1234 Apple St, Faketown, NY, 00000.", "(400) 000 - 0000"],
    },
    {
      icon: CaliforniaIcon,
      title: "California",
      content: ["3456 Lime Dr, Feigncity, FL, 33333", "(400) 000 - 0000"],
    },
    {
      icon: NewYorkIcon,
      title: "New York",
      content: ["0123 Peach Pl, Deceitdale, IL, 77777", "(400) 000 - 0000"],
    },
  ];
}
