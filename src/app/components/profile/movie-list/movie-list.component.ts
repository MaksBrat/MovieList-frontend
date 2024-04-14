import { Component } from '@angular/core';
import { MovieListService } from 'src/app/services/movie-list.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MovieListItem } from 'src/models/movie-list-item/movie-list-item';
import { MovieOptions } from 'src/models/options/movie-options';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],

  providers: [ProfileService]
})
export class MovieListComponent {
  public movieList: MovieListItem[];

  isEmpty = false;

  movieOptions = new MovieOptions();

  movieStatus = this.movieOptions.moieStatusInUserList;

  constructor(public movieListService: MovieListService, private notificationService: NotificationService){
    movieListService.get().subscribe(result =>{
      this.movieList = result;
      if(result.length == 0){
        this.isEmpty = true;
      }
    })
  }

  onInput(event: any) {
    if (!event.target.value) {
      event.target.value = null;
    }
  }

  updateMovieItem(movieUpdated: MovieListItem, episodesInMovie?: number){
    if((movieUpdated.userRating < 1 || movieUpdated.userRating > 10) && movieUpdated.userRating != null){
      this.notificationService.riseNotification({
        message: 'Rating must be between 1 and 10',
        type: 'error'
      });
      return;
    }

    if(movieUpdated.watchedEpisodes > episodesInMovie){
      this.notificationService.riseNotification({
        message: 'Episodes must be between 1 and the total number of episodes in the movie',
        type: 'error'
      });
      return;
    }

    this.movieListService.update(movieUpdated);
  }

  deleteMovieFromList(movieId: number){
    this.movieList = this.movieList.filter(item => item.movie.id !== movieId);    
    this.movieListService.delete(movieId);
  }
}
