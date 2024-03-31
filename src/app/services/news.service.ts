import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Movie} from '../../models/Movie';
import { catchError, of, tap } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';
import { News } from 'src/models/News';
import { NewsFilter } from 'src/models/Filter/NewsFilter';
import { UrlOptions } from 'src/models/UrlOptions';

@Injectable({
    providedIn: 'root'
  })
export class NewsService{
    private newsUrl =  UrlOptions.BaseUrl + 'api/News';

    constructor(private http: HttpClient, private notificationService: NotificationService,
        private router: Router){
        
    }
    
    get(id: number){
        return this.http.get(`${this.newsUrl}/${id}`);
    }

    getAll(filter: NewsFilter){
        let params = new HttpParams();

        if (filter.searchQuery) {
            params = params.set('searchQuery', filter.searchQuery);
        }
        if(filter.orderBy){
            params = params.append(`OrderBy`, filter.orderBy);
            params = params.append(`ascOrDesc`, filter.ascOrDesc);
        }

        params = params.append('take', filter.take);

        return this.http.get<Movie[]>(`${this.newsUrl}/?${params}`);
    } 

    create(news: News){
        return this.http.post(this.newsUrl, news)
            .pipe(
                tap(response => {
                    this.notificationService.riseNotification({
                        message: 'News created successfully!',
                        type: 'success'
                    });
                }),
                catchError(error => {
                    this.notificationService.riseNotification({
                        message: 'Error creating news',
                        type: 'error'
                    });
                    return of(error);
                })
            ).subscribe();
    }

    update(news: FormData){
        return this.http.put<News>(this.newsUrl, news)
        .pipe(
            tap(response => {
                this.notificationService.riseNotification({
                    message: 'News updated successfully!',
                    type: 'success'
                });
            }),
            catchError(error => {
                this.notificationService.riseNotification({
                    message: 'Error updating news',
                    type: 'error'
                });
                return of(error);
            })
        ).subscribe();
    }

    delete(id: number){
        return this.http.delete(`${this.newsUrl}/${id}`)
        .pipe(
            tap(response => {
                this.notificationService.riseNotification({
                    message: 'News delete successfully!',
                    type: 'success'
                });
            }),
            catchError(error => {
                this.notificationService.riseNotification({
                    message: 'Error delete news',
                    type: 'error'
                });
                return of(error);
            })
        ).subscribe();
    }
}