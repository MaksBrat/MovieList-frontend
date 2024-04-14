export class BaseFilter{
    constructor(
        public searchQuery?: string,
        public orderBy?: string,
        public ascOrDesc = "asc",
        public take = 0,
        public pageIndex = 0
    ){
    
    }
}