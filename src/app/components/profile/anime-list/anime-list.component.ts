import { Component } from '@angular/core';
import { NotificationService } from 'src/app/services/NotificationService';
import { ProfileWithAnimeList } from 'src/models/ProfileWithAnimeList';
import { AnimeService } from '../../anime/anime.service';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.css'],

  providers: [ProfileService]
})
export class AnimeListComponent {
  public profileWithAnimeList: ProfileWithAnimeList;

  isEmpty = false;

  animeStatus = [
    {name: 'Watched'},
    {name: 'Watching'},
    {name: 'WantToWatch'},
    {name: 'Stalled'},
    {name: 'Dropped'},
  ]

  constructor(public profileService: ProfileService, public animeService: AnimeService,
    private notificationService: NotificationService){
    profileService.getProfileWithAnimeList().subscribe(result =>{
      this.profileWithAnimeList = result;
      if(result.animeList.length == 0){
        this.isEmpty = true;
      }
    })
  }

  onInput(event: any) {
    if (!event.target.value) {
      event.target.value = null;
    }
  }

  changeUserRating(animeId: number, $event: any){
    const value = $event.target.value;
    if(value >= 1 && value <= 10){
      this.profileService.changeUserRating(animeId, value)
      .subscribe(response =>{
        console.log(response)
      });
    } 
    else{
      this.notificationService.addNotification({
        message: 'Rating must be between 1 and 10',
        type: 'error'
      });
    }
  }

  changeWatchedEpisodes(animeId: number, episodesInAnime, $event: any){
    const userWatchedEpisodes = $event.target.value;
    if(userWatchedEpisodes >= 1 && userWatchedEpisodes <= episodesInAnime){
      this.profileService.changeWatchedEpisodes(animeId, userWatchedEpisodes)
      .subscribe(response =>{
        console.log(response)
      });
    }
    else{
      this.notificationService.addNotification({
        message: 'Episodes must be between 1 and the total number of episodes in the anime series',
        type: 'error'
      });
    }
  }

  changeAnimeStatus(animeId: number, $event: any){
    const animeStatus = $event.target.value;
    this.profileService.changeAnimeStatus(animeId, animeStatus)
      .subscribe(response =>{
        console.log(response)
    });
  }

  deleteAnimeFromList(animeId: number){
    this.profileService.deleteAnimeFromList(animeId)
  }
}
