import { Component, inject, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { twMerge } from "tailwind-merge";

@Component({
  selector: "ui-dropdown-menu-trigger",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <button [ngClass]="containerClass">
      <ng-content></ng-content>
    </button>
  `,
})
export class UIDropdownMenuTrigger {
  @Input() className: string = "";

  get containerClass(): string {
    let baseClass =
      "w-full [&>span]:truncate flex items-center gap-2 px-4 py-3 rounded-full transition-all border-0 dark:border hover:bg-surface-100 dark:hover:bg-surface-800  shadow-stroke dark:shadow-none group-data-[open=true]:bg-surface-100/75 dark:group-data-[open=true]:bg-surface-800/75";

    return twMerge(baseClass, this.className);
  }
}
