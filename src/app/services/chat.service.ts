import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { MessageRequest } from 'src/models/message/message-request';
import { MessageResponse } from 'src/models/message/message-response';
import { UrlOptions } from 'src/models/options/url-options';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private readonly chatUrl = UrlOptions.BaseUrl + 'api/Chat';

    constructor(private http: HttpClient, public notificationService: NotificationService) { 

    }

    public sendMessage(message: MessageRequest): void {
        this.http.post(this.chatUrl, message).subscribe();
    }
    
    deleteMessage(id){
        return this.http.delete(`${this.chatUrl}/${id}`)
            .pipe(
                tap(response => {
                    this.notificationService.riseNotification({
                        message: 'Message deleted successfully!',
                        type: 'success'
                    });
                }),
                catchError(error => {
                    this.notificationService.riseNotification({
                        message: 'Error during deleting movie',
                        type: 'error'
                    });
                    return of(error);
                })
        ).subscribe();;
    }

    getChatMessages(pageIndex: number, pageSize: number){       
        const params = new HttpParams()
            .set('pageIndex', pageIndex.toString())
            .set('pageSize', pageSize.toString());

        return this.http.get<MessageResponse[]>(`${this.chatUrl}/?${params}`);
    }
}