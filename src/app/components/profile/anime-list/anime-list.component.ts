import { Component } from '@angular/core';
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

  constructor(public profileService: ProfileService, public animeService: AnimeService){
    profileService.getProfileWithAnimeList().subscribe(result =>{
      this.profileWithAnimeList = result;
      if(result.animeList.length == 0){
        this.isEmpty = true;
        console.log(this.isEmpty)
      }
    })
  }

  onInput(event: any) {
    if (!event.target.value) {
      event.target.value = null;
    }
  }
}
