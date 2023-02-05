import { Component, OnInit} from '@angular/core';
import { AnimeService} from './anime.service';
import { Anime } from 'src/models/Anime';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { relative } from 'path';
import { DomSanitizer } from '@angular/platform-browser';
import { runInThisContext } from 'vm';
import { Genre } from 'src/models/Genre';
import { Filter } from 'src/models/RequestModels/Search/Filter';
import { Sorting } from 'src/models/RequestModels/Search/Sorting';
import { ImageService } from 'src/app/Services/ImageService';
import { AnimeOptions } from 'src/models/AnimeOptions';

@Component({
    selector: 'anime',
    templateUrl: './anime.component.html',
    styleUrls: ["./anime.component.css"],
})

export class AnimeComponent implements OnInit{ 
    animes: Anime[] = [];
    showInfo = false;
    
    filter = new Filter();
    animeOptions = new AnimeOptions();

    genres = this.animeOptions.genres;  
    animeTypes = this.animeOptions.animeTypes;
    animeStatus = this.animeOptions.animeStatus;
    orderBy =this.animeOptions.orderBy;

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

     

    load(filter: Filter){
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



            