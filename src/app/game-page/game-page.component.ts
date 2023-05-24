import { Component, OnDestroy, OnInit } from '@angular/core';
import { GamesApiService } from '../services/games-api.service';
import { Game } from '../services/api-models';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit, OnDestroy {
  routeSubscription!: Subscription
  allGames!: Game[];
  selectedGame!: Game

  constructor(private gameService: GamesApiService, private route: ActivatedRoute) {
    this.gameService.getGames2().subscribe(
      res => {
        this.allGames = res;
        this.routeSubscription = this.route.params.subscribe(({ id }) => {
          this.allGames.filter(game => {
            if (game.id === +id) {
              this.selectedGame = game;
              this.getGameScreenshots();
            }
          })
        });
      }
    )

    // this.gameService.onGamesCreated.subscribe(newGames => {this.allGames = newGames
    // console.log(this.allGames);})
  }

  ngOnInit(): void {
  }


  getGameScreenshots() {
    let screenshots = `(${this.selectedGame.screenshots.toString()})`;
    this.gameService.getGameScreenshots(screenshots).subscribe(res => {
      this.selectedGame.screenshots = res.map((screenshot:any) =>screenshot.url = screenshot.url.replace('thumb', '720p'));
      // this.selectedGame.screenshots.forEach((res:any) => res.url = res.url.replace('thumb', '720p'))
      console.log(res);
    });
  }
  ngOnDestroy(): void {

  }
}
