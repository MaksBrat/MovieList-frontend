import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { News } from 'src/models/News';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-createnews',
  templateUrl: './createNews.component.html',
  styleUrls: ['./createNews.component.css']
})
export class CreatenewsComponent {
  news = new News();

  constructor(public newsService: NewsService){

  }

  onSubmit() {
    this.newsService.create(this.news);
  }
}
