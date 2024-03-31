import { Movie } from "./Movie";

export class MovieListItem{
    constructor(
        public id: number,
        public userRating: number,
        public movieStatus: string,
        public watchedEpisodes: number,
        public movie: Movie,
    ){}
}