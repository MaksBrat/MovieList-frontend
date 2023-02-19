export class MessageResponseModel{
    constructor(
        public id: string,
        public text:  string,
        public author:  string,
        public authorId: number,
        public avatarUrl:  string,
        public dateCreated: string
    ){
        
    }
}