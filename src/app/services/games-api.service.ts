import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject, map, of } from "rxjs";
import { Game, LatestGames, GameNews, TrendingGame, GamesApiResponse, NewsApiResponse, GameCover, Platform } from "./api-models";
import { environment } from "../../enviroments/environment";

@Injectable({
  providedIn: "root",
})
export class GamesApiService {
  allGames: Game[] = [];
  onGamesCreated = new Subject<Game[]>();
  private cachedGames: Game[] | null = null;
  private cacheTimestamp: number = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-api-key": environment.rawgApiKey,
    }),
  };

  /**
   * Fetch recently released highly-rated games (rating > 7).
   * Uses direct RAWG v1 REST API — works without proxy / static hosting.
   */
  getGames2(): Observable<Game[]> {
    // Return cached data if still valid
    if (this.cachedGames && (Date.now() - this.cacheTimestamp) < this.CACHE_DURATION) {
      return of(this.cachedGames);
    }

    const minDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];
    const maxDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    return this.http
      .get<GamesApiResponse>(`${environment.rawgBaseUrl}/games`, {
        ...this.httpOptions,
        params: {
          key: environment.rawgApiKey,
          dates: `${minDate},${maxDate}`,
          ordering: "-first_release",
          rating: "7",
          pagesize: "25",
        },
      })
      .pipe(
        map((response: GamesApiResponse) => {
          const games: any[] = response.results.map((game: any) => {
            // Truncate long summaries
            if (game.summary?.length > 250) {
              game.summary = game.summary.slice(0, 250) + "...";
            }
            return game;
          });
          this.allGames = games as Game[];
          this.cachedGames = [...games];
          this.cacheTimestamp = Date.now();
          return games as Game[];
        })
      );
  }

  /**
   * Fetch cover images for a specific game using direct RAWG v1 REST API.
   */
  getGameCover(id: string): Observable<any> {
    return this.http.get(`${environment.rawgBaseUrl}/games/${id}/covers`, {
      ...this.httpOptions,
      params: { key: environment.rawgApiKey },
    });
  }

  /**
   * Fetch screenshots for a specific game using direct RAWG v1 REST API.
   */
  getGameScreenshots(id: string): Observable<any> {
    return this.http.get(`${environment.rawgBaseUrl}/games/${id}/screenshots`, {
      ...this.httpOptions,
      params: { key: environment.rawgApiKey },
    });
  }

  /**
   * Fetch a single game by its RAWG ID using the direct API.
   */
  getGameById(id: number): Observable<any> {
    return this.http.get(`${environment.rawgBaseUrl}/games/${id}`, this.httpOptions);
  }

  /**
   * Search games by name or keyword.
   * @param query - search string
   * @param page - page number (default: 1)
   * @param pageSize - results per page (default: 20, max: 60)
   */
  searchGames(query: string, page: number = 1, pageSize: number = 20): Observable<GamesApiResponse> {
    return this.http.get<GamesApiResponse>(
      `${environment.rawgBaseUrl}/games/`,
      {
        ...this.httpOptions,
        params: {
          search: query,
          page: page.toString(),
          pagesize: pageSize.toString(),
          key: environment.rawgApiKey,
        },
      }
    );
  }

  /**
   * Fetch trending games sorted by rating.
   * @param page - page number (default: 1)
   * @param pageSize - results per page (default: 20)
   */
  getTrendingGames(page: number = 1, pageSize: number = 20): Observable<GamesApiResponse> {
    return this.http.get<GamesApiResponse>(
      `${environment.rawgBaseUrl}/games/`,
      {
        ...this.httpOptions,
        params: {
          ordering: '-rating',
          page: page.toString(),
          pagesize: pageSize.toString(),
          key: environment.rawgApiKey,
        },
      }
    );
  }

  /**
   * Fetch the latest game news articles.
   * @param page - page number (default: 1)
   * @param pageSize - results per page (default: 20)
   */
  getGameNews(page: number = 1, pageSize: number = 20): Observable<NewsApiResponse> {
    return this.http.get<NewsApiResponse>(
      `${environment.rawgBaseUrl}/news/`,
      {
        ...this.httpOptions,
        params: {
          page: page.toString(),
          pagesize: pageSize.toString(),
          key: environment.rawgApiKey,
        },
      }
    );
  }

  /**
   * Fetch available platforms.
   * @param page - page number (default: 1)
   * @param pageSize - results per page (default: 60)
   */
  getPlatforms(page: number = 1, pageSize: number = 60): Observable<any> {
    return this.http.get<any>(
      `${environment.rawgBaseUrl}/platforms/`,
      {
        ...this.httpOptions,
        params: {
          page: page.toString(),
          pagesize: pageSize.toString(),
          key: environment.rawgApiKey,
        },
      }
    );
  }

  /**
   * Get cover image for a specific game.
   */
  getGameCoverDirect(id: number): Observable<GameCover[]> {
    return this.http.get<GameCover[]>(
      `${environment.rawgBaseUrl}/games/${id}/covers`,
      {
        ...this.httpOptions,
        params: {
          key: environment.rawgApiKey,
        },
      }
    );
  }
}
