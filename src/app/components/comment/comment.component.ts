import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { AvatarUtility } from 'src/app/common/utility/avatar.utility';
import { Comment } from 'src/models/news/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit{
  @Input() contentId: number;

  comments: Comment[];
  newComment = new Comment();
  currentUserId = localStorage.getItem("userId");

  constructor(public commentService: CommentService){
  }

  ngOnInit(): void {
    this.commentService.getAll(this.contentId).subscribe(response => {
      response.map(x => x.avatarUrl = AvatarUtility.buildAvatarUrl(x.avatarUrl));
      this.comments = response;
    });
    this.newComment.contentId = this.contentId;
  }

  addComment(){
    this.commentService.create(this.newComment);
  }

  deleteComment(id: number){
    this.commentService.delete(id);
  }
}
