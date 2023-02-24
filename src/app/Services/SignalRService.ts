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
  
  private readonly chatUrl = 'http://mbmaksbrat-001-site1.itempurl.com/api/Chat';
  
  constructor(public http: HttpClient, public notificationService: NotificationService){
    this.hubConnection = new signalR.HubConnectionBuilder()
              .withUrl('http://mbmaksbrat-001-site1.itempurl.com/chatHub', {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
              })
              .withAutomaticReconnect()
              .build();

    this.hubConnection.start().catch(err => console.error(err.toString()));
  }
}