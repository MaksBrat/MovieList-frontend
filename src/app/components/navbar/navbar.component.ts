import { Component, Directive, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Anime } from 'src/models/Anime';
import { AnimeFilter } from 'src/models/Filter/AnimeFilter';
import { AccountService } from '../account/account.Service';
import { AnimeService } from '../anime/anime.service';

@Component({
    selector: 'navigation',
    templateUrl: './navbar.component.html',
    styleUrls: ["./navbar.component.css"],
})
export class NavBarComponent implements OnInit {
  animes: Anime[] = [];
  filter = new AnimeFilter();

  @ViewChild('searchContainer', { static: false }) searchContainer: ElementRef;

  displayCount = 5;
  resultVisible = false;
  value = "";

  constructor(public accountService: AccountService, public animeService: AnimeService, 
    private renderer: Renderer2){
    this.animeService.currentPage = "CurrentPage";
    this.filter.searchQuery = "";
  }  

  ngOnInit(){
    this.animeService.invokeEvent.subscribe(value =>{
      
      if(this.animeService.currentPage != "AnimePage"){ 
        this.filter.searchQuery = value;      
        this.animeService.getAll(this.filter).subscribe(animes => 
          {this.animes = animes, console.log(animes)}); 
          this.resultVisible = true;  
      }    
    }); 
  }

  ngAfterViewInit() {
    this.renderer.listen('document', 'click', (event) => {
        if (!this.searchContainer.nativeElement.contains(event.target)) {
            this.resultVisible = false;
        }
    });
  }

  closeSearch(){
    this.resultVisible = false;
  } 

  //change navbar background   
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = document.getElementById("navbar");
    if (document.documentElement.scrollTop > 0) {
        this.renderer.setStyle(navbar, 'background-color', '#212226');
    } else {
        this.renderer.setStyle(navbar, 'background-color', 'transparent');
    }
  }
}

