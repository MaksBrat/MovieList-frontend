import { Component, Directive, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Movie } from 'src/models/Movie';
import { MovieFilter } from 'src/models/Filter/MovieFilter';
import { AccountService } from '../../services/account.service';
import { MovieService } from '../../services/movie.service';

@Component({
    selector: 'navigation',
    templateUrl: './navbar.component.html',
    styleUrls: ["./navbar.component.css"],
})
export class NavBarComponent implements OnInit {
  movies: Movie[] = [];
  filter = new MovieFilter();

  @ViewChild('searchContainer', { static: false }) searchContainer: ElementRef;

  displayCount = 5;
  resultVisible = false;
  value = "";

  constructor(public accountService: AccountService, public movieService: MovieService, 
    private renderer: Renderer2){
    this.movieService.currentPage = "CurrentPage";
    this.filter.searchQuery = "";
  }  

  ngOnInit(){
    this.movieService.invokeEvent.subscribe(value =>{
      
      if(this.movieService.currentPage != "MoviePage"){ 
        this.filter.searchQuery = value;      
        this.movieService.getAll(this.filter).subscribe(movies => this.movies = movies); 
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

