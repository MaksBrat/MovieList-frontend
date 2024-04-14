import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlOptions } from 'src/models/options/url-options';

@Injectable({
    providedIn: 'root'
})
export class RatingService {
    private readonly ratingUrl = UrlOptions.BaseUrl + 'api/rating';

    constructor(private http: HttpClient) { 

    }

    get(movieId: number){
        return this.http.get<number[]>(`${this.ratingUrl}/${movieId}`);
    }
}