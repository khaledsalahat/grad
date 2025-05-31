import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { DatePickerModule } from "primeng/datepicker";
import { UIDropdownMenu } from "@/layout/components/UI/dropdownmenu";
import { UIDropdownMenuTrigger } from "@/layout/components/UI/dropdownmenutrigger";
import { UIDropdownMenuContent } from "@/layout/components/UI/dropdownmenucontent";
import { UIDropdownMenuItem } from "@/layout/components/UI/dropdownmenuitem";

interface DestinationType {
  id: string;
  label: string;
}

@Component({
  selector: "travel-destination-selector",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DatePickerModule,
    UIDropdownMenu,
    UIDropdownMenuTrigger,
    UIDropdownMenuContent,
    UIDropdownMenuItem,
  ],
  template: `
    <div
      class="-mt-12 bg-surface-0 dark:bg-surface-950 max-w-[68rem] w-[92%] lg:w-auto mx-auto shadow-blue-card dark:shadow-none border-0 dark:border border-white/12 rounded-4xl lg:rounded-full p-6 lg:p-10 flex flex-col lg:flex-row gap-4 relative z-50"
    >
      <ui-dropdown-menu className="lg:flex-1 lg:max-w-60">
        <ui-dropdown-menu-trigger className="border border-white/12">
          <span>{{ findDestination() }}</span>
          <i class="pi pi-map-marker ml-auto"></i>
        </ui-dropdown-menu-trigger>
        <ui-dropdown-menu-content>
          <ui-dropdown-menu-item
            *ngFor="let item of destinations"
            (click)="selectedDestination = item.id"
          >
            <span>{{ item.label }}</span>
          </ui-dropdown-menu-item>
        </ui-dropdown-menu-content>
      </ui-dropdown-menu>

      <p-datepicker
        placeholder="Arriving"
        showIcon
        iconDisplay="input"
        styleClass="lg:flex-1 !w-full"
        appendTo="body"
        inputStyleClass="!rounded-full  !px-4 !py-3 !transition-all hover:bg-surface-100 dark:hover:bg-surface-800 !shadow-stroke dark:!shadow-none !border-white/12 !text-inherit placeholder:!text-inherit"
      />
      <p-datepicker
        placeholder="Leaving"
        showIcon
        iconDisplay="input"
        styleClass="lg:flex-1 !w-full"
        appendTo="body"
        inputStyleClass="!rounded-full  !px-4 !py-3 !transition-all hover:bg-surface-100 dark:hover:bg-surface-800 !shadow-stroke dark:!shadow-none !border-white/12 !text-inherit placeholder:!text-inherit"
      />

      <ui-dropdown-menu className="lg:flex-1 lg:max-w-60">
        <ui-dropdown-menu-trigger className="border border-white/12">
          <i class="pi pi-map-marker"></i>
          <span>{{ findRoomQuest() }}</span>
        </ui-dropdown-menu-trigger>
        <ui-dropdown-menu-content>
          <ui-dropdown-menu-item
            *ngFor="let item of roomQuests"
            (click)="selectedRoom = item.id"
          >
            <span>{{ item.label }}</span>
          </ui-dropdown-menu-item>
        </ui-dropdown-menu-content>
      </ui-dropdown-menu>
      <button class="button-gradient w-full lg:w-auto">
        <i class="pi pi-search"></i>
        Search...
      </button>
    </div>
  `,
})
export class Selector {
  @Input() selectedDestination: string = "italy";
  @Input() selectedRoom: string = "1room2guest";

  destinations: DestinationType[] = [
    { id: "italy", label: "Italy, Roma" },
    { id: "turkey", label: "Turkey, Istanbul" },
    { id: "poland", label: "Poland, Warsaw" },
  ];

  roomQuests: DestinationType[] = [
    { id: "1room1guest", label: "1 Room, 1 Guest" },
    { id: "1room2guest", label: "1 Room, 2 Guests" },
  ];

  findDestination() {
    return this.destinations.find((x) => x.id === this.selectedDestination)
      ?.label;
  }

  findRoomQuest() {
    return this.roomQuests.find((x) => x.id === this.selectedRoom)?.label;
  }
}
