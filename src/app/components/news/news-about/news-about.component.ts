import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from 'src/app/Services/ImageService';
import { News } from 'src/models/News';
import { CommentService } from '../../comment/comment.service';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-news-about',
  templateUrl: './news-about.component.html',
  styleUrls: ['./news-about.component.css']
})
export class NewsAboutComponent implements OnInit{
  news: News;
  currentUserId = localStorage.getItem("userId");

  constructor(public newsService: NewsService, public imageService: ImageService, private route: ActivatedRoute){
    
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.newsService.get(id).subscribe(response =>{
        this.news = response;
      });
    });
  }

  deleteNews(){
    this.newsService.delete(this.news.id);
  }
}
