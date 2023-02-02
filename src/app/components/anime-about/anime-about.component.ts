import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from 'src/app/Services/ImageService';
import { Anime } from 'src/entity/Anime';
import { AccountService } from '../account/account.Service';
import { AdminTabComponent } from '../admin-tab/admin-tab.component';
import { AnimeService } from '../anime/anime.service';
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
    public dialog: MatDialog, private _sanitizer: DomSanitizer){
      
    }

  ngOnInit() {
    this.anime = this.animeService.getSelectedAnime();
  }

  openTrailer(){
    const dialogRef = this.dialog.open(TrailerComponent, {
      data: {url: this._sanitizer.bypassSecurityTrustResourceUrl(this.anime.trailerUrl)
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
}


