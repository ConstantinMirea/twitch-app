import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';

interface Slide {
  img: string;
  spec?: string;
  [key: string]: any;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate('30ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class CarouselComponent {
  @Input() slides: Slide[] = [];
  currentSlide = 0;
  @Output() slideClicked = new EventEmitter<number>();

  onNextClick(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.slideClicked.emit(this.currentSlide);
  }

  onPreviousClick(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.slideClicked.emit(this.currentSlide);
  }
}
