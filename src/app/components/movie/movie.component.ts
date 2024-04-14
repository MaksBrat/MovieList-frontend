import { Component, OnInit} from '@angular/core';
import { MovieService} from '../../services/movie.service';
import { Movie } from 'src/models/movie/movie';
import { MovieOptions } from 'src/models/options/movie-options';
import { MovieFilter } from 'src/models/filter/movie-filter';

@Component({
    selector: 'movie',
    templateUrl: './movie.component.html',
    styleUrls: ["./movie.component.css"],
})

export class MovieComponent implements OnInit{ 
    movies: Movie[] = [];
    showInfo = false;
    
    filter = new MovieFilter();
    movieOptions = new MovieOptions();

    loading = false;

    constructor(public movieService: MovieService){     
        this.load();
    }
    
    ngOnInit(){
        this.filter.genres = [];
        this.movieService.invokeEvent.subscribe(value =>{
            this.filter.searchQuery = value;
            this.load(true);
        }); 
    }

    onScroll(){
        this.filter.pageIndex++;   
        this.load();
    }

    load(isNewSearch: boolean = false){
        if (isNewSearch) {
            this.filter.pageIndex = 0;
            this.movies = [];
        }
        
        this.loading = true;
        console.log(this.filter);
        this.movieService.getAll(this.filter).subscribe(newMovies => {        
            this.movies = [...this.movies, ...newMovies];
            this.loading = false;
        });      
    }
    
    updateGenres(genreId: number, $event) {
        if ($event.target.checked) {
            console.log(this.filter.genres);
            this.filter.genres.push(this.movieOptions.genres.find(g => g.id === genreId)!);
        } else {
            this.filter.genres  = this.filter.genres.filter(g => g.id !== genreId);
        }

        this.load(true);
    } 

    displayInfo() {
      this.showInfo = true;
    }
    
    hideInfo() {
      this.showInfo = false;
    }
}



            