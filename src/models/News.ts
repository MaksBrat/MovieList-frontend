import { Comment } from "./Comment";

export class News{
    constructor(
        public id?: number,
        public title?: string,
        public author?: string,
        public authorId?: number,
        public authorAvatar?: string,
        public content?: string,
        public dateCreated?: string,
        public comments?: Comment[]
    )
    {

    }
}