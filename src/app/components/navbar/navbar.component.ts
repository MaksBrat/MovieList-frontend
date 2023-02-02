import { Component, HostListener, OnInit, Renderer2} from '@angular/core';
import { Anime } from 'src/entity/Anime';
import { Filter } from 'src/entity/RequestModels/Search/Filter';
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

  constructor(public accountService: AccountService, public animeService: AnimeService, private renderer: Renderer2){
    this.animeService.currentPage = "CurrentPage";
    this.filter.searchQuery = "";
  }  

  ngOnInit(){
    this.animeService.invokeEvent.subscribe(value =>{
      if(this.animeService.currentPage != "AnimePage"){
        this.filter.searchQuery = value;
        this.load(this.filter);
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

  load(filter: Filter){
    this.animeService.getAll(filter).subscribe(animes => 
      {this.animes = animes, console.log(animes)});      
  }
}