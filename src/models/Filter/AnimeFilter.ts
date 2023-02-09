import { BaseFilter } from "./Base/BaseFilter";
import { GenreFilter } from "./GenreFilter";

export class AnimeFilter extends BaseFilter{
    constructor(
        public genres?: GenreFilter[],
        public animeType?: string,
        public animeStatus?: string,     
    ){
        super();
    }
}