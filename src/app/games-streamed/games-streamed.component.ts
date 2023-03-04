import { Component } from '@angular/core';

import {gamesPlayed} from "./games-played";

@Component({
  selector: 'app-games-streamed',
  templateUrl: './games-streamed.component.html',
  styleUrls: ['./games-streamed.component.css'],
})
export class GamesStreamedComponent  {
  // gameSlides = gameSlides;
  gameSlides: any[] | undefined;
  // gameSlides2:any[] | undefined;
  gamesPlayed = gamesPlayed;

  constructor() {
    this.createGameSlides();
}

  createGameSlides() {
    this.gameSlides = this.gamesPlayed.map((game: { img: any; }) => {
      return {img:game.img};
    });
  }


}
