import { GenreFilter } from "./GenreFilter";
import { Sorting } from "./Sorting";

export class Filter{
    constructor(
        public searchQuery?: string,
        public genres?: GenreFilter[],
        public animeType?: string,
        public OrderBy?: string,
        public ascOrDesc?: string
    ){
        ascOrDesc = "asc"
    }
}