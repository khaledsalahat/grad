import { Component, computed, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { LayoutService } from "@/layout/service/layout.service";
import { AppNavbar } from "./app.navbar";
import { AnimatedContainer } from "./animatedcontainer";

@Component({
  selector: "account-layout",
  standalone: true,
  imports: [CommonModule, RouterModule, AppNavbar, AnimatedContainer],
  template: `
    <animated-container [className]="isWide() ? 'bg-main-gradient' : 'pt-6'">
      <div class="container">
        <div
          [class]="
            isWide() ? '' : 'bg-main-gradient rounded-3xl lg:rounded-4xl'
          "
        >
          <app-navbar />
          <div class="pt-16 pb-6 lg:pb-52 max-w-[55rem] mx-auto">
            <div class="mt-12">
              <router-outlet />
            </div>
          </div>
        </div>
      </div>
    </animated-container>
  `,
})
export class AccountLayout {
  layoutService = inject(LayoutService);
  isWide = computed(() => this.layoutService.isWide());
}
