import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { twMerge } from "tailwind-merge";

@Component({
  selector: "app-logo",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div [class]="twMerge('font-semibold text-white', className)">Booking</div>
  `,
})
export class AppLogo {
  @Input() className: string = "";
  twMerge = twMerge;
}
