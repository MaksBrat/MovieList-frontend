import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {Anime} from '../../../entity/Anime';
import { Subject } from 'rxjs';
import { Filter } from 'src/entity/RequestModels/Search/Filter';

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
    constructor(private http: HttpClient){
        
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
            console.log(filter.animeType);
            params = params.append(`animeType`, filter.animeType);
        }
        if(filter.OrderBy){
            params = params.append(`OrderBy`, filter.OrderBy);
            params = params.append(`ascOrDesc`, filter.ascOrDesc);
        }

        return this.http.get<Anime[]>(this.animeUrl + '/getAll/?' + params);
    } 
    
    getSearchQuery($event){
        this.invokeEvent.next($event.target.value);
    }

    create(anime: FormData){
        return this.http.post<Anime>(this.animeUrl + '/create', anime)
            .subscribe(response =>{
                console.log(response)
            });
    }

    update(anime: FormData){
        console.log(anime)
        return this.http.post<Anime>(this.animeUrl + '/edit', anime)
            .subscribe(response =>{
                console.log(response)
            });
    }

    delete(id: number){
        return this.http.delete(this.animeUrl + '/delete/' + id)
            .subscribe(response =>{
                console.log(response)
            });
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
                console.log(response)
            });
    }

    deleteAnimeFromList(animeId: number){
        let animeMap = JSON.parse(localStorage.getItem(this.ANIME_MAP_KEY)) || {};
        animeMap[animeId] = false;
        localStorage.setItem(this.ANIME_MAP_KEY, JSON.stringify(animeMap));

        return this.http.delete(this.profileUrl + '/deleteAnimeFromList/' + animeId)
            .subscribe(response =>{
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