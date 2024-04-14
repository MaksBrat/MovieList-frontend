import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/models/movie/movie';
import { AccountService } from '../../services/account.service';
import { MovieService } from '../../services/movie.service';
import { TrailerComponent } from '../../common/modals/trailer/trailer.component';
import { MovieListService } from 'src/app/services/movie-list.service';
import { MovieAdminTabModal } from 'src/app/common/modals/admin-tab/movie/movie-admin-tab.modal';
import { UrlOptions } from 'src/models/options/url-options';

@Component({
  selector: 'app-movie-about',
  templateUrl: './movie-about.component.html',
  styleUrls: ['./movie-about.component.css']
})
export class MovieAboutComponent implements OnInit {
  movie: Movie;
  selectedAction = '';
  isMovieInUserList: boolean;

  constructor(public movieService: MovieService, public accountService: AccountService, 
    public dialog: MatDialog, private sanitizer: DomSanitizer, private route: ActivatedRoute,
    public router: Router, private movieListService: MovieListService ){
      
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.movieService.get(id).subscribe(response =>{
        this.movie = response;
      });
      this.movieListService.isMovieInList(id).subscribe(response => {
        this.isMovieInUserList = response;
      });
    });
  }

  openTrailer(){
    const dialogRef = this.dialog.open(TrailerComponent, {
      data: {url: this.sanitizer.bypassSecurityTrustResourceUrl(this.movie.trailerUrl)
    }});
  }

  openIMDb() {
    window.open(`${UrlOptions.TmdbUrl}${this.movie.tmdbId}`, '_blank');
  }

  openCreateDialog() {
    this.openDialog({ selectedAction: this.selectedAction });
  }
  
  openUpdateDialog() {
    this.openDialog({ movie: this.movie, selectedAction: this.selectedAction });
  }
  
  openDeleteDialog() {
    this.openDialog({ id: this.movie.id, selectedAction: this.selectedAction });
  }

  openDialog(data: any) {
    const dialogRef = this.dialog.open(MovieAdminTabModal, {
      data: data
    });
  }

  addMovieToList(movieId){
    this.toggleMovieInList(movieId, true);
  }

  deleteMovieFromList(movieId){
    this.toggleMovieInList(movieId, false);
  }

  toggleMovieInList(movieId: number, addToList: boolean) {
    if (!this.accountService.isUserAuthenticated()){
      this.router.navigate(['/login']);
    }
    this.isMovieInUserList = addToList;
    if (addToList) {
      this.movieListService.add(movieId);
    } else {
      this.movieListService.delete(movieId);
    }
  }
}


