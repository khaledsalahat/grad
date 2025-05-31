import { Component } from "@angular/core";

@Component({
  selector: "Wavelength",
  standalone: true,
  template: `
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 0C7.16344 0 0 7.16344 0 16C8.83656 16 16 8.83656 16 0Z"
        fill="white"
      />
      <path
        d="M16 32C24.8366 32 32 24.8366 32 16C23.1634 16 16 23.1634 16 32Z"
        fill="white"
      />
      <path
        d="M16 0C24.8366 0 32 7.16344 32 16C23.1634 16 16 8.83656 16 0Z"
        fill="white"
      />
      <path
        d="M16 32C7.16344 32 -7.72516e-07 24.8366 0 16C8.83656 16 16 23.1634 16 32Z"
        fill="white"
      />
    </svg>
  `,
})
export class Wavelength {}
