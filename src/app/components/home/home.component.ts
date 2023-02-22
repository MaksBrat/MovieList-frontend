import { Component, OnInit } from '@angular/core';
import { Anime } from 'src/models/Anime';
import { AnimeOptions } from 'src/models/AnimeOptions';
import { AnimeFilter } from 'src/models/Filter/AnimeFilter';
import { BaseFilter } from 'src/models/Filter/Base/BaseFilter';
import { NewsFilter } from 'src/models/Filter/NewsFilter';
import { News } from 'src/models/News';
import { AnimeService } from '../anime/anime.service';
import { NewsService } from '../news/news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  animeOptions = new AnimeOptions();

  ongoingAnime: Anime[];
  upcomingAnime: Anime[];
  topAnime: Anime[];
  news: News[];

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
    waitForAnimate: true,
  };

  constructor(public animeService: AnimeService, public newsService: NewsService) {}

  ngOnInit(): void {
    this.getOngoingAnime();
    this.getUpcomingAnime();
    this.getTopAnime();
    this.getNews();
  }

  getOngoingAnime(){
    var filter = new AnimeFilter();

    filter.animeStatus = 'Ongoing';
    filter.orderBy = "ReleaseDate";
    filter.ascOrDesc = "DESC"
    filter.take = '6';

    this.animeService.getAll(filter).subscribe(result => {
      this.ongoingAnime = result;
    });
  }

  getTopAnime(){
    var filter = new AnimeFilter();

    filter.animeStatus = 'Finished';
    filter.orderBy = "Rating";
    filter.ascOrDesc = "DESC"
    filter.take = '5';

    this.animeService.getAll(filter).subscribe(result => {
      this.topAnime = result;
    });
  }

  getUpcomingAnime(){
    var filter = new AnimeFilter();

    filter.animeStatus = 'Upcoming';
    filter.orderBy = "ReleaseDate";
    filter.ascOrDesc = "DESC"
    filter.take = '5';

    this.animeService.getAll(filter).subscribe(result => {
      this.upcomingAnime = result;
    });
  }

  getNews(){
    var filter = new NewsFilter()

    filter.orderBy = "DateCreated";
    filter.ascOrDesc = "DESC"
    filter.take = '10';

    this.newsService.getAll(filter).subscribe(result => {
      this.news = result;
    });
  }
}
