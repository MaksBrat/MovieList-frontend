import { DomSanitizer } from "@angular/platform-browser";
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class ImageService{
    URL = 'http://mbmaksbrat-001-site1.itempurl.com';
    constructor(){

    }
    createImageUrl(imageUrl: any) {
        return this.URL + imageUrl;
    } 
}