import { Anime } from "./Anime";

export class AnimeList{
    constructor(
        public id: number,
        public userRating: number,
        public animeStatus: string,
        public anime: Anime,
        public watchedEpisodes: number
    ){}
}