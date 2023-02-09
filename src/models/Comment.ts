export class Comment{
    constructor(
        public id?: number,
        public content?: number,
        public author?: string,
        public authorId?: number,
        public authorAvatar?: any,
        public newsId?: number,
        public dateCreated?: string
    ){} 
}