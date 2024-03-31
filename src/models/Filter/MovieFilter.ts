import { BaseFilter } from "./Base/BaseFilter";
import { GenreFilter } from "./GenreFilter";

export class MovieFilter extends BaseFilter{
    constructor(
        public genres?: GenreFilter[],
        public movieType?: string,
        public movieStatus?: string,     
    ){
        super();
    }
}