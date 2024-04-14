import { Component } from '@angular/core';
import { News } from 'src/models/news/news';
import { NewsService } from '../../../services/news.service';

@Component({
  selector: 'app-createnews',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css']
})
export class CreatenewsComponent {
  news = new News();

  constructor(public newsService: NewsService){

  }

  onSubmit() {
    this.newsService.create(this.news);
  }
}
