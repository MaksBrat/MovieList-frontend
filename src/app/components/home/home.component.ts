import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/models/Movie';
import { MovieOptions } from 'src/models/MovieOptions';
import { MovieFilter } from 'src/models/Filter/MovieFilter';
import { NewsFilter } from 'src/models/Filter/NewsFilter';
import { News } from 'src/models/News';
import { MovieService } from '../../services/movie.service';
import { NewsService } from '../../services/news.service';
import { MovieListService } from 'src/app/services/movie-list.service';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movieOptions = new MovieOptions();

  ongoingMovie: Movie[];
  upcomingMovie: Movie[];
  topMovie: Movie[];
  news: News[];

  isMovieInUserList: { [movieId: string]: boolean } = {};

  //Just for example slides
  slides = [
    { img: 'https://img.zorores.com/_r/1366x768/100/58/d0/58d0b99666b285d2c484fec5dfaa23f0/58d0b99666b285d2c484fec5dfaa23f0.jpg' },
    { img: 'https://img.zorores.com/_r/1366x768/100/a8/f1/a8f13cd393e9f17c64d90c9fa6e79cdd/a8f13cd393e9f17c64d90c9fa6e79cdd.jpg' },
    { img: 'https://img.zorores.com/_r/1366x768/100/a1/2b/a12b53c5fb76bad339bfb2808b607ffd/a12b53c5fb76bad339bfb2808b607ffd.jpg' },
    { img: 'https://img.zorores.com/_r/1366x768/100/9d/72/9d728e112dc3732b0b6d56ca9fa69cc8/9d728e112dc3732b0b6d56ca9fa69cc8.jpg' },
    { img: 'https://img.zorores.com/_r/1366x768/100/33/d9/33d9bbf870518a5e551653245218ba62/33d9bbf870518a5e551653245218ba62.jpg' },
    { img: 'https://img.zorores.com/_r/1366x768/100/8e/18/8e18cd08d3109c8293b6bce1f15abdbb/8e18cd08d3109c8293b6bce1f15abdbb.jpg' },
  ];

  slideConfig = { 
    slidesToShow: 1, 
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    waitForAnimate: true,
  };

  constructor(public movieService: MovieService, public newsService: NewsService,
              public movieListService: MovieListService, public accountService: AccountService, public router: Router,) {}

  ngOnInit(): void {
    this.getOngoingMovie();
    this.getUpcomingMovie();
    this.getTopMovie();
    this.getNews();
    this.getUserMovieList();
  }

  getOngoingMovie(){
    var filter = new MovieFilter();

    filter.movieStatus = 'Ongoing';
    filter.orderBy = "ReleaseDate";
    filter.ascOrDesc = "DESC"
    filter.take = 6;

    this.movieService.getAll(filter).subscribe(result => {
      this.ongoingMovie = result;
      this.getUserMovieList();
    });
  }

  getUserMovieList(){
    this.movieListService.get().subscribe(userMovieList => {
        this.ongoingMovie.forEach(movie => {
          this.isMovieInUserList[movie.id] = userMovieList.some(userMovie => userMovie.movie.id === movie.id);
      });
    });
  }

  getTopMovie(){
    var filter = new MovieFilter();

    filter.movieStatus = 'Finished';
    filter.orderBy = "Rating";
    filter.ascOrDesc = "DESC"
    filter.take = 5;

    this.movieService.getAll(filter).subscribe(result => {
      this.topMovie = result;
    });
  }

  getUpcomingMovie(){
    var filter = new MovieFilter();

    filter.movieStatus = 'Upcoming';
    filter.orderBy = "ReleaseDate";
    filter.ascOrDesc = "DESC"
    filter.take = 5;

    this.movieService.getAll(filter).subscribe(result => {
      this.upcomingMovie = result;
    });
  }

  getNews(){
    var filter = new NewsFilter()

    filter.orderBy = "DateCreated";
    filter.ascOrDesc = "DESC"
    filter.take = 10;

    this.newsService.getAll(filter).subscribe(result => {
      this.news = result;
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
    this.isMovieInUserList[movieId] = addToList;
    if (addToList) {
      this.movieListService.add(movieId);
    } else {
      this.movieListService.delete(movieId);
    }
  }
}
