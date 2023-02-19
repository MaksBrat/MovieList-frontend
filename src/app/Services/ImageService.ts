import { DomSanitizer } from "@angular/platform-browser";
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class ImageService{
    URL = 'https://localhost:7003';
    constructor(){

    }
    createImageUrl(imageUrl: any) {
        return this.URL + imageUrl;
    } 
}