import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Profile} from '../../../models/Profile';
import { ProfileWithAnimeList } from 'src/models/ProfileWithAnimeList';
import { NotificationService } from 'src/app/services/NotificationService';
import { UrlOptions } from 'src/models/UrlOptions';

@Injectable({
    providedIn: 'root'
})
export class ProfileService{
    private readonly ANIME_MAP_KEY = 'animeMap';

    constructor(private http: HttpClient, private notificationService: NotificationService){

    }

    private profileUrl =  UrlOptions.BaseUrl + 'api/Profile';

    get(){
        return this.http.get<Profile>(this.profileUrl + '/get');
    }

    getProfileWithAnimeList(){
        return this.http.get<ProfileWithAnimeList>(this.profileUrl + '/getProfileWithAnimeList');
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

    changeUserRating(animeId: number, userRating: number){
        return this.http.post(this.profileUrl + '/changeUserRating/' + animeId + '/' + userRating, null);
    }

    changeWatchedEpisodes(animeId: number, userWatchedEpisodes: number){
        return this.http.post(this.profileUrl + '/changeWatchedEpisides/' + animeId + '/' + userWatchedEpisodes, null);
    }

    changeAnimeStatus(animeId: number, animeStatus: string){
        return this.http.post(this.profileUrl + '/changeAnimeStatus/' + animeId + '/' + animeStatus, null);
    }
}