import {Genre} from "./Genre"

export class Movie{
    constructor(
        public id?:number,  
        public title?: string, 
        public rating?:number,
        public episodes?: number, 
        public episodeDuration?:number, 
        public movieType?:string,
        public movieStatus?: string,
        public releaseDate?: Date,
        public posterUrl? : string,
        public trailerUrl?: string,
        public genres?: Genre[]){}
}