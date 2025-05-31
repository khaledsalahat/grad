import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { DatePickerModule } from "primeng/datepicker";
import { UIDropdownMenu } from "@/layout/components/UI/dropdownmenu";
import { UIDropdownMenuTrigger } from "@/layout/components/UI/dropdownmenutrigger";
import { UIDropdownMenuContent } from "@/layout/components/UI/dropdownmenucontent";
import { UIDropdownMenuItem } from "@/layout/components/UI/dropdownmenuitem";
import { FormsModule } from "@angular/forms";

interface DestinationType {
  id: string;
  label: string;
}

@Component({
  selector: "wedding-hall-selector",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DatePickerModule,
    UIDropdownMenu,
    UIDropdownMenuTrigger,
    UIDropdownMenuContent,
    UIDropdownMenuItem,
    FormsModule,
  ],
  template: `
    <div
      class="-mt-12 bg-surface-0 dark:bg-surface-950 max-w-[40rem] w-[92%] lg:w-auto mx-auto shadow-blue-card dark:shadow-none border-0 dark:border border-white/12 rounded-4xl lg:rounded-full p-6 lg:p-10 flex flex-col lg:flex-row gap-4 relative z-30"
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
        placeholder="Date"
        showIcon
        iconDisplay="input"
        styleClass="lg:flex-1 !w-full"
        appendTo="body"
        inputStyleClass="!rounded-full !px-4 !py-3 !transition-all hover:bg-surface-100 dark:hover:bg-surface-800 !shadow-stroke dark:!shadow-none !border-white/12 !text-inherit placeholder:!text-inherit"
        (onSelect)="onDateChange($event)"
        [(ngModel)]="selectedDate"
      />
      <button class="button-gradient w-full lg:w-auto" (click)="emitFilters()">
        <i class="pi pi-search"></i>
        Search...
      </button>
    </div>
  `,
})
export class Selector {
  @Input() selectedDestination: string = "Jericho";
  @Output() filtersChanged = new EventEmitter<{
    location: string;
    date: Date;
  }>();
  selectedDate?: Date;

  destinations: DestinationType[] = [
    { id: "Nablus", label: "Nablus" },
    { id: "Jericho", label: "Jericho" },
    { id: "Jenin", label: "Jenin" },
    { id: "Ramallah", label: "Ramallah" },
  ];

  findDestination() {
    return this.destinations.find((x) => x.id === this.selectedDestination)
      ?.label;
  }

  onDateChange(date: Date) {
    this.selectedDate = date;
  }

  emitFilters() {
    if (this.selectedDestination && this.selectedDate) {
      this.filtersChanged.emit({
        location: this.selectedDestination,
        date: this.selectedDate,
      });
    }
  }
}
