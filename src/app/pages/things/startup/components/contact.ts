import { Component } from "@angular/core";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { InputTextModule } from "primeng/inputtext";
import { TextareaModule } from "primeng/textarea";
import { ButtonModule } from "primeng/button";

@Component({
  selector: "startup-contact",
  standalone: true,
  imports: [AnimatedContainer, InputTextModule, TextareaModule, ButtonModule],
  template: `
    <div class="container mt-24 lg:mt-64 pb-24 lg:pb-16">
      <div
        class="relative max-w-xl mx-auto lg:max-w-none px-10 pt-10 pb-40 lg:p-20 rounded-3xl lg:rounded-4xl bg-main-gradient mb-96 lg:mb-56"
      >
        <div class="lg:w-1/2">
          <h1 class="title lg:text-6xl text-3xl !leading-tight">
            Ready to Transform Your Business?
          </h1>
          <p class="text-lg lg:text-xl text-white/64 mt-4">
            Join us today and start leveraging our innovative solutions to drive
            growth and achieve your goals.
          </p>
        </div>
        <animated-container
          className="h-0 mt-10 lg:mt-0 lg:absolute lg:top-14 lg:right-14"
        >
          <form
            class="space-y-4 max-w-lg mx-auto lg:w-[32rem] p-6 lg:p-8 rounded-3xl lg:rounded-4xl shadow-blue-card dark:shadow-black-card bg-surface-0 dark:bg-surface-900"
          >
            <div class="flex items-start gap-6">
              <div class="flex-1 flex flex-col gap-2">
                <label class="font-medium text-surface-500">First Name</label>
                <input
                  pInputText
                  class="shadow-stroke !rounded-full py-1 px-4 min-h-10 !bg-transparent outline-none dark:!bg-surface-950"
                  fluid
                />
              </div>
              <div class="flex-1 flex flex-col gap-2">
                <label class="font-medium text-surface-500">Last Name</label>
                <input
                  pInputText
                  class="shadow-stroke !rounded-full py-1 px-4 min-h-10 !bg-transparent outline-none dark:!bg-surface-950"
                  fluid
                />
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <label class="font-medium text-surface-500">Email Address</label>
              <input
                pInputText
                class="shadow-stroke !rounded-full py-1 px-4 min-h-10 !bg-transparent outline-none dark:!bg-surface-950"
                fluid
              />
            </div>
            <div class="flex flex-col gap-2">
              <label class="font-medium text-surface-500">Phone Number</label>
              <input
                pInputText
                class="shadow-stroke !rounded-full py-1 px-4 min-h-10 !bg-transparent outline-none dark:!bg-surface-950"
                fluid
              />
            </div>
            <div class="flex flex-col gap-2">
              <label class="font-medium text-surface-500">Message</label>
              <textarea
                pTextarea
                class="shadow-stroke !rounded-2xl !p-3 min-h-10 resize-none !bg-transparent outline-none dark:!bg-surface-950"
                fluid
              ></textarea>
            </div>
            <button
              pButton
              class="!rounded-full !px-5 !py-2 !bg-main-gradient min-w-28 w-fit !gap-2 !font-medium !text-surface-0 hover:!opacity-80 transition-all h-14"
              label="Submit"
              fluid
            ></button>
          </form>
        </animated-container>
      </div>
    </div>
  `,
})
export class StartupContact {}
