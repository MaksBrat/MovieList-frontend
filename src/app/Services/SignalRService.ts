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
  
  private readonly chatUrl = 'https://localhost:7003/api/Chat';
  
  constructor(public http: HttpClient, public notificationService: NotificationService){
    this.hubConnection = new signalR.HubConnectionBuilder()
              .withUrl('https://localhost:7003/chatHub', {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
              })
              .withAutomaticReconnect()
              .build();

    this.hubConnection.start().catch(err => console.error(err.toString()));
  }
}