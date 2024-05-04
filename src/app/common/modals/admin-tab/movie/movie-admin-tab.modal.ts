import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from 'src/app/services/account.service';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/models/movie/movie';
import { MovieOptions } from 'src/models/options/movie-options';

@Component({
  selector: 'app-admin-tab',
  templateUrl: './movie-admin-tab.modal.html',
  styleUrls: ['./movie-admin-tab.modal.css']
})
export class MovieAdminTabModal {
  formData = new FormData();
  selectedAction = '';

  movie = new Movie();
  idToDelete: number;   

  movieOptions = new MovieOptions();

  genres = this.movieOptions.genres;  
  movieTypes = this.movieOptions.movieTypes;
  movieStatus = this.movieOptions.movieStatus;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<MovieAdminTabModal>, 
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
