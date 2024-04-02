import { Component, OnInit} from '@angular/core';
import { MovieService} from '../../services/movie.service';
import { Movie } from 'src/models/Movie';
import { MovieOptions } from 'src/models/MovieOptions';
import { MovieFilter } from 'src/models/Filter/MovieFilter';

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
        this.movieService.getAll(this.filter).subscribe(newMovies => {
           this.movies = [...this.movies, ...newMovies];
           this.loading = false;
        });      
    }

    updateGenres($event) {
        const id = $event.target.value;
        const isChecked = $event.target.checked;

        this.movieOptions.genres.map((g) => {
            if(g.id == id){
                g.checked = isChecked;
                return g;
            }
            return g;
        });
        this.filter.genres = this.movieOptions.genres;
        this.load(true);
    } 

    displayInfo() {
      this.showInfo = true;
    }
    
    hideInfo() {
      this.showInfo = false;
    }
}



            