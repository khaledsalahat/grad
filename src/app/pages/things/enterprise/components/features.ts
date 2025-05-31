import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { MagicBoxFade } from "@/layout/components/icon/magicboxfade";
import { ServerBoxIcon } from "@/layout/components/icon/serverbox";
import { CloudBoxIcon } from "@/layout/components/icon/cloudbox";
import { BrainBoxIcon } from "@/layout/components/icon/brainbox";
import { CryptoBoxIcon } from "@/layout/components/icon/cryptobox";
import { LifeBodyBoxIcon } from "@/layout/components/icon/lifebodybox";
import { ServerCloudBoxIcon } from "@/layout/components/icon/servercloudbox";

@Component({
  selector: "enterprise-features",
  standalone: true,
  imports: [CommonModule, AnimatedContainer, MagicBoxFade],
  template: `
    <div class="container lg:mt-40 mt-24">
      <div class="icon-box">
        <IconMagicBoxFade className="w-8 h-8 lg:w-10 lg:h-10" />
      </div>
      <h1
        class="text-3xl lg:text-5xl text-surface-950 dark:text-surface-0 font-semibold max-w-xs lg:max-w-lg text-center mx-auto mt-10"
      >
        Simplify Your Work with Our Standout Features
      </h1>
      <p
        class="mt-6 mx-auto max-w-md text-center text-lg lg:text-xl text-surface-500 dark:text-white/64"
      >
        Enhance your business processes and maximize efficiency with our
        enterprise-grade solutions.
      </p>
      <div class="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <animated-container
          *ngFor="let item of enterpriseFeaturesData; let index = index"
          [delay]="index * 200"
          className="p-8 border-0 dark:border border-white/12 shadow-stroke dark:shadow-none rounded-4xl"
        >
          <div class="icon-box ml-0">
            <div class="w-8 h-8 lg:w-10 lg:h-10">
              <ng-container *ngComponentOutlet="item.icon"></ng-container>
            </div>
          </div>
          <h5
            class="text-2xl text-surface-950 dark:text-surface-0 font-semibold mt-10"
          >
            {{ item.title }}
          </h5>
          <p class="mt-6 text-lg text-surface-500">{{ item.description }}</p>
        </animated-container>
      </div>
    </div>
  `,
})
export class EnterpriseFeatures {
  enterpriseFeaturesData = [
    {
      icon: ServerBoxIcon,
      title: "Advanced Data Analytics",
      description:
        "Gain insights into your business operations and make effective data-driven decisions.",
    },
    {
      icon: CloudBoxIcon,
      title: "Scalable Cloud Solutions",
      description:
        "Grow and adapt with our scalable and secure cloud infrastructure for enterprises.",
    },
    {
      icon: BrainBoxIcon,
      title: "Integrated ERP Systems",
      description:
        "Streamline your processes with integrated ERP systems designed to boost productivity.",
    },
    {
      icon: CryptoBoxIcon,
      title: "Robust Security Measures",
      description:
        "Protect your enterprise with advanced security features ensuring data safety.",
    },
    {
      icon: LifeBodyBoxIcon,
      title: "24/7 Customer Support",
      description:
        "Access our dedicated support team around the clock for any issues or questions.",
    },
    {
      icon: ServerCloudBoxIcon,
      title: "Customizable Solutions",
      description:
        "Tailor our solutions to meet the specific needs of your business efficiently.",
    },
  ];
}
