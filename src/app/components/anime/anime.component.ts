import { Component, OnInit} from '@angular/core';
import { AnimeService} from './anime.service';
import {Anime} from '../../../entity/Anime';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { relative } from 'path';
import { DomSanitizer } from '@angular/platform-browser';
import { runInThisContext } from 'vm';
import { Genre } from 'src/entity/Genre';
import { Filter } from 'src/entity/RequestModels/Search/Filter';
import { Sorting } from 'src/entity/RequestModels/Search/Sorting';
import { ImageService } from 'src/app/Services/ImageService';

@Component({
    selector: 'anime',
    templateUrl: './anime.component.html',
    styleUrls: ["./anime.component.css"],
})

export class AnimeComponent implements OnInit{ 
    animes: Anime[] = [];
    showInfo = false;
    filter = new Filter();

    //checkboxes
    genres = [
        {id: 1, name: 'Romance',  checked: false},
        {id: 2, name: 'Action',  checked: false},
        {id: 3, name: 'Drama',  checked: false},
        {id: 4, name: 'Military',  checked: false},
        {id: 5, name: 'Magic',  checked: false},
        {id: 6, name: 'Comedy',  checked: false},
        {id: 7, name: 'History',  checked: false},
        {id: 8, name: 'Psychological',  checked: false}
      ];

    animeTypes = [
        {name: 'Serial'},
        {name: 'Film'},
        {name: 'OVA'},
        {name: 'ONA'},
        {name: 'Special'},
    ];

    OrderBy = [
        {name: 'ReleaseDate'},
        {name: 'Title'},
        {name: 'Rating'},
    ]

    constructor(public animeService: AnimeService, private router: Router){
        this.animeService.currentPage = "AnimePage"; 
        this.load(this.filter);
    }
    
    ngOnInit(){
        this.animeService.invokeEvent.subscribe(value =>{
            this.filter.searchQuery = value;
            this.load(this.filter);
        }); 
    }

    selectAnime(anime: Anime){
        this.animeService.setSelectedAnime(anime);
        this.router.navigate(['/animeAbout']);     
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
}



            