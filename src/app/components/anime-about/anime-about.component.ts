import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Anime } from 'src/models/Anime';
import { AccountService } from '../account/account.Service';
import { AdminTabComponent } from '../admin-tab/admin-tab.component';
import { AnimeService } from '../anime/anime.service';
import { ProfileService } from '../profile/profile.service';
import { TrailerComponent } from './trailer/trailer.component';

@Component({
  selector: 'app-anime-about',
  templateUrl: './anime-about.component.html',
  styleUrls: ['./anime-about.component.css']
})
export class AnimeAboutComponent implements OnInit {
  anime: Anime;
  selectedAction = '';

  constructor(public animeService: AnimeService, public accountService: AccountService, 
    public dialog: MatDialog, private sanitizer: DomSanitizer, private route: ActivatedRoute,
    public router: Router, private profileService: ProfileService ){
      
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.animeService.get(id).subscribe(response =>{
        this.anime = response;
      });
    });
  }

  openTrailer(){
    const dialogRef = this.dialog.open(TrailerComponent, {
      data: {url: this.sanitizer.bypassSecurityTrustResourceUrl(this.anime.trailerUrl)
    }});
  }

  openCreateDialog(){
    const dialogRef = this.dialog.open(AdminTabComponent, {
      data: {selectedAction: this.selectedAction}
    });
  }
  
  openUpdateDialog(){
    const dialogRef = this.dialog.open(AdminTabComponent, {
      data: {anime: this.anime, selectedAction: this.selectedAction}
    });
  }

  openDeleteDialog(){
    const dialogRef = this.dialog.open(AdminTabComponent, {
      data: {id: this.anime.id, selectedAction: this.selectedAction}
    });
  }

  isAnimeInList(animeId){
    return this.profileService.isAnimeInList(animeId);
  }

  addAnimeToList(animeId){
    var isAuth = this.accountService.isUserAuthenticated();
    if(isAuth){
      this.profileService.addAnimeToList(animeId)
    }
    else{
      this.router.navigate(["/login"]);
    }
  }

  deleteAnimeFromList(animeId){
    var isAuth = this.accountService.isUserAuthenticated();
    if(isAuth){
      this.profileService.deleteAnimeFromList(animeId)
    }
    else{
      this.router.navigate(["/login"]);
    }
  }
}


