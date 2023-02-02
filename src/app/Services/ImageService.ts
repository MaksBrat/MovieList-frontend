import { DomSanitizer } from "@angular/platform-browser";
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class ImageService{
    constructor(private sanitizer: DomSanitizer){

    }
    createImageUrl(image: any) {
        return this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + image);
    } 
}