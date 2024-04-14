import { Movie } from "../movie/movie";

export class MovieListItem{
    constructor(
        public id: number,
        public userRating: number,
        public movieStatus: string,
        public watchedEpisodes: number,
        public movie: Movie,
    ){}
}