import { Component } from '@angular/core';
import { rigSlides } from './my-rigs';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css'],
})
export class AboutMeComponent {
  rigSlides = rigSlides;
  systemSpecs = 'Click to show system specs';
  rigNumber = 0;

  showSystemSpecs(event: number): void {
    this.systemSpecs = rigSlides[event].spec;
    this.rigNumber = event;
  }
}
