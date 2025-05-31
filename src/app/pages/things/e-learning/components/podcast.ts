import { Component } from "@angular/core";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { CommonModule } from "@angular/common";
import { FileFade } from "@/layout/components/icon/filefade";
import { ELearningPodcastPlayer } from "./podcastplayer";

@Component({
  selector: "e-learning-podcasts",
  standalone: true,
  imports: [AnimatedContainer, CommonModule, FileFade, ELearningPodcastPlayer],
  template: `
    <div class="container mt-24 lg:mt-64">
      <div class="icon-box">
        <IconFileFade className="w-8 h-8 lg:w-10 lg:h-10" />
      </div>
      <h1
        class="mt-10 text-3xl lg:text-5xl font-semibold text-surface-950 dark:text-surface-0 max-w-md !leading-tight text-center mx-auto"
      >
        Navigating the Future of Education
      </h1>
      <p
        class="mt-6 text-lg text-surface-500 dark:text-white/64 max-w-lg mx-auto text-center"
      >
        Explore cutting-edge educational trends, innovative teaching strategies,
        and emerging technologies shaping the future of learning across diverse
        disciplines.
      </p>
      <div class="flex flex-col gap-16 mt-16 max-w-[60rem] mx-auto">
        <animated-container
          *ngFor="let item of podcastsData; let index = index"
          enterClass="animate-slidefadeinleft"
          [delay]="index * 200"
          className="flex md:flex-row flex-col items-start gap-5"
        >
          <div
            class="w-full md:w-56 h-56 md:aspect-square relative rounded-2xl overflow-hidden shadow-black-card"
          >
            <img
              class="object-cover w-full h-full"
              [src]="item.image"
              alt="Podcast Image"
            />
          </div>
          <div class="mt-2 flex-1">
            <span class="badge h-8">{{ item.badge }}</span>
            <h5
              class="mt-3 text-2xl font-semibold text-surface-950 dark:text-surface-0"
            >
              {{ item.title }}
            </h5>
            <p class="mt-3 text-lg text-surface-500 dark:text-white/64">
              {{ item.description }}
            </p>
            <e-learning-podcast-player />
          </div>
        </animated-container>
      </div>
    </div>
  `,
})
export class ELearningPodcasts {
  podcastsData = [
    {
      image: "/pages/e-learning/podcast-1.jpg",
      badge: "Education",
      title: "EduTech Talks",
      description:
        "We explore how technology is reshaping education systems and what classrooms of the future might look like",
    },
    {
      image: "/pages/e-learning/podcast-2.jpg",
      badge: "Education",
      title: "Learning Journey",
      description:
        "We discuss the benefits of learning at any age and the significance of continuous education for personal growth.",
    },
    {
      image: "/pages/e-learning/podcast-3.jpg",
      badge: "Education",
      title: "Education Equity",
      description:
        "We examine the barriers to educational equity and explore innovative solutions being developed to overcome these challenges.",
    },
  ];
}
