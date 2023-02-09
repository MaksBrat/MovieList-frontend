import { Component, OnInit} from '@angular/core';
import { AnimeService} from './anime.service';
import { Anime } from 'src/models/Anime';
import { AnimeOptions } from 'src/models/AnimeOptions';
import { AnimeFilter } from 'src/models/Filter/AnimeFilter';

@Component({
    selector: 'anime',
    templateUrl: './anime.component.html',
    styleUrls: ["./anime.component.css"],
})

export class AnimeComponent implements OnInit{ 
    animes: Anime[] = [];
    showInfo = false;
    
    filter = new AnimeFilter();
    animeOptions = new AnimeOptions();

    genres = this.animeOptions.genres;  
    animeTypes = this.animeOptions.animeTypes;
    animeStatus = this.animeOptions.animeStatus;
    orderBy = this.animeOptions.orderBy;

    constructor(public animeService: AnimeService){
        this.animeService.currentPage = "AnimePage"; 
        this.load(this.filter);
    }
    
    ngOnInit(){
        this.animeService.invokeEvent.subscribe(value =>{
            this.filter.searchQuery = value;
            this.load(this.filter);
        }); 
    }

    load(filter: AnimeFilter){
        this.animeService.getAll(filter).subscribe(animes => 
            {this.animes = animes, console.log(animes)});      
    }

    updateGenres($event) {
        const id = $event.target.value;
        const isChecked = $event.target.checked;

        this.genres.map((g) => {
            if(g.id == id){
                g.checked = isChecked;
                return g;
            }
            return g;
        });
        this.filter.genres = this.genres;
        this.load(this.filter);
    } 

    displayInfo() {
      this.showInfo = true;
    }
    
    hideInfo() {
      this.showInfo = false;
    }
}



            