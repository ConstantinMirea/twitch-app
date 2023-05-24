import { Component, OnInit } from '@angular/core';
import { Game } from '../services/api-models';
import { GamesApiService } from '../services/games-api.service';


@Component({
  selector: 'app-game-news',
  templateUrl: './game-news.component.html',
  styleUrls: ['./game-news.component.css']
})
export class GameNewsComponent implements OnInit {
  test: any = [];
  games: Game[] = [];
  gameCovers: any[] = [];

  constructor(private gamesApiService: GamesApiService) {
  }
  ngOnInit(): void {
    this.getAllGames();
  }

  getAllGames() {
    this.gamesApiService.getGames2().subscribe((res: Game[]) => {
      this.games = res;
    })
  }

  // getCovers(coverIds:string) {
  //       this.gamesApiService.getGameCover(coverIds).subscribe((res: any) => {
  //         // game.cover = res.url;
  //         // console.log(res);
  //         // console.log(this.games);
  //       this.games.forEach((game:any)=>{
  //         game.first_release_date = new Date(game.first_release_date*1000).toLocaleDateString();
  //         // console.log((new Date(game.first_release_date*1000).toLocaleDateString()))
  //         // console.log(moment(new Date()).subtract(1,'months').unix());
  //         game.summary.length > 250 ? game.summary = game.summary.slice(0,250) + '...' : game.summary;
  //         res.filter((res:any)=>{if(res.game === game.id){
  //           res.url = res.url.replace('thumb', '720p');
  //           game.cover=res.url;
  //         }})
  //       });
  //       this.gamesApiService.onGamesCreated.next(this.games);
  //       })
  //     }

  //     getGames() {

  //       this.gamesApiService.testGames().subscribe((res: any) => {
  //         this.test = res;
  //         console.log(res);
  //         // this.test.forEach((game: any) => { this.getGame(game?.game); })
  //       })
  //     }

  //     getGame(id: number) {
  //       this.gamesApiService.getGame(id).subscribe((res: any) => {

  //         this.games.push(res);
  //         // this.getCovers();
  //       })

  //     }

}
