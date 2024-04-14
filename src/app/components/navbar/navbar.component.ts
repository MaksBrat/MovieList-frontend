import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Movie } from 'src/models/movie/movie';
import { MovieFilter } from 'src/models/filter/movie-filter';
import { AccountService } from '../../services/account.service';
import { MovieService } from '../../services/movie.service';
import { Location } from '@angular/common';

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
    private renderer: Renderer2, private location: Location){
    this.filter.searchQuery = "";
  }  

  ngOnInit(){
      this.movieService.invokeEvent.subscribe(value => {
        if(this.location.path()!= "/movie"){
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

  logout(){
    this.accountService.logout();
    window.location.reload();
  }
}

