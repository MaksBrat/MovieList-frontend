export class Profile{
    constructor(
        public id: number,
        public name: string,
        public age: number,
        public registratedAt: Date,
        public avatarUrl : string
    ){}
}