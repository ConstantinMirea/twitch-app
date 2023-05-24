import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, map, of, switchMap } from 'rxjs';
import { Game, LatestGames } from './api-models';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class GamesApiService {
  allGames:Game[] = [];
  onGamesCreated = new Subject<Game[]>();


  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      "Access-Control-Allow-Origin": '*',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      // 'Access-Control-Allow-Credentials':'true',
      // 'Client-ID': 'q4oc621n43zeonaouz851w30vo39k4',
      // 'Authorization': 'Bearer 5opn3uhshfsfwhln5q8y3xml5v2u7y'
      'x-api-key': 'Ywm5ymvSJf82lhEATVqBI1FF8IT48LhY4etbq9Hr'
    })
  };

  testGames() {
    let data1: any = []
    const body = "fields *; limit 50;";
    //  const body = "fields cover.*; where id = 237565;";
    const body2 = "fields *; where date > 1682924400; limit 50; sort date asc;"
    return this.http.post<LatestGames[]>("/api/v4/release_dates/", body2, this.httpOptions)

    // return this.http.post("/api/v4/games/",body2, httpOptions);


  }


  getGame(id: number) {
    // const id = 244918;
    const body = `fields *; where id=${id};`;
    return this.http.post<Game[]>("/api/v4/games/", body, this.httpOptions).pipe(switchMap((res: any) => {
      console.log(res);
      return of(res[0])
    }));

  }

  getGames() {

    // const id = 244918;
    const minReleaseDate = moment(new Date()).subtract(1, 'months').unix();
    const maxReleaseDate = moment(new Date()).add(1, 'years').unix();
    const body = `fields *;where first_release_date > ${minReleaseDate} & first_release_date < ${maxReleaseDate} & aggregated_rating > 75; sort first_release_date desc; limit 25;`;
    return this.http.post<Game[]>("/api/v4/games/", body, this.httpOptions)

  }


  getGames2() {

    // const id = 244918;
    const minReleaseDate = moment(new Date()).subtract(1, 'months').unix();
    const maxReleaseDate = moment(new Date()).add(1, 'years').unix();
    const body = `fields *;where first_release_date > ${minReleaseDate} & first_release_date < ${maxReleaseDate} & aggregated_rating > 75; sort first_release_date desc; limit 25;`;
    return this.http.post<Game[]>("/api/v4/games/", body, this.httpOptions).pipe(
map((games:any) => {
  let coverIDs: any = [];
  games.forEach((game:any) => { if (game.cover) { coverIDs.push(game.cover) } });
  const gameCoverID = `(${coverIDs.toString()})`;
  this.getGameCover(gameCoverID).subscribe(
    (res: any) => {
      games.forEach((game: any) => {
        game.first_release_date = new Date(game.first_release_date*1000).toLocaleDateString();
        game.summary.length > 250 ? game.summary = game.summary.slice(0,250) + '...' : game.summary;
        res.filter((res: any) => {
          if (res.game === game.id) {
            res.url = res.url.replace('thumb', '720p');
            game.cover = res.url;
          }
        })
      })
 
    }
  );
  // console.log(games);
  this.allGames=games;
  // this.onGamesCreated.next(this.allGames);
  return games;
})
    )
  }


  getGameCover(id: string) {
    const body = `fields *; where id=${id}; limit 50;`;
    return this.http.post<any>("/api/v4/covers/", body, this.httpOptions)
  }

  getGameScreenshots(id: string) {
    const body = `fields *; where id=${id};`;
    return this.http.post<any>("/api/v4/screenshots/", body, this.httpOptions);

  }
}
