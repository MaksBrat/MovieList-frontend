import { Component, OnInit } from '@angular/core';
import { Anime } from 'src/models/Anime';
import { AnimeOptions } from 'src/models/AnimeOptions';
import { Filter } from 'src/models/RequestModels/Search/Filter';
import { AnimeService } from '../anime/anime.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  filter = new Filter();
  animeOptions = new AnimeOptions();
  ongoingAnime: Anime[];
  upcomingAnime: Anime[];

  //Just for example slides
  slides = [
    { img: 'https://img.zorores.com/_r/1366x768/100/58/d0/58d0b99666b285d2c484fec5dfaa23f0/58d0b99666b285d2c484fec5dfaa23f0.jpg' },
    { img: 'https://img.zorores.com/_r/1366x768/100/a8/f1/a8f13cd393e9f17c64d90c9fa6e79cdd/a8f13cd393e9f17c64d90c9fa6e79cdd.jpg' },
    { img: 'https://img.zorores.com/_r/1366x768/100/a1/2b/a12b53c5fb76bad339bfb2808b607ffd/a12b53c5fb76bad339bfb2808b607ffd.jpg' },
    { img: 'https://img.zorores.com/_r/1366x768/100/9d/72/9d728e112dc3732b0b6d56ca9fa69cc8/9d728e112dc3732b0b6d56ca9fa69cc8.jpg' },
    { img: 'https://img.zorores.com/_r/1366x768/100/33/d9/33d9bbf870518a5e551653245218ba62/33d9bbf870518a5e551653245218ba62.jpg' },
    { img: 'https://img.zorores.com/_r/1366x768/100/8e/18/8e18cd08d3109c8293b6bce1f15abdbb/8e18cd08d3109c8293b6bce1f15abdbb.jpg' },
  ];

  slideConfig = { 
    slidesToShow: 1, 
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    waitForAnimate: false,
  };

  constructor(public animeService: AnimeService) {}

  ngOnInit(): void {
    this.getOngoingAnime();
    this.getUpcomingAnime();
  }

  getOngoingAnime(){
    this.filter.animeStatus = 'Ongoing';
    this.filter.orderBy = "ReleaseDate";
    this.filter.ascOrDesc = "DESC"
    this.filter.take = '6';
    this.animeService.getAll(this.filter).subscribe(result => {
      this.ongoingAnime = result;
    });
  }

  getUpcomingAnime(){
    this.filter.animeStatus = 'Upcoming';
    this.filter.orderBy = "ReleaseDate";
    this.filter.ascOrDesc = "DESC"
    this.filter.take = '9';
    this.animeService.getAll(this.filter).subscribe(result => {
      this.upcomingAnime = result;
    });
  }
}
