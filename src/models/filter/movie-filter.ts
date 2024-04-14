import { BaseFilter } from "./base/base-filter";
import { GenreFilter } from "./genre-filter";

export class MovieFilter extends BaseFilter{
    constructor(
        public genres?: GenreFilter[],
        public movieType?: string,
        public movieStatus?: string,     
    ){
        super();
    }
}