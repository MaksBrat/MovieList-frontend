import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';
import { NotificationService } from 'src/app/Services/NotificationService';
import { Router } from '@angular/router';
import { Comment } from 'src/models/Comment';

@Injectable({
    providedIn: 'root'
  })
export class CommentService{
    commentUrl = 'https://localhost:7003/api/Comment';
    currentUserId = localStorage.getItem("userId");
    
    constructor(private http: HttpClient, private notificationService: NotificationService,
        private router: Router){
        
    }
        
    create(comment: Comment){
        console.log(comment);
        return this.http.post<Comment>(this.commentUrl + '/create', comment)
            .pipe(
                tap(response => {
                    this.notificationService.addNotification({
                        message: 'Comment created successfully!',
                        type: 'success'
                    });
                }),
                catchError(error => {
                    this.notificationService.addNotification({
                        message: 'Error creating comment',
                        type: 'error'
                    });
                    return of(error);
                })
            ).subscribe();
    }

    getAll(newsId: number){
        return this.http.get<any>(this.commentUrl + '/getAll/'+ newsId);
    }

    update(comment: Comment){
        return this.http.post<Comment>(this.commentUrl + '/edit', comment)
        .pipe(
            tap(response => {
                this.notificationService.addNotification({
                    message: 'Comment updated successfully!',
                    type: 'success'
                });
            }),
            catchError(error => {
                this.notificationService.addNotification({
                    message: 'Error updating comment',
                    type: 'error'
                });
                return of(error);
            })
        ).subscribe();
    }

    delete(id: number){
        return this.http.delete(this.commentUrl + '/delete/' + id)
        .pipe(
            tap(response => {
                this.notificationService.addNotification({
                    message: 'Comment delete successfully!',
                    type: 'success'
                });
            }),
            catchError(error => {
                this.notificationService.addNotification({
                    message: 'Error delete comment',
                    type: 'error'
                });
                return of(error);
            })
        ).subscribe();
    } 
}