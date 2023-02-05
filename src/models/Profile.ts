import { Data } from "@angular/router";

export class Profile{
    constructor(
        public id: number,
        public name: string,
        public age: number,
        public registratedAt: Date,
        public avatar : any[]
    ){}
}