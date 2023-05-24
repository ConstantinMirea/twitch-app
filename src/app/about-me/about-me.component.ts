import { Component } from '@angular/core';
import { rigSlides } from './my-rigs';
import { GamesApiService } from '../services/games-api.service';
import { Game, LatestGames } from '../services/api-models';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css'],
})
export class AboutMeComponent {
  rigSlides = rigSlides;
  systemSpecs = 'Click to show system specs';
  rigNumber = 0;


  constructor(private gamesApiService: GamesApiService) {
  
  }

  showSystemSpecs(event: any) {
    console.log(rigSlides[event].spec);
    this.systemSpecs = rigSlides[event].spec;
    this.rigNumber = +event;
  }



}
