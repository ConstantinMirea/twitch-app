import { Component, OnInit } from '@angular/core';
import { UpdateService } from '../admin-page/update.service';

interface GamePlayed {
  id: string;
  img: string;
  game: string;
  link?: string;
}

@Component({
  selector: 'app-games-streamed',
  templateUrl: './games-streamed.component.html',
  styleUrls: ['./games-streamed.component.css'],
})
export class GamesStreamedComponent implements OnInit {
  gameSlides: { img: string }[] = [];
  gamesPlayed: GamePlayed[] = [];

  constructor(private updateService: UpdateService) {}

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames(): void {
    this.updateService.returnGames().then((docs) => {
      const games: GamePlayed[] = [];
      docs.forEach((doc) => {
        games.push({ ...doc.data(), id: doc.id } as GamePlayed);
      });
      this.gamesPlayed = games;
      this.gameSlides = this.gamesPlayed.map((game) => ({ img: game.img }));
    });
  }
}
