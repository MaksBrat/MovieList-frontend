import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { NotificationService } from 'src/app/services/NotificationService';
import { MessageResponseModel } from 'src/models/DTO/ResponseModels/MessageResponseModel';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    
    private readonly chatUrl = 'https://localhost:7003/api/Chat';

    constructor(private http: HttpClient) { 

    }

    getChatMessages(pageIndex: number, pageSize: number){       
        const params = new HttpParams()
            .set('pageIndex', pageIndex.toString())
            .set('pageSize', pageSize.toString());

        return this.http.get<MessageResponseModel[]>(this.chatUrl + '/getChatMessages/?' + params);
    }
}