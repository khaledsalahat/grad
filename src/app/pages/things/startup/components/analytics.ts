import { Component } from "@angular/core";
import { Cloudfade } from "@/layout/components/icon/cloudfade";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";

@Component({
  selector: "startup-analytics",
  standalone: true,
  imports: [Cloudfade, AnimatedContainer],
  template: `
    <div class="container mt-24 lg:mt-64">
      <div class="icon-box">
        <IconCloudFade className="w-9 h-9 lg:w-11 lg:h-11" />
      </div>
      <h1
        class="text-3xl lg:text-5xl text-surface-950 dark:text-surface-0 font-semibold max-w-xs lg:max-w-lg text-center mx-auto mt-10"
      >
        Unlock Growth with Powerful Analytics
      </h1>
      <p
        class="mt-6 mx-auto max-w-lg text-center text-lg lg:text-xl text-surface-500 dark:text-white/64"
      >
        Unlock the potential of your data with our tools, offering deep insights
        and actionable information for growth.
      </p>
      <div class="mt-14 flex lg:flex-row flex-col items-center gap-6">
        <animated-container
          className="lg:flex-1 overflow-hidden rounded-3xl lg:rounded-4xl bg-main-gradient relative h-[33rem] w-full max-w-[27rem]"
        >
          <img
            class="absolute max-w-none w-auto h-[289px] top-[24px] lg:top-[28px] left-[24px] lg:left-[28px] [filter:drop-shadow(0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06))]"
            src="/pages/startup/analytic-img-1.png"
            alt="Analytic Card Image"
          />
          <div class="absolute inset-x-7 lg:inset-x-8 bottom-8">
            <h5 class="text-xl title">Real-Time Data Monitoring</h5>
            <p class="mt-4 text-white/64">
              Keep track of your key metrics and performance indicators in
              real-time for proactive
            </p>
          </div>
        </animated-container>
        <animated-container
          [delay]="400"
          className="lg:flex-1 overflow-hidden rounded-3xl lg:rounded-4xl bg-main-gradient relative h-[33rem] w-full max-w-[27rem]"
        >
          <img
            class="absolute max-w-none h-[340px] w-auto top-0 left-[24px] lg:left-[28px]"
            src="/pages/startup/analytic-img-2.png"
            alt="Analytic Card Image"
          />
          <div class="absolute inset-x-7 lg:inset-x-8 bottom-8">
            <h5 class="text-xl title">Customizable Dashboards</h5>
            <p class="mt-4 text-white/64">
              Tailor your dashboard to display the most relevant data for your
              business needs and preferences.
            </p>
          </div>
        </animated-container>
        <animated-container
          [delay]="800"
          className="lg:flex-1 overflow-hidden rounded-3xl lg:rounded-4xl bg-main-gradient relative h-[33rem] w-full max-w-[27rem]"
        >
          <img
            class="absolute max-w-none h-[289px] w-auto top-[24px] lg:top-[28px] left-[24px] lg:left-[28px] [filter:drop-shadow(0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06))]"
            src="/pages/startup/analytic-img-3.png"
            alt="Analytic Card Image"
          />
          <div class="absolute inset-x-7 lg:inset-x-8 bottom-8">
            <h5 class="text-xl title">Automated Reporting</h5>
            <p class="mt-4 text-white/64">
              Generate detailed reports automatically to save time and gain
              valuable insights manual effort.
            </p>
          </div>
        </animated-container>
      </div>
    </div>
  `,
})
export class StartupAnalytics {}
