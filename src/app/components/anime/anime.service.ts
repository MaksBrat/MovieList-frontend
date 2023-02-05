import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {Anime} from '../../../models/Anime';
import { catchError, of, Subject, tap } from 'rxjs';
import { Filter } from 'src/models/RequestModels/Search/Filter';
import { NotificationService } from 'src/app/Services/NotificationService';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
export class AnimeService{
    anime: Anime;
    searchQuery: string;
    invokeEvent: Subject<any> = new Subject(); 

    currentPage: string;

    private readonly ANIME_MAP_KEY = 'animeMap';

    private animeUrl = 'https://localhost:7003/api/Anime';
    private profileUrl = 'https://localhost:7003/api/Profile';
    constructor(private http: HttpClient, private notificationService: NotificationService,
        private router: Router){
        
    }
    
    getSearchQuery($event){
        this.invokeEvent.next($event.target.value);
    }

    getAll(filter: Filter){
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
    
    create(anime: FormData){
        console.log("create")
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

    update(anime: FormData){
        console.log(anime)
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

    selectAnime(anime: Anime){
        this.setSelectedAnime(anime);
        this.router.navigate(['/animeAbout']);     
    } 

    setSelectedAnime(anime: Anime){
        this.anime = anime;
    }

    getSelectedAnime(){
        return this.anime;
    } 

    //#region Anime list

    isAnimeInList(animeId: number): boolean{
        let animeMap = JSON.parse(localStorage.getItem(this.ANIME_MAP_KEY)) || {};
        if (animeMap[animeId]) {
            return true;
        } 
        else {
            return false;
        }
    }

    addAnimeToList(animeId: number){
        let animeMap = JSON.parse(localStorage.getItem(this.ANIME_MAP_KEY)) || {};
        animeMap[animeId] = true;
        localStorage.setItem(this.ANIME_MAP_KEY, JSON.stringify(animeMap));
        
        return this.http.get(this.profileUrl + '/addAnimeToList/' + animeId)
            .subscribe(response =>{
                this.notificationService.addNotification({
                    message: 'Anime added successfully!',
                    type: 'success'
                });
                console.log(response)
            });
    }

    deleteAnimeFromList(animeId: number){
        let animeMap = JSON.parse(localStorage.getItem(this.ANIME_MAP_KEY)) || {};
        animeMap[animeId] = false;
        localStorage.setItem(this.ANIME_MAP_KEY, JSON.stringify(animeMap));

        return this.http.delete(this.profileUrl + '/deleteAnimeFromList/' + animeId)
            .subscribe(response =>{
                this.notificationService.addNotification({
                    message: 'Anime delete successfully!',
                    type: 'success'
                });
                console.log(response)
            });
    }

    changeUserRating(id: number, $event: any){
        return this.http.post(this.profileUrl + '/changeUserRating/' + id + '/' + $event.target.value, null)
            .subscribe(response =>{
                console.log(response)
            });
    }

    changeWatchedEpisodes(id: number, $event: any){
        return this.http.post(this.profileUrl + '/changeWatchedEpisides/' + id + '/' + $event.target.value, null)
            .subscribe(response =>{
                console.log(response)
            });
    }

    changeAnimeStatus(id: number, $event: any){
        return this.http.post(this.profileUrl + '/changeAnimeStatus/' + id + '/' + $event.target.value, null)
            .subscribe(response =>{
                console.log(response)
        });
    }

    //#endregion


}