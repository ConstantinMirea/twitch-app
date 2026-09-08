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
  routeSubscription!: Subscription;
  gamesSubscription!: Subscription;
  allGames: Game[] = [];
  selectedGame: Game | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(private gameService: GamesApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.gamesSubscription = this.gameService.getGames2().subscribe({
      next: (res) => {
        this.allGames = res;
        this.isLoading = false;
        this.routeSubscription = this.route.params.subscribe(({ id }) => {
          this.selectedGame = null;
          const game = this.allGames.find(game => game.id === +id);
          if (game) {
            this.selectedGame = game;
            this.getGameScreenshots();
          } else {
            this.error = 'Game not found';
          }
        });
      },
      error: (err) => {
        this.error = 'Failed to load games. Please try again later.';
        this.isLoading = false;
        console.error('Error loading games:', err);
      }
    });
  }

  getGameScreenshots() {
    if (!this.selectedGame?.screenshots?.length) return;
    const screenshots = `(${this.selectedGame.screenshots.toString()})`;
    this.gameService.getGameScreenshots(screenshots).subscribe({
      next: (res) => {
        this.selectedGame!.screenshots = res.map(
          (screenshot: any) => screenshot.url.replace('thumb', '720p')
        );
      },
      error: (err) => console.error('Error loading screenshots:', err)
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.gamesSubscription?.unsubscribe();
  }
}
