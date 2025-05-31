import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { twMerge } from "tailwind-merge";

@Component({
  selector: "ui-dropdown-menu-item",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <button
      [ngClass]="
        twMerge(
          'py-2 px-3 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 cursor-pointer flex items-center text-left gap-2 [&>span]:truncate',
          className
        )
      "
    >
      <ng-content></ng-content>
    </button>
  `,
  host: {
    "[style.display]": "'contents'",
  },
})
export class UIDropdownMenuItem {
  @Input() className: string = "";

  twMerge = twMerge;
}
