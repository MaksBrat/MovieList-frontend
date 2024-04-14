import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/models/movie/movie';
import { MovieOptions } from 'src/models/options/movie-options';
import { MovieFilter } from 'src/models/filter/movie-filter';
import { News } from 'src/models/news/news';
import { MovieService } from '../../services/movie.service';
import { NewsService } from '../../services/news.service';
import { MovieListService } from 'src/app/services/movie-list.service';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { NewsFilter } from 'src/models/filter/news-filter';

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
    { img: 'https://wallpapercave.com/wp/wp3849097.jpg' },
    { img: 'https://wallpapercave.com/wp/MeaAKvn.jpg' },
    { img: 'https://images7.alphacoders.com/112/1123161.jpg' },
    { img: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/093387e1-a050-402f-ad20-7f08e1f0432b/d902u5x-e635c9bd-a19b-4ba8-84e8-284177ce4dfe.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzA5MzM4N2UxLWEwNTAtNDAyZi1hZDIwLTdmMDhlMWYwNDMyYlwvZDkwMnU1eC1lNjM1YzliZC1hMTliLTRiYTgtODRlOC0yODQxNzdjZTRkZmUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.kn0Zy2VKduSUH_8O4UcjPDGmhE-fKmbj8XymGMoJeYk' },
    { img: 'https://images2.alphacoders.com/114/1144782.jpg' },
    { img: 'https://images5.alphacoders.com/109/1092637.jpg' },
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
    filter.take = 8;

    this.movieService.getAll(filter).subscribe(result => {
      this.topMovie = result;
    });
  }

  getUpcomingMovie(){
    var filter = new MovieFilter();

    filter.movieStatus = 'Upcoming';
    filter.orderBy = "ReleaseDate";
    filter.ascOrDesc = "DESC"
    filter.take = 8;

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
