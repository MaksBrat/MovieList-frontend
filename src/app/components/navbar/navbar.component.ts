import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Anime } from 'src/models/Anime';
import { Filter } from 'src/models/RequestModels/Search/Filter';
import { AccountService } from '../account/account.Service';
import { AuthGuard } from '../account/authGuard.service';
import { LoginService } from '../account/login/login.service';
import { AnimeComponent } from '../anime/anime.component';
import { AnimeService } from '../anime/anime.service';

@Component({
    selector: 'navigation',
    templateUrl: './navbar.component.html',
    styleUrls: ["./navbar.component.css"],
    
})
export class NavBarComponent implements OnInit {
  animes: Anime[] = [];
  filter = new Filter();

  displayCount = 5;
  searchFormVisible = false;
  value = "";

  constructor(public accountService: AccountService, public animeService: AnimeService, 
    private renderer: Renderer2,private router: Router){
    this.animeService.currentPage = "CurrentPage";
    this.filter.searchQuery = "";

  }  

  ngOnInit(){
    this.animeService.invokeEvent.subscribe(value =>{
      if(this.animeService.currentPage != "AnimePage"){
        this.filter.searchQuery = value;
        this.animeService.getAll(this.filter).subscribe(animes => 
          {this.animes = animes, console.log(animes)}); 
          this.searchFormVisible = true;  
      }    
    }); 

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.value = ""; // for reset search input value
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = document.getElementById("navbar");
    if (document.documentElement.scrollTop > 0) {
        this.renderer.setStyle(navbar, 'background-color', '#212226');
    } else {
        this.renderer.setStyle(navbar, 'background-color', 'transparent');
    }
  }

  closeSearch(){
    this.searchFormVisible = false;
  }

}