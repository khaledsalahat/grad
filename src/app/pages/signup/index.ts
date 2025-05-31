import { Component, computed, inject } from "@angular/core";
import { CirclePattern } from "@/layout/components/circlepattern";
import { AppNavbar } from "@/layout/components/app.navbar";
import { InputTextModule } from "primeng/inputtext";
import { FormsModule } from "@angular/forms";
import { CheckboxModule } from "primeng/checkbox";
import { CommonModule } from "@angular/common";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { GenesisLogo } from "@/layout/components/icon/shapes/genesislogo";
import { IconGoogle } from "@/layout/components/icon/google";
import { IconApple } from "@/layout/components/icon/apple";
import { LayoutService } from "@/layout/service/layout.service";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "@/layout/service/auth.service";
import { forkJoin } from "rxjs";

@Component({
  selector: "signup",
  standalone: true,
  imports: [
    CommonModule,
    AnimatedContainer,
    CirclePattern,
    AppNavbar,
    InputTextModule,
    FormsModule,
    CheckboxModule,
    GenesisLogo,
    IconGoogle,
    IconApple,
    RouterLink,
  ],
  template: ` <animated-container
    [className]="isWide() ? 'bg-main-gradient shadow-black-card' : 'pt-6'"
  >
    <div class="container">
      <div
        [ngClass]="{
          'relative overflow-hidden': true,
          'bg-main-gradient rounded-3xl lg:rounded-4xl shadow-black-card':
            !isWide(),
        }"
      >
        <circle-pattern
          className="w-[82rem] absolute -bottom-1/2 translate-y-24 left-1/2 -translate-x-1/2 lg:block hidden"
        />
        <div class="relative z-20 px-6">
          <app-navbar />
          <div class="pb-6 pt-10 lg:py-24 max-w-[48rem] mx-auto">
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
                Sign Up
              </h1>
              <p class="text-xl text-white/64 text-center mt-6">
                Enter your details to create a new account.
              </p>
              <div class="flex flex-col gap-8 mt-16">
                <div class="flex md:flex-row flex-col items-center gap-4">
                  <button class="md:flex-1 w-full button-blur">
                    <IconGoogle />
                    Sign up with Google
                  </button>
                  <button class="md:flex-1 w-full button-blur">
                    <IconApple />
                    Sign up with Apple
                  </button>
                </div>
                <div class="flex items-center gap-3.5 py-1">
                  <div
                    class="flex-1 h-px bg-[linear-gradient(270deg,rgba(255,255,255,0.34)_0%,rgba(255,255,255,0.00)_100%)]"
                  ></div>
                  <span class="text-white/72">or</span>
                  <div
                    class="flex-1 h-px bg-[linear-gradient(90deg,rgba(255,255,255,0.34)_0%,rgba(255,255,255,0.00)_100%)]"
                  ></div>
                </div>
                <div
                  *ngIf="errorMessage"
                  class="text-red-400 text-center mb-4 p-4 rounded-lg bg-red-900/20"
                >
                  {{ errorMessage }}
                </div>

                <div
                  *ngIf="successMessage"
                  class="text-green-400 text-center mb-4 p-4 rounded-lg bg-green-900/20"
                >
                  {{ successMessage }}
                  <a
                    routerLink="/signin"
                    class="underline text-primary-400 hover:text-primary-300 transition-colors"
                  >
                    Login here
                  </a>
                </div>
                <div class="flex flex-col gap-2">
                  <label for="signup_username" class="text-surface-0">
                    Username
                  </label>
                  <input
                    pInputText
                    id="signup_username"
                    [(ngModel)]="username"
                    class="!bg-white/16 !rounded-full !py-2 !px-4 outline-none !text-white/90 backdrop-blur-[48px] !border-white/12 placeholder:!text-surface-0/60 !shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]"
                    name="username"
                  />
                </div>
                <div class="flex flex-col gap-2">
                  <label for="signup_email" class="text-surface-0">
                    Email Address
                  </label>
                  <input
                    pInputText
                    id="signup_email"
                    [(ngModel)]="email"
                    class="!bg-white/16 !rounded-full !py-2 !px-4 outline-none !text-white/90 backdrop-blur-[48px] !border-white/12 placeholder:!text-surface-0/60 !shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]"
                    name="email"
                  />
                </div>
                <div class="flex flex-col gap-2">
                  <label for="signup_password" class="text-surface-0">
                    Password
                  </label>
                  <input
                    pInputText
                    id="signup_password"
                    [(ngModel)]="password"
                    class="!bg-white/16 !rounded-full !py-2 !px-4 outline-none !text-white/90 backdrop-blur-[48px] !border-white/12 placeholder:!text-surface-0/60 !shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]"
                    name="password"
                    type="password"
                  />
                </div>
                
                <div class="flex flex-col gap-2">
                  <label for="signup_confirm_password" class="text-surface-0">
                    Confirm Password
                  </label>
                  <input
                    pInputText
                    id="signup_confirm_password"
                    [(ngModel)]="confirmPassword"
                    class="!bg-white/16 !rounded-full !py-2 !px-4 outline-none !text-white/90 backdrop-blur-[48px] !border-white/12 placeholder:!text-surface-0/60 !shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]"
                    name="confirmPassword"
                    type="password"
                  />
                </div>
                <div class="flex flex-col gap-2">
                  <label for="signup_fullname" class="text-surface-0">
                    Full Name
                  </label>
                  <input
                    pInputText
                    id="signup_fullname"
                    [(ngModel)]="fullName"
                    class="!bg-white/16 !rounded-full !py-2 !px-4 outline-none !text-white/90 backdrop-blur-[48px] !border-white/12 placeholder:!text-surface-0/60 !shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]"
                    name="fullName"
                  />
                </div>
                <div class="flex flex-col gap-2">
                  <label for="signup_phone" class="text-surface-0">
                    Phone Number
                  </label>
                  <input
                    pInputText
                    id="signup_phone"
                    [(ngModel)]="phoneNumber"
                    class="!bg-white/16 !rounded-full !py-2 !px-4 outline-none !text-white/90 backdrop-blur-[48px] !border-white/12 placeholder:!text-surface-0/60 !shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]"
                    name="phoneNumber"
                  />
                </div>
                <div class="flex items-center gap-2">
                  <p-checkbox
                    [(ngModel)]="isOwner"
                    binary
                    name="isOwner"
                    styleClass="!w-6 !h-6"
                  ></p-checkbox>
                  <span class="text-surface-0"
                    >I am an owner of a wedding hall or a chalet</span
                  >
                </div>
                <div class="flex items-center justify-between gap-2">
                  <div>
                    <label class="flex items-center gap-2">
                      <p-checkbox
                        [(ngModel)]="checked"
                        binary
                        name="checked"
                        styleClass="!w-6 !h-6"
                      />
                      <span class="font-semibold text-surface-0"
                        >I have read the
                      </span>
                      <span class="text-white/64">Terms and Conditions</span>
                    </label>
                  </div>
                  <a
                    routerLink="/reset-password"
                    class="font-semibold text-white/64 hover:text-white/90 transition-all"
                  >
                  </a>
                </div>
                <button type="submit" class="button-regular w-full py-3">
                  Sign Up
                </button>
                <div class="text-center">
                  <span class="text-white/64">Already have an account? </span>
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
  </animated-container>`,
  styles: `
    :host ::ng-deep {
      .p-checkbox-box {
        @apply text-white/90 !w-6 !h-6 !rounded-lg !bg-white/16 !border-white/12 backdrop-blur-[48px] !shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)];
      }
      .p-checkbox-icon {
        @apply text-white !leading-none  !text-xs !text-white;
      }
    }
  `,
})
export class Signup {
  username: string = "";
  email: string = "";
  password: string = "";
  confirmPassword: string = "";
  fullName: string = "";
  phoneNumber: string = "";
  isOwner: boolean = false;
  checked: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = "";
  successMessage: string = "";

