import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Anime} from '../../../models/Anime';
import { catchError, of, Subject, tap } from 'rxjs';
import { NotificationService } from 'src/app/services/NotificationService';
import { Router } from '@angular/router';
import { AnimeFilter } from 'src/models/Filter/AnimeFilter';

@Injectable({
    providedIn: 'root'
  })
export class AnimeService{
    anime: Anime;
    searchQuery: string;
    invokeEvent: Subject<any> = new Subject(); 

    currentPage: string;

    private animeUrl = 'http://mbmaksbrat-001-site1.itempurl.com/api/Anime';
    constructor(private http: HttpClient, private notificationService: NotificationService){
        
    }
    
    getSearchQuery($event){
        this.invokeEvent.next($event.target.value);
    }

    get(id: number){
        console.log("fdasfdasfd")
        return this.http.get(this.animeUrl + '/get/' + id);
    }

    getAll(filter: AnimeFilter){
        let params = new HttpParams();

        if (filter.searchQuery) {
            params = params.set('searchQuery', filter.searchQuery);
        }
        if(filter.genres){
            filter.genres.forEach((genre, index) => {
                params = params.append(`genres[${index}].id`, genre.id);
                params = params.append(`genres[${index}].name`, genre.name);
                params = params.append(`genres[${index}].checked`, genre.checked);
              });
        }
        if(filter.animeType){
            params = params.append(`animeType`, filter.animeType);
        }
        if(filter.animeStatus){
            params = params.append(`animeStatus`, filter.animeStatus);
        }
        if(filter.orderBy){
            params = params.append(`OrderBy`, filter.orderBy);
            params = params.append(`ascOrDesc`, filter.ascOrDesc);
        }

        params = params.append('take',filter.take);

        return this.http.get<Anime[]>(this.animeUrl + '/getAll/?' + params);
    } 
    
    create(anime: Anime){
        return this.http.post<Anime>(this.animeUrl + '/create', anime)
            .pipe(
                tap(response => {
                    this.notificationService.addNotification({
                        message: 'Anime created successfully!',
                        type: 'success'
                    });
                }),
                catchError(error => {
                    this.notificationService.addNotification({
                        message: 'Error creating anime',
                        type: 'error'
                    });
                    return of(error);
                })
            ).subscribe();
    }

    update(anime: Anime){
        return this.http.post<Anime>(this.animeUrl + '/edit', anime)
        .pipe(
            tap(response => {
                this.notificationService.addNotification({
                    message: 'Anime updated successfully!',
                    type: 'success'
                });
            }),
            catchError(error => {
                this.notificationService.addNotification({
                    message: 'Error updating anime',
                    type: 'error'
                });
                return of(error);
            })
        ).subscribe();
    }

    delete(id: number){
        return this.http.delete(this.animeUrl + '/delete/' + id)
        .pipe(
            tap(response => {
                this.notificationService.addNotification({
                    message: 'Anime delete successfully!',
                    type: 'success'
                });
            }),
            catchError(error => {
                this.notificationService.addNotification({
                    message: 'Error delete anime',
                    type: 'error'
                });
                return of(error);
            })
        ).subscribe();
    }
}