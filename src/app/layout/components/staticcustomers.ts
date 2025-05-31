import { Component, Input } from "@angular/core";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { CommonModule } from "@angular/common";
import { twMerge } from "tailwind-merge";
import { Mistranet } from "./icon/customers/mistranet";
import { BriteMank } from "./icon/customers/britemank";
import { Limerantz } from "./icon/customers/limerantz";
import { Streamlinz } from "./icon/customers/streamlinz";
import { Trimzales } from "./icon/customers/trimzales";

@Component({
  selector: "static-customers",
  standalone: true,
  imports: [AnimatedContainer, CommonModule],
  template: `
    <div
      [ngClass]="
        twMerge(
          'grid grid-cols-1 sm:grid-cols-2 grid-rows-2 lg:grid-cols-5 items-center gap-4 justify-between w-full',
          className
        )
      "
    >
      <animated-container
        *ngFor="let item of staticCustomersData; let index = index"
        [delay]="150 * index"
        className="py-7 rounded-3xl shadow-stroke inline-flex items-center justify-center gap-4 dark:shadow-none border-0 dark:border border-white/12"
      >
        <div
          class="fill-surface-500 [&_path]:fill-surface-500 dark:fill-white/64 dark:[&_path]:fill-white/64"
        >
          <ng-container *ngComponentOutlet="item.logo"></ng-container>
        </div>

        <span
          class="text-surface-500 dark:text-white/64 text-lg font-semibold"
          >{{ item.label }}</span
        >
      </animated-container>
    </div>
  `,
})
export class StaticCustomers {
  @Input() className: any = "";

  twMerge = twMerge;

  staticCustomersData = [
    {
      logo: Mistranet,
      label: "Mistranet",
    },
    {
      logo: BriteMank,
      label: "BriteMank",
    },
    {
      logo: Limerantz,
      label: "Limerantz",
    },
    {
      logo: Streamlinz,
      label: "Streamlinz",
    },
    {
      logo: Trimzales,
      label: "Trimzales",
    },
  ];
}
