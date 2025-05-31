import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { twMerge } from "tailwind-merge";
import { AlphaHex } from "./icon/customers/alphahex";
import { BriteMank } from "./icon/customers/britemank";
import { Limerantz } from "./icon/customers/limerantz";
import { Mistranet } from "./icon/customers/mistranet";
import { Streamlinz } from "./icon/customers/streamlinz";
import { Trimzales } from "./icon/customers/trimzales";
import { Wavelength } from "./icon/customers/wavelength";
import { ZenTrailMs } from "./icon/customers/zentrailms";

@Component({
  selector: "floating-customers",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `<div
    [ngClass]="
      twMerge(
        'w-full flex flex-nowrap gap-6 overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_white_128px,_white_calc(100%-128px),transparent_100%)]',
        className
      )
    "
  >
    <div
      *ngFor="let i of [1, 2]"
      class="flex flex-nowrap items-center justify-center md:justify-start animate-infinite-scroll"
    >
      <div
        *ngFor="let data of floatingCustomersData; let j = index"
        class="w-44 flex items-center flex-nowrap justify-center h-auto gap-4"
      >
        <ng-container *ngIf="data.logo">
          <div [class]="twMerge('w-10 h-10 object-cover', iconClass)">
            <ng-container *ngComponentOutlet="data.logo"></ng-container>
          </div>
        </ng-container>

        <span
          [ngClass]="twMerge('font-semibold text-white/56 text-lg', labelClass)"
        >
          {{ data.label }}
        </span>
      </div>
    </div>
  </div> `,
})
export class FloatingCustomers {
  @Input() className?: string;
  @Input() iconClass?: string;
  @Input() labelClass?: string;
  twMerge = twMerge;

  floatingCustomersData = [
    {
      logo: Trimzales,
      label: "Trimzales",
    },
    {
      logo: ZenTrailMs,
      label: "ZenTrailMs",
    },
    {
      logo: Wavelength,
      label: "Wavelength",
    },
    {
      logo: AlphaHex,
      label: "AlphaHex",
    },
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
  ];
}
