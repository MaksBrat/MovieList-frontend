import {HttpClient} from '@angular/common/http';
import { NotificationService } from 'src/app/services/notification.service';
import { UrlOptions } from 'src/models/UrlOptions';
import { MovieListItem } from 'src/models/MovieListItem';
import { catchError, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MovieListService{
    private readonly Movie_MAP_KEY = 'movieMap';

    constructor(private http: HttpClient, private notificationService: NotificationService){

    }

    private movieListUrl =  UrlOptions.BaseUrl + 'api/MovieList';

    get(){
        return this.http.get<MovieListItem[]>(this.movieListUrl);
    }  
    
    isMovieInList(movieId: number){
        return this.http.get<boolean>(`${this.movieListUrl}/is-movie-in-user-list/${movieId}`);
    }
    
    add(movieId: number){
        return this.http.post(`${this.movieListUrl}?movieId=${movieId}`, null)
            .subscribe(response =>{
                this.notificationService.riseNotification({
                    message: 'Movie added successfully!',
                    type: 'success'
                });
            });
    }
    
    update(movie: MovieListItem){
        return this.http.put<MovieListItem>(this.movieListUrl, movie)
            .pipe(
                tap(response => {
                    this.notificationService.riseNotification({
                        message: 'Movie item updated successfully!',
                        type: 'success'
                    });
                }),
                catchError(error => {
                    this.notificationService.riseNotification({
                        message: 'Error updating movie item',
                        type: 'error'
                    });
                    return of(error);
                })
            ).subscribe();
    }  

    delete(movieId: number){    
        return this.http.delete(`${this.movieListUrl}/${movieId}`)
            .subscribe(response =>{
                this.notificationService.riseNotification({
                    message: 'Movie deleted successfully!',
                    type: 'success'
                });
                console.log(response)
            });
    }      
}



