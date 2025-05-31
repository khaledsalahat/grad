import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { twMerge } from "tailwind-merge";
import { AvatarModule } from "primeng/avatar";

@Component({
  selector: "testimonials-card",
  standalone: true,
  imports: [CommonModule, AvatarModule],
  template: ` <div
    [class]="
      twMerge(
        'p-6 border border-surface-200 dark:border-surface-700 rounded-3xl',
        className
      )
    "
  >
    <p class="text-surface-500">{{ item.text }}</p>
    <div class="mt-6 flex items-center gap-4">
      <p-avatar
        *ngIf="item.avatar"
        [image]="item.avatar"
        class="border border-surface-200"
        size="xlarge"
        shape="circle"
      />
      <div class="flex flex-col gap-1 flex-1">
        <span
          class="text-lg font-semibold text-surface-950 dark:text-surface-0"
          >{{ item.name }}</span
        >
        <span class="text-surface-500 dark:text-white/64">{{ item.job }}</span>
      </div>
    </div>
  </div>`,
})
export class TestimonialsCard {
  twMerge = twMerge;

  @Input() className: string = "";

  @Input() item!: {
    avatar?: string;
    name: string;
    job: string;
    text: string;
  };
}
