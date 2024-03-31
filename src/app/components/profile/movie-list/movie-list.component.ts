import { Component } from '@angular/core';
import { MovieListService } from 'src/app/services/movie-list.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MovieListItem } from 'src/models/MovieListItem';
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

  movieStatus = [
    {name: 'Watched'},
    {name: 'Watching'},
    {name: 'WantToWatch'},
    {name: 'Stalled'},
    {name: 'Dropped'},
  ]

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
    if(movieUpdated.userRating <= 1 && movieUpdated.userRating >= 10){
      this.notificationService.riseNotification({
        message: 'Rating must be between 1 and 10',
        type: 'error'
      });
      return;
    }

    console.log(movieUpdated.watchedEpisodes);

    if(movieUpdated.watchedEpisodes > episodesInMovie){
      this.notificationService.riseNotification({
        message: 'Episodes must be between 1 and the total number of episodes in the movie series',
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
