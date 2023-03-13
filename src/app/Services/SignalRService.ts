import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as signalR from '@microsoft/signalr';
import { UrlOptions } from "src/models/UrlOptions";
import { NotificationService } from "./NotificationService";

@Injectable({
    providedIn: 'root'
  })
export class SignalRService{
  public hubConnection: signalR.HubConnection;
  
  url = UrlOptions.BaseUrl + 'chatHub';

  constructor(public http: HttpClient, public notificationService: NotificationService){
    this.hubConnection = new signalR.HubConnectionBuilder()
              .withUrl(this.url, {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
              })
              .withAutomaticReconnect()
              .build();

    this.hubConnection.start().catch(err => console.error(err.toString()));
  }
}