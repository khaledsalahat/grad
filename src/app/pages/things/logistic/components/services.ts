import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { DeliveryTruck } from "@/layout/components/icon/deliverytruck";
import { Parcel } from "@/layout/components/icon/parcel";
import { Planes } from "@/layout/components/icon/planes";
import { Ship } from "@/layout/components/icon/ship";
import { Warehouse } from "@/layout/components/icon/warehouse";
import { WholeSaler } from "@/layout/components/icon/wholesaler";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: "logistic-services",
  standalone: true,
  imports: [AnimatedContainer, CommonModule],
  template: `
    <div class="container relative mt-64">
      <div
        class="h-[45rem] absolute left-2 right-2 rounded-4xl shadow-black-card overflow-hidden"
      >
        <div
          class="absolute inset-0 -z-1 bg-[linear-gradient(180deg,rgba(0,0,0,0.48)_0%,rgba(0,0,0,0.48)_49%,rgba(0,0,0,0.10)_100%)]"
        ></div>
        <img
          class="object-cover -z-2 left-0 absolute w-full h-full"
          src="/pages/logistic/services-background.jpg"
          alt="Logistic Services Image"
        />
      </div>
      <div class="pt-20">
        <div class="max-w-lg sm:mx-auto mx-10">
          <h1 class="text-3xl lg:text-5xl font-semibold text-surface-0">
            Optimize Your Supply Chain with Confidence
          </h1>
          <p class="mt-6 text-white/72 text-lg">
            Utilize our advanced logistics solutions to streamline your supply
            chain and enhance efficiency.
          </p>
        </div>
        <div
          class="mt-16 relative z-1 max-w-[70rem] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px mx-auto shadow-blue-card dark:shadow-black-card dark:bg-surface-800 bg-surface-200 rounded-4xl overflow-hidden"
        >
          <animated-container
            *ngFor="let item of logisticServicesData; let index = index"
            [delay]="index * 200"
            className="flex flex-col p-8 bg-surface-0 dark:bg-surface-950"
          >
            <div
              class="bg-main-gradient w-16 h-16 rounded-full flex items-center justify-center shadow-blue-card"
            >
              <ng-container *ngComponentOutlet="item.icon"></ng-container>
            </div>
            <h4
              class="text-2xl text-surface-950 dark:text-surface-0 font-semibold mt-6"
            >
              {{ item.title }}
            </h4>
            <p class="flex-1 text-surface-500 dark:text-white/64 mt-4">
              {{ item.description }}
            </p>
            <a
              routerLink=""
              class="flex items-center justify-between gap-6 mt-6 cursor-pointer group"
            >
              <span
                class="flex-1 text-surface-950 dark:text-surface-0 font-medium"
                >Read More</span
              >
              <i
                class="pi pi-arrow-right group-hover:translate-x-4 transition-all"
              ></i>
            </a>
          </animated-container>
        </div>
      </div>
      <div>
        <img
          class="w-full h-auto max-w-[72rem] mx-auto"
          src="/pages/logistic/services-containers.png"
          alt="Logistic Services Containers Image"
        />
      </div>
    </div>
  `,
})
export class LogisticServices {
  logisticServicesData = [
    {
      icon: Ship,
      title: "Ocean Freight",
      description:
        "Optimize your supply chain with our reliable ocean freight services. We ensure timely and efficient delivery of your goods across the globe, with comprehensive tracking and customs clearance support.",
      routerLink: "",
    },
    {
      icon: DeliveryTruck,
      title: "Land Freight",
      description:
        "Enhance your logistics operations with our robust land freight solutions. We offer flexible and cost-effective transportation options for your goods, ensuring safe and timely delivery.",
      routerLink: "",
    },
    {
      icon: Planes,
      title: "Air Freight",
      description:
        "Experience fast and secure air freight services with us. We provide expedited shipping solutions, handling everything from small parcels to large cargo, ensuring your goods reach their destination quickly.",
      routerLink: "",
    },
    {
      icon: Warehouse,
      title: "Warehousing",
      description:
        "Secure and manage your inventory with our state-of-the-art warehousing solutions. Our facilities are equipped with the latest technology to ensure the safety and efficiency of your storage needs.",
      routerLink: "",
    },
    {
      icon: WholeSaler,
      title: "Storage Solutions",
      description:
        "Optimize your inventory management with our comprehensive storage solutions. We offer both short-term and long-term storage options, ensuring your goods are well-protected and easily accessible.",
      routerLink: "",
    },
    {
      icon: Parcel,
      title: "Freight Forwarding",
      description:
        "Simplify your logistics with our expert transport services. We handle documentation, customs clearance, and delivery to ensure a smooth, efficient process.",
      routerLink: "",
    },
  ];
}
