import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Movie} from '../../models/movie/movie';
import { catchError, of, Subject, tap } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { UrlOptions } from 'src/models/options/url-options';
import { MovieFilter } from 'src/models/filter/movie-filter';

@Injectable({
    providedIn: 'root'
  })
export class MovieService{
    movie: Movie;
    searchQuery: string;
    invokeEvent: Subject<any> = new Subject(); 

    currentPage: string;

    private movieUrl = UrlOptions.BaseUrl + 'api/Movie';
    
    constructor(private http: HttpClient, private notificationService: NotificationService){
        
    }
    
    getSearchQuery($event){
        this.invokeEvent.next($event.target.value);
    }

    get(id: number){
        return this.http.get(`${this.movieUrl}/${id}`);
    }

    getAll(filter: MovieFilter){
        let params = new HttpParams()
            .set('searchQuery', filter.searchQuery || '')
            .set('movieType', filter.movieType || '')
            .set('movieStatus', filter.movieStatus || '')
            .set('OrderBy', filter.orderBy || '')
            .set('ascOrDesc', filter.ascOrDesc || '')
            .set('take', filter.take || 15)
            .set('pageIndex', filter.pageIndex);

            if(filter.genres){
                filter.genres.forEach((genre, index) => {
                    params = params.append(`genres[${index}].id`, genre.id);
                    params = params.append(`genres[${index}].name`, genre.name);
                    params = params.append(`genres[${index}].checked`, genre.checked);
                  });
            }

        return this.http.get<Movie[]>(`${this.movieUrl}/?${params}`);
    } 
    
    create(movie: Movie){
        return this.http.post<Movie>(this.movieUrl, movie)
            .pipe(
                tap(response => {
                    this.notificationService.riseNotification({
                        message: 'Movie created successfully!',
                        type: 'success'
                    });
                }),
                catchError(error => {
                    this.notificationService.riseNotification({
                        message: 'Error creating movie',
                        type: 'error'
                    });
                    return of(error);
                })
            ).subscribe();
    }

    update(movie: Movie){
        return this.http.put<Movie>(this.movieUrl, movie)
        .pipe(
            tap(response => {
                this.notificationService.riseNotification({
                    message: 'Movie updated successfully!',
                    type: 'success'
                });
            }),
            catchError(error => {
                this.notificationService.riseNotification({
                    message: 'Error updating movie',
                    type: 'error'
                });
                return of(error);
            })
        ).subscribe();
    }

    delete(id: number){
        return this.http.delete(`${this.movieUrl}/${id}`)
        .pipe(
            tap(response => {
                this.notificationService.riseNotification({
                    message: 'Movie delete successfully!',
                    type: 'success'
                });
            }),
            catchError(error => {
                this.notificationService.riseNotification({
                    message: 'Error delete movie',
                    type: 'error'
                });
                return of(error);
            })
        ).subscribe();
    }
}