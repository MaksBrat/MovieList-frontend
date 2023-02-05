import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { throws } from 'assert';
import { NotificationService } from 'src/app/Services/NotificationService';
import { Anime } from 'src/models/Anime';
import { AnimeOptions } from 'src/models/AnimeOptions';
import { AccountService } from '../account/account.Service';
import { AnimeService } from '../anime/anime.service';

@Component({
  selector: 'app-admin-tab',
  templateUrl: './admin-tab.component.html',
  styleUrls: ['./admin-tab.component.css']
})
export class AdminTabComponent {
  formData = new FormData();
  selectedAction = '';

  anime: Anime;
  idToDelete: number;   

  animeOptions = new AnimeOptions();

  genres = this.animeOptions.genres;  
  animeTypes = this.animeOptions.animeTypes;
  animeStatus = this.animeOptions.animeStatus;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<AdminTabComponent>, 
    private animeService: AnimeService, public accountService: AccountService){
      this.selectedAction = data.selectedAction;
      if(data.selectedAction === 'create'){
        this.anime = new Anime();
        this.anime.id = 0;
        this.anime.genres = [];
        this.anime.posterUrl = null;
        this.anime.trailerUrl = null;         
      }
      else if(data.anime != undefined){ // update
        this.anime = data.anime;
      }
      else if(data.id != undefined){ // delete
        this.idToDelete = data.id
      }
  }

  onSubmit() {
    this.dialogRef.close();
    if (this.selectedAction !== 'delete') {
      this.formData.append('id', this.anime.id.toString());  
      this.formData.append('title', this.anime.title);
      this.formData.append('episodes', this.anime.episodes.toString());
      this.formData.append('episodeDuration', this.anime.episodeDuration.toString());
      this.formData.append('animeType', this.anime.animeType);
      this.formData.append('animeStatus', this.anime.animeStatus);
      this.formData.append('releaseDate', this.anime.releaseDate.toString());
      
      if(this.anime.posterUrl){
        this.formData.append('posterUrl', this.anime.posterUrl);
      }
      if(this.anime.trailerUrl){
        this.formData.append('trailerUrl', this.anime.trailerUrl);
      }

      this.anime.genres.forEach((genre, i) => {
          this.formData.append(`genres[${i}].id`, genre.id.toString());
          this.formData.append(`genres[${i}].name`, genre.name);
      });

      if(this.selectedAction === 'create'){
        var result = this.animeService.create(this.formData);
      }
      else{
        this.animeService.update(this.formData);
      } 
    } 
    else { 
      this.animeService.delete(this.idToDelete);
    }
  }
  
  isChecked(genreId: number) {
    return this.anime.genres.filter(g => g.id === genreId).length > 0;
  }

  updateGenres(genreId: number, $event) {
    if ($event.target.checked) {
        this.anime.genres.push(this.genres.find(g => g.id === genreId)!);
    } else {
        this.anime.genres = this.anime.genres.filter(g => g.id !== genreId);
    }
  }
}
