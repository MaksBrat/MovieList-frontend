export class ProfileRequestModel{
    constructor(
        public avatar: File,
        public name: string,
        public age: number      
    ){}
}