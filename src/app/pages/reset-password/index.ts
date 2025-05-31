import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { AppNavbar } from "@/layout/components/app.navbar";
import { CirclePattern } from "@/layout/components/circlepattern";
import { GenesisLogo } from "@/layout/components/icon/shapes/genesislogo";
import { LayoutService } from "@/layout/service/layout.service";
import { CommonModule } from "@angular/common";
import { Component, computed, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { InputTextModule } from "primeng/inputtext";

@Component({
  selector: "reset-password",
  standalone: true,
  imports: [
    CommonModule,
    AnimatedContainer,
    CirclePattern,
    AppNavbar,
    GenesisLogo,
    FormsModule,
    InputTextModule,
    RouterModule,
  ],
  template: `
    <animated-container [className]="isWide() ? 'bg-main-gradient ' : 'pt-6'">
      <div class="container">
        <div
          [ngClass]="{
            'relative overflow-hidden': true,
            'bg-main-gradient rounded-3xl lg:rounded-4xl shadow-black-card':
              !isWide(),
          }"
        >
          <circle-pattern
            class="w-[82rem] absolute -bottom-1/2 translate-y-80 left-1/2 -translate-x-1/2 lg:block hidden"
          />
          <div class="relative z-20 px-6">
            <app-navbar />
            <div class="py-24 max-w-[48rem] mx-auto">
              <form
                (ngSubmit)="onSubmit()"
                class="bg-white/4 px-6 md:px-8 pt-16 pb-12 border border-white/8 backdrop-blur-[48px] rounded-2.5xl lg:rounded-4xl shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]"
              >
                <div
                  class="flex items-center justify-center border border-white/8 w-[5.5rem] h-[5.5rem] mx-auto rounded-3xl bg-white/8 backdrop-blur-[48px] shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]"
                >
                  <IconShapesGenesisLogo className="w-10 h-10" />
                </div>
                <h1
                  class="text-3xl lg:text-6xl font-semibold text-surface-0 text-center mt-8"
                >
                  Forgot your password?
                </h1>
                <p
                  class="text-xl text-white/64 text-center mt-6 max-w-sm mx-auto"
                >
                  Enter your email address below and we&apos;ll get you back on
                  track.
                </p>
                <div class="flex flex-col gap-8 mt-16">
                  <div class="flex flex-col gap-2">
                    <label for="reset_password_email" class="text-surface-0">
                      Enter your email
                    </label>
                    <input
                      pInputText
                      id="reset_password_email"
                      [(ngModel)]="email"
                      type="email"
                      class="!bg-white/16 !rounded-full !py-2 !px-4 outline-none !text-white/90 backdrop-blur-[48px] !border-white/12 placeholder:!text-surface-0/60 !shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]"
                      name="email"
                    />
                  </div>
                  <button type="submit" class="button-regular w-full py-3">
                    Send Reset Link
                  </button>
                  <div class="text-center">
                    <span class="text-white/64">Back to </span>
                    <a
                      routerLink="/signin"
                      class="text-surface-0 font-semibold hover:opacity-90 transition-opacity"
                    >
                      Login
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </animated-container>
  `,
})
export class ResetPassword {
  layoutService = inject(LayoutService);

  isDarkTheme = computed(() => this.layoutService.isDarkTheme());

  isWide = computed(() => this.layoutService.isWide());

  email: string = "";

  onSubmit() {
    this.email = "";
  }
}
