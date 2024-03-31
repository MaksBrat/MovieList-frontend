import { DomSanitizer } from "@angular/platform-browser";
import {Injectable} from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class NotificationService{
    private notificationSubject = new Subject<any>();
    notification$ = this.notificationSubject.asObservable();
  
    riseNotification(notification: { message: string, type: string}) {
      this.notificationSubject.next(notification);
    }
}