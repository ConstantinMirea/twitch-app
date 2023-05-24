import { Component } from '@angular/core';
import { UpdateService } from '../admin-page/update.service';

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
  // gamesPlayed = gamesPlayed;
  gamesPlayed: any[] = [];

  constructor(private updateService: UpdateService) {
this.loadGames()
    // this.createGameSlides();
}

  createGameSlides() {
    this.gameSlides = this.gamesPlayed.map((game: { img: any; }) => {
      return {img:game.img};
    });
  }

  loadGames() {
    this.updateService.returnGames().then((docs) => {
      docs.forEach((ex) => {
        this.gamesPlayed.push({ ...ex.data(), id: ex.id });
      });
      console.log(gamesPlayed);
      this.gameSlides = this.gamesPlayed.map((game: { img: any; }) => {
        return {img:game.img};
      });
    });
  }
}
