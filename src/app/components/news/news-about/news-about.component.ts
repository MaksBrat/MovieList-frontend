import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AvatarUtility } from 'src/app/common/utility/avatar.utility';
import { News } from 'src/models/news/news';
import { NewsService } from '../../../services/news.service';

@Component({
  selector: 'app-news-about',
  templateUrl: './news-about.component.html',
  styleUrls: ['./news-about.component.css']
})
export class NewsAboutComponent implements OnInit{
  news: News;
  currentUserId = localStorage.getItem("userId");

  constructor(public newsService: NewsService, private route: ActivatedRoute){
    
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.newsService.get(id).subscribe(response =>{
        this.news = response;
        this.news.avatarUrl = AvatarUtility.buildAvatarUrl(this.news.avatarUrl);
      });
    });
  }

  deleteNews(){
    this.newsService.delete(this.news.id);
  }
}
