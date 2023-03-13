import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from './comment.service';
import { Comment } from 'src/models/Comment';

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

  constructor(public commentService: CommentService){
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
