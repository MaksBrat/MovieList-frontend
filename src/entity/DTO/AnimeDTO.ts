import { Genre } from "../Genre";

export class AnimeDTO{
    constructor(
        public id?:number,  
        public title?: string, 
        public rating?:number,
        public episodes?: number, 
        public episodeDuration?:number, 
        public animeType?:string,
        public realizeDate?: string,
        public posterUrl? : string,
        public genres?: Genre[]){}
}