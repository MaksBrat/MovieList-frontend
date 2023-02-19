import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Anime} from '../../../models/Anime';
import { catchError, of, tap } from 'rxjs';
import { NotificationService } from 'src/app/services/NotificationService';
import { Router } from '@angular/router';
import { News } from 'src/models/News';
import { NewsFilter } from 'src/models/Filter/NewsFilter';

@Injectable({
    providedIn: 'root'
  })
export class NewsService{
    private newsUrl = 'https://localhost:7003/api/News';

    constructor(private http: HttpClient, private notificationService: NotificationService,
        private router: Router){
        
    }
    
    get(id: number){
        return this.http.get(this.newsUrl + '/get/' + id);
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

        params = params.append('take',filter.take);

        return this.http.get<Anime[]>(this.newsUrl + '/getAll/?' + params);
    } 

    //#endregion

    create(news: News){
        return this.http.post(this.newsUrl + '/create', news)
            .pipe(
                tap(response => {
                    this.notificationService.addNotification({
                        message: 'News created successfully!',
                        type: 'success'
                    });
                }),
                catchError(error => {
                    this.notificationService.addNotification({
                        message: 'Error creating news',
                        type: 'error'
                    });
                    return of(error);
                })
            ).subscribe();
    }

    update(news: FormData){
        return this.http.post<Anime>(this.newsUrl + '/edit', news)
        .pipe(
            tap(response => {
                this.notificationService.addNotification({
                    message: 'News updated successfully!',
                    type: 'success'
                });
            }),
            catchError(error => {
                this.notificationService.addNotification({
                    message: 'Error updating news',
                    type: 'error'
                });
                return of(error);
            })
        ).subscribe();
    }

    delete(id: number){
        return this.http.delete(this.newsUrl + '/delete/' + id)
        .pipe(
            tap(response => {
                this.notificationService.addNotification({
                    message: 'News delete successfully!',
                    type: 'success'
                });
            }),
            catchError(error => {
                this.notificationService.addNotification({
                    message: 'Error delete news',
                    type: 'error'
                });
                return of(error);
            })
        ).subscribe();
    }
}