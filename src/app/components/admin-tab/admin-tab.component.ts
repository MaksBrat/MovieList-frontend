import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { throws } from 'assert';
import { NotificationService } from 'src/app/services/NotificationService';
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

  anime = new Anime();
  idToDelete: number;   

  animeOptions = new AnimeOptions();

  genres = this.animeOptions.genres;  
  animeTypes = this.animeOptions.animeTypes;
  animeStatus = this.animeOptions.animeStatus;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<AdminTabComponent>, 
    private animeService: AnimeService, public accountService: AccountService){
      this.selectedAction = data.selectedAction;
      if(data.selectedAction === 'create'){
        this.anime.genres = [];       
      }
      else if(data.selectedAction === 'update'){ 
        this.anime = data.anime;
      }
      else if(data.selectedAction === 'delete'){ 
        this.idToDelete = data.id
      }
  }

  onSubmit() {
    this.dialogRef.close();
    if (this.selectedAction === 'create' ) {
      this.animeService.create(this.anime);
    }
    else if(this.selectedAction === 'update'){
        this.animeService.update(this.anime);
    }
    else{    
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
