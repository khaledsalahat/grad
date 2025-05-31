import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  Input,
  signal,
  ViewChild,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { twMerge } from "tailwind-merge";

@Component({
  selector: "ui-dropdown-menu",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div
      #dropdownMenu
      [ngClass]="twMerge('relative z-50 group', className)"
      (click)="toggleOpen()"
      [attr.data-open]="isOpen()"
    >
      <ng-content></ng-content>
    </div>
  `,
  host: {
    "[style.display]": "'contents'",
  },
})
export class UIDropdownMenu {
  @Input() className: string = "";

  twMerge = twMerge;

  @ViewChild("dropdownMenu", { static: false }) dropdownMenuRef:
    | ElementRef
    | undefined;

  isOpen = signal(false);

  outsideClickListener: ((event: MouseEvent) => void) | null = null;

  constructor() {
    effect(() => {
      if (this.isOpen()) {
        this.bindOutsideClickListener();
      } else {
        this.unbindOutsideClickListener();
      }
    });
  }

  toggleOpen() {
    this.isOpen.update((value) => !value);
  }

  bindOutsideClickListener() {
    if (!this.outsideClickListener) {
      this.outsideClickListener = (event: MouseEvent) => {
        if (this.isOutsideClicked(event)) {
          this.toggleOpen();
        }
      };

      setTimeout(() => {
        document.addEventListener(
          "click",
          this.outsideClickListener as EventListener,
        );
      }, 0);
    }
  }

  unbindOutsideClickListener() {
    if (this.outsideClickListener) {
      document.removeEventListener("click", this.outsideClickListener);
      this.outsideClickListener = null;
    }
  }

  isOutsideClicked(event: MouseEvent): boolean {
    if (!this.dropdownMenuRef) return true;
    return !this.dropdownMenuRef.nativeElement.contains(event.target);
  }

  ngOnDestroy() {
    this.unbindOutsideClickListener();
  }
}