  layoutService = inject(LayoutService);
  authService = inject(AuthService);
  router = inject(Router);

  isWide = computed(() => this.layoutService.isWide());

  onSubmit() {
    this.errorMessage = "";
    this.successMessage = "";
    this.isLoading = true;

    forkJoin([
      this.authService.checkEmailExists(this.email),
      this.authService.checkUsernameExists(this.username),
    ]).subscribe({
      next: ([emailExists, usernameExists]) => {
        if (emailExists) {
          this.errorMessage = "Email address is already registered";
          this.isLoading = false;
          return;
        }
        if (usernameExists) {
          this.errorMessage = "Username is already taken";
          this.isLoading = false;
          return;
        }

        if (this.password !== this.confirmPassword) {
          this.errorMessage = "Passwords do not match";
          this.isLoading = false;
          return;
        }

        const userData = {
          email: this.email,
          username: this.username,
          password: this.password,
          confirmPassword: this.confirmPassword,
          fullName: this.fullName,
          phoneNumber: this.phoneNumber,
          isOwner: this.isOwner,
        };

        this.authService.signup(userData).subscribe({
          next: (response) => {
            localStorage.setItem("userToken", response.token);
            if (response.user) {
              localStorage.setItem("userData", JSON.stringify(response.user));
            } else {
              localStorage.removeItem("userData");
            }
            this.successMessage =
              "Account created successfully! Redirecting...";
            setTimeout(() => this.router.navigate(["/dashboard"]), 2000);
          },
          error: (err) => {
            this.isLoading = false;
            this.errorMessage = this.handleSignupError(err);
          },
        });
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = "Error checking account availability";
      },
    });
  }

  private handleSignupError(error: any): string {
    if (error.message === "Email or username already exists") {
      return "The email or username is already in use. Please try a different one.";
    }
    if (error.status === 409) return "Email already exists";
    if (error.message.includes("email")) return "Invalid email format";
    return "Registration failed. Please try again.";
  }
}
