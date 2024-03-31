import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';
import { Comment } from 'src/models/Comment';
import { UrlOptions } from 'src/models/UrlOptions';

@Injectable({
    providedIn: 'root'
})
export class CommentService{
    commentUrl = UrlOptions.BaseUrl + 'api/Comment';

    currentUserId = localStorage.getItem("userId");

    constructor(private http: HttpClient, private notificationService: NotificationService,
        private router: Router){
        
    }
        
    create(comment: Comment){
        return this.http.post<Comment>(this.commentUrl, comment)
            .pipe(
                tap(response => {
                    this.notificationService.riseNotification({
                        message: 'Comment created successfully!',
                        type: 'success'
                    });
                }),
                catchError(error => {
                    this.notificationService.riseNotification({
                        message: 'Error creating comment',
                        type: 'error'
                    });
                    return of(error);
                })
            ).subscribe();
    }

    getAll(newsId: number){
        return this.http.get<Comment[]>(this.commentUrl + '/getAllByNewsId/'+ newsId);
    }

    update(comment: Comment){
        return this.http.post<Comment>(this.commentUrl, comment)
        .pipe(
            tap(response => {
                this.notificationService.riseNotification({
                    message: 'Comment updated successfully!',
                    type: 'success'
                });
            }),
            catchError(error => {
                this.notificationService.riseNotification({
                    message: 'Error updating comment',
                    type: 'error'
                });
                return of(error);
            })
        ).subscribe();
    }

    delete(id: number){
        return this.http.delete(`${this.commentUrl}/${id}`)
        .pipe(
            tap(response => {
                this.notificationService.riseNotification({
                    message: 'Comment delete successfully!',
                    type: 'success'
                });
            }),
            catchError(error => {
                this.notificationService.riseNotification({
                    message: 'Error delete comment',
                    type: 'error'
                });
                return of(error);
            })
        ).subscribe();
    } 
}