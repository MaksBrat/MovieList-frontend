import { Genre } from "../genre/genre";

export class Movie{
    constructor(
        public id?:number,  
        public tmdbId?:number, 
        public title?: string, 
        public description?: string,
        public rating?: number,
        public tmdbRating?: number,
        public episodes?: number, 
        public episodeDuration?:number, 
        public movieType?:string,
        public movieStatus?: string,
        public releaseDate?: Date,
        public posterUrl? : string,
        public trailerUrl?: string,
        public genres?: Genre[]){}
}