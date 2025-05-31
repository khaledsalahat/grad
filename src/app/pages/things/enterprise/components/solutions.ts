import { Component } from "@angular/core";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { CommonModule } from "@angular/common";

@Component({
  selector: "enterprise-solutions",
  standalone: true,
  imports: [AnimatedContainer, CommonModule],
  template: `
    <animated-container className="container mt-24 lg:mt-64">
      <div
        class="bg-main-gradient relative rounded-3xl lg:rounded-4xl shadow-black-card px-4 py-14 lg:p-20 flex flex-col gap-18"
      >
        <div
          class="flex lg:flex-row flex-col items-center justify-between gap-16 lg:gap-0"
        >
          <div class="flex-1">
            <img
              class="w-[295px] h-auto mx-auto"
              src="/pages/enterprise/solutions-img-1.png"
              alt="Solution Image"
            />
          </div>
          <div class="">
            <span class="badge dark:bg-surface-0 dark:text-surface-950"
              >Business</span
            >
            <h2
              class="text-3xl lg:text-5xl font-semibold title max-w-lg mt-4 !leading-tight"
            >
              Empower with Innovative Solutions
            </h2>
            <p class="text-lg text-white/64 mt-6 max-w-md">
              Use advanced technologies and strategies to drive your business
              and achieve growth.
            </p>
            <ul class="flex flex-col gap-3.5 mt-8">
              <li class="inline-flex items-center gap-3 text-white/64">
                <i class="pi pi-check-circle"></i>
                <span class="text-lg">Advanced Data Analytics</span>
              </li>
              <li class="inline-flex items-center gap-3 text-white/64">
                <i class="pi pi-check-circle"></i>
                <span class="text-lg">Scalable Cloud Solutions</span>
              </li>
              <li class="inline-flex items-center gap-3 text-white/64">
                <i class="pi pi-check-circle"></i>
                <span class="text-lg">Customizable ERP Systems</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="border-t border-dashed border-white/16 w-full h-px"></div>
        <div
          class="lg:pl-4 flex lg:flex-row flex-col-reverse items-center justify-between gap-16 lg:gap-0"
        >
          <div>
            <span class="badge dark:bg-surface-0 dark:text-surface-950"
              >Business</span
            >
            <h2
              class="text-3xl lg:text-5xl font-semibold title max-w-lg mt-4 !leading-tight"
            >
              Achieve More with Scalable Solutions
            </h2>
            <p class="text-lg text-white/64 mt-6 max-w-md">
              Adapt and grow your business effortlessly with our scalable
              solutions, ensuring your enterprise can meet any challenge
              head-on.
            </p>
            <ul class="flex flex-col gap-3.5 mt-8">
              <li class="inline-flex items-center gap-3 text-white/64">
                <i class="pi pi-check-circle"></i>
                <span class="text-lg">Scalable Cloud Infrastructure</span>
              </li>
              <li class="inline-flex items-center gap-3 text-white/64">
                <i class="pi pi-check-circle"></i>
                <span class="text-lg">Real-Time Data Analytics</span>
              </li>
              <li class="inline-flex items-center gap-3 text-white/64">
                <i class="pi pi-check-circle"></i>
                <span class="text-lg">Comprehensive Backup Systems</span>
              </li>
            </ul>
          </div>
          <div class="flex-1">
            <img
              class="w-[440px] h-auto mx-auto"
              src="/pages/enterprise/solutions-img-2.png"
              alt="Solution Image"
            />
          </div>
        </div>
      </div>
    </animated-container>
  `,
})
export class EnterpriseSolutions {}
