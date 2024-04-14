export class ProfileRequest{
    constructor(
        public avatar: File,
        public name: string,
        public age: number      
    ){}
}