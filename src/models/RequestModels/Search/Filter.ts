import { GenreFilter } from "./GenreFilter";
import { Sorting } from "./Sorting";

export class Filter{
    constructor(
        public searchQuery?: string,
        public genres?: GenreFilter[],
        public animeType?: string,
        public animeStatus?: string,
        public orderBy?: string,
        public ascOrDesc?: string,
        public take = "0"
    ){
        ascOrDesc = "asc"
    }
}