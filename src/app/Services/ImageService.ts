import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class ImageService{
    URL = 'http://mbmaksbrat-001-site1.itempurl.com'; //hosting url for database (store images)
    constructor(){

    }
    createImageUrl(imageUrl: any) {
        return this.URL + imageUrl;
    } 
}