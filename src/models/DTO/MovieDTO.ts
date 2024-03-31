import { Genre } from "../Genre";

export class MovieDTO{
    constructor(
        public id?:number,  
        public title?: string, 
        public rating?:number,
        public episodes?: number, 
        public episodeDuration?:number, 
        public movieType?:string,
        public realizeDate?: string,
        public posterUrl? : string,
        public genres?: Genre[]){}
}