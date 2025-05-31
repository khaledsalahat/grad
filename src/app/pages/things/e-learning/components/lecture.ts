import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { IconPlay2 } from "@/layout/components/icon/play2";
import { YoutubeFade } from "@/layout/components/icon/youtubefade";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AvatarModule } from "primeng/avatar";
import { DialogModule } from "primeng/dialog";

@Component({
  selector: "e-learning-video-lecture",
  standalone: true,
  imports: [
    AnimatedContainer,
    CommonModule,
    AvatarModule,
    IconPlay2,
    YoutubeFade,
    DialogModule,
    FormsModule,
  ],
  template: `
    <animated-container className="mt-24 lg:mt-64 container">
      <div class="icon-box">
        <IconYoutubeFade className="w-9 h-9 lg:w-11 lg:h-11" />
      </div>
      <h1
        class="text-3xl lg:text-5xl font-semibold text-surface-950 dark:text-surface-0 mx-auto text-center mt-10"
      >
        Video Lecture Hub
      </h1>
      <p
        class="mt-6 text-lg text-surface-500 dark:text-white/64 mx-auto text-center"
      >
        Expert-led lectures across diverse subjects to expand your knowledge.
      </p>
      <div
        class="mt-16 relative h-[32rem] lg:h-[43.5rem] w-full rounded-2xl lg:rounded-4xl overflow-hidden shadow-black-card cursor-pointer group"
      >
        <div
          class="absolute flex items-center justify-center inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.24)_0%,rgba(0,0,0,0.24)_100%)]"
        >
          <button
            class="w-24 h-24 rounded-full flex items-center justify-center bg-white/12 group-hover:bg-white/24 transition-all backdrop-blur-[5px] border border-white/32"
            (click)="openDialog()"
          >
            <IconPlay2 />
          </button>
        </div>
        <img
          class="object-cover -z-2 absolute top-0 bottom-0 right-0 left-0 w-full h-full"
          src="/pages/e-learning/video-lecture-bg.jpg"
          alt="E-learning Video Lecture Background"
        />
      </div>
    </animated-container>
    <p-dialog
      [(visible)]="isVisible"
      modal
      header="Video"
      styleClass="lg:w-1/2 sm:w-11/12"
    >
      <iframe
        class="aspect-video w-full rounded-xl overflow-hidden"
        src="https://www.youtube.com/embed/DHqNzO1kj2o"
        title="Cagatay Civici - PrimeVue | The Next-Gen UI Component Library - Vuejs Amsterdam 2024"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </p-dialog>
  `,
  styles: `
    :host ::ng-deep .p-dialog-close-button {
      width: 2rem !important;
      height: 2rem !important;
      border-radius: 0.5rem !important;
    }
  `,
})
export class ELearningVideoLecture {
  isVisible: boolean = false;

  openDialog() {
    this.isVisible = true;
  }
}
