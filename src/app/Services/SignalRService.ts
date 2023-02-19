import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as signalR from '@microsoft/signalr';
import { catchError, of, Subject, tap } from "rxjs";
import { MessageRequestModel } from "src/models/DTO/RequestModels/MessageRequestModel";
import { MessageResponseModel } from "src/models/DTO/ResponseModels/MessageResponseModel";
import { NotificationService } from "./NotificationService";

@Injectable({
    providedIn: 'root'
  })
export class SignalRService{
  public hubConnection: signalR.HubConnection;
  private messageSubject = new Subject<MessageResponseModel>();
  
  private readonly chatUrl = 'https://localhost:7003/api/Chat';
  
  constructor(public http: HttpClient, public notificationService: NotificationService){
    this.hubConnection = new signalR.HubConnectionBuilder()
              .withUrl('https://localhost:7003/chatHub', {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
              })
              .withAutomaticReconnect()
              .build();

    this.hubConnection.on('ReceiveMessage', (message: MessageResponseModel) => {
      this.messageSubject.next(message);
    });
    
    this.hubConnection.start().catch(err => console.error(err.toString()));
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

  public getMessageSubject(): Subject<MessageResponseModel> {
    return this.messageSubject;
  } 
}