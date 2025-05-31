import { Component } from "@angular/core";
import { RealEstateBestProjects } from "./bestprojects";

@Component({
  selector: "real-estate-best-projects-second",
  standalone: true,
  imports: [RealEstateBestProjects],
  template: `
    <real-estate-best-projects
      [items]="[
        {
          image: '/pages/real-estate/best-project-4.jpg',
          title: 'First-Time Home Buying Tips',
          description:
            'Navigating the real estate market for the first time? Discover essential tips and advice to make your home buying experience smooth and successful.',
        },
        {
          image: '/pages/real-estate/best-project-5.jpg',
          title: 'Top 10 Home Renovation Trends of 2025',
          description:
            'Stay ahead of the curve with the latest home renovation trends. From smart home technology to sustainable materials, find out what’s hot this year.',
        },
        {
          image: '/pages/real-estate/best-project-6.jpg',
          title: 'Local Real Estate Market Guide',
          description:
            'Gain insights into the local real estate market with our comprehensive guide. Learn about market trends, pricing strategies, and the best times to buy.',
        },
      ]"
    />
  `,
})
export class RealEstateBestProjectsSecond {}
