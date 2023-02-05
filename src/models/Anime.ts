import {Genre} from "./Genre"

export class Anime{
    constructor(
        public id?:number,  
        public title?: string, 
        public rating?:number,
        public episodes?: number, 
        public episodeDuration?:number, 
        public animeType?:string,
        public animeStatus?: string,
        public releaseDate?: Date,
        public posterUrl? : string,
        public trailerUrl?: string,
        public genres?: Genre[]){}
}