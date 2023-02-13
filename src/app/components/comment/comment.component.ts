import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from './comment.service';
import { Comment } from 'src/models/Comment';
import { News } from 'src/models/News';
import { ImageService } from 'src/app/Services/ImageService';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit{
  @Input() newsId: number;

  comments: Comment[];
  userComment = new Comment(); //Comment to send
  currentUserId = localStorage.getItem("userId");

  constructor(public commentService: CommentService,public imageService: ImageService){
  }

  ngOnInit(): void {
    this.commentService.getAll(this.newsId).subscribe(response =>{
      this.comments = response;
    });
    this.userComment.newsId = this.newsId;
  }

  addComment(){
    this.commentService.create(this.userComment);
  }

  deleteComment(id: number){
    this.commentService.delete(id);
  }
}
