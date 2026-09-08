export interface LatestGames {
    id: number,
    category: number,
    created_at: Date,
    date: Date,
    game: number,
    human: string,
    m: number,
    platform: number,
    region: number,
    updated_at: Date,
    y: Date,
    checksum: string,
    status: number
}

export interface Game {
    id: number,
    alternative_names: number[],
    category: number,
    cover: number,
    aggregated_rating: string,
    created_at: Date,
    external_games: number[],
    first_release_date: number,
    game_modes: number[],
    genres: number[],
    involved_companies: number[],
    keywords: number[],
    name: string,
    platforms: number[],
    player_perspectives: number[],
    release_dates: number[],
    screenshots: number[],
    similar_games: number[],
    slug: string,
    summary: string,
    storyline: string,
    tags: number[],
    themes: number[],
    updated_at: Date,
    url: string,
    total_rating: number,
    videos: number[],
    websites: number[],
    checksum: string,
    language_supports: number[],
}

export interface GameNews {
    id: number,
    title: string,
    short_description: string,
    description: string,
    image: string,
    url: string,
    publisher: number,
    author: string,
    game: number,
    category: number,
    y: number,
    m: number,
    d: number,
    created_at: Date,
    updated_at: Date
}

export interface TrendingGame {
    id: number,
    name: string,
    slug: string,
    released: Date,
    background_image: string,
    rating: number,
    rating_top: number,
    metacritic: number,
    playtime: number,
    websites: string[],
    platforms: { platform: { id: number; name: string; slug: string } }[],
    genres: { id: number; name: string }[],
    publishers: { id: number; name: string }[]
}

export interface GamesApiResponse {
    count: number,
    next: string | null,
    previous: string | null,
    results: Game[] | TrendingGame[]
}

export interface NewsApiResponse {
    count: number,
    results: GameNews[]
}

export interface GameCover {
    id: number,
    image: string,
    game: number,
    width: number,
    height: number
}

export interface Platform {
    id: number,
    name: string,
    slug: string,
    games_count: number
}
