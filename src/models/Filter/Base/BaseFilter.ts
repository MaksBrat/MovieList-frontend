export class BaseFilter{
    constructor(
        public searchQuery?: string,
        public orderBy?: string,
        public ascOrDesc?: string,
        public take = "0"
    ){
        ascOrDesc = "asc"
    }
}