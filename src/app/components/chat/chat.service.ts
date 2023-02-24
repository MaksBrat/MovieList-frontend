import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { NotificationService } from 'src/app/services/NotificationService';
import { MessageRequestModel } from 'src/models/DTO/RequestModels/MessageRequestModel';
import { MessageResponseModel } from 'src/models/DTO/ResponseModels/MessageResponseModel';
import { UrlOptions } from 'src/models/UrlOptions';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    
    private readonly chatUrl = UrlOptions.BaseUrl + 'api/Chat';

    constructor(private http: HttpClient, public notificationService: NotificationService) { 

    }

    public sendMessage(message: MessageRequestModel): void {
        this.http.post(this.chatUrl + '/send', message).subscribe();
      }
    
      deleteMessage(id){
        return this.http.delete(this.chatUrl + '/delete/' + id)
        .pipe(
            tap(response => {
                this.notificationService.addNotification({
                    message: 'Message deleted successfully!',
                    type: 'success'
                });
            }),
            catchError(error => {
                this.notificationService.addNotification({
                    message: 'Error delete anime',
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

        return this.http.get<MessageResponseModel[]>(this.chatUrl + '/getChatMessages/?' + params);
    }
}