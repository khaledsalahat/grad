import { Component, computed, forwardRef, inject, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { twMerge } from "tailwind-merge";
import { UIDropdownMenu } from "./dropdownmenu";

@Component({
  selector: "ui-dropdown-menu-content",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div
      [ngClass]="
        twMerge(
          'absolute top-[calc(100%+1rem)] z-[999999] min-w-full w-full left-0 flex flex-col transition-all ease-in-out duration-100 bg-surface-0 dark:bg-surface-950 p-1 rounded-lg shadow-stroke dark:shadow-none border-0 dark:border border-white/12',
          isOpen()
            ? 'opacity-100 scale-100'
            : 'opacity-0 pointer-events-none scale-95',
          className
        )
      "
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class UIDropdownMenuContent {
  @Input() className: string = "";

  twMerge = twMerge;

  dropdownMenu = inject(forwardRef(() => UIDropdownMenu));

  isOpen = computed(() => this.dropdownMenu.isOpen());
}
