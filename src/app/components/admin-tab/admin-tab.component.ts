import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { throws } from 'assert';
import { NotificationService } from 'src/app/services/notification.service';
import { Movie } from 'src/models/Movie';
import { MovieOptions } from 'src/models/MovieOptions';
import { AccountService } from '../../services/account.service';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-admin-tab',
  templateUrl: './admin-tab.component.html',
  styleUrls: ['./admin-tab.component.css']
})
export class AdminTabComponent {
  formData = new FormData();
  selectedAction = '';

  movie = new Movie();
  idToDelete: number;   

  movieOptions = new MovieOptions();

  genres = this.movieOptions.genres;  
  movieTypes = this.movieOptions.movieTypes;
  movieStatus = this.movieOptions.movieStatus;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<AdminTabComponent>, 
    private movieService: MovieService, public accountService: AccountService){
      this.selectedAction = data.selectedAction;
      if(data.selectedAction === 'create'){
        this.movie.genres = [];       
      }
      else if(data.selectedAction === 'update'){ 
        this.movie = data.movie;
      }
      else if(data.selectedAction === 'delete'){ 
        this.idToDelete = data.id
      }
  }

  onSubmit() {
    this.dialogRef.close();
    if (this.selectedAction === 'create' ) {
      this.movieService.create(this.movie);
    }
    else if(this.selectedAction === 'update'){
        this.movieService.update(this.movie);
    }
    else{    
      this.movieService.delete(this.idToDelete);
    } 
  }
  
  isChecked(genreId: number) {
    return this.movie.genres.filter(g => g.id === genreId).length > 0;
  }

  updateGenres(genreId: number, $event) {
    if ($event.target.checked) {
        this.movie.genres.push(this.genres.find(g => g.id === genreId)!);
    } else {
        this.movie.genres = this.movie.genres.filter(g => g.id !== genreId);
    }
  }
}
