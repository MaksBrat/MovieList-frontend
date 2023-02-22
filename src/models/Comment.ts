export class Comment{
    constructor(
        public id?: number,
        public content?: number,
        public author?: string,
        public authorId?: number,
        public avatarUrl?: string,
        public newsId?: number,
        public dateCreated?: string
    ){} 
}