import { Component, OnInit, OnDestroy } from '@angular/core';
import { Game } from '../services/api-models';
import { GamesApiService } from '../services/games-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game-news',
  templateUrl: './game-news.component.html',
  styleUrls: ['./game-news.component.css']
})
export class GameNewsComponent implements OnInit, OnDestroy {
  games: Game[] = [];
  isLoading = true;
  error: string | null = null;
  private gamesSubscription!: Subscription;

  constructor(private gamesApiService: GamesApiService) {}

  ngOnInit(): void {
    this.gamesSubscription = this.gamesApiService.getGames2().subscribe({
      next: (res: Game[]) => {
        this.games = res;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load games. Please try again later.';
        this.isLoading = false;
        console.error('Error loading games:', err);
      }
    });
  }

  ngOnDestroy(): void {
    this.gamesSubscription?.unsubscribe();
  }
}
