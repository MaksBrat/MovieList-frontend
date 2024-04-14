import { Injectable } from "@angular/core";
import * as signalR from '@microsoft/signalr';
import { UrlOptions } from "src/models/options/url-options";

@Injectable({
  providedIn: 'root'
})
export class SignalRService{
  public hubConnection: signalR.HubConnection;
  public connectionId: string;

  url = UrlOptions.BaseUrl + 'hub';

  public createHubConnection(){
    this.hubConnection = new signalR.HubConnectionBuilder()
              .withUrl(this.url, {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
              })
              .withAutomaticReconnect()
              .build();

    this.hubConnection
    .start()
    .catch((error) => console.log(error));
  }

  public addListener(eventName: string, callback: (...args: any[]) => void) {
    this.hubConnection.on(eventName, callback);
  }

  public removeListener(eventName: string) {
    this.hubConnection.off(eventName);
  }
}