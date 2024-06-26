import { Component } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  notification: any;
  success = false;
  error = false;
  hideNotification = false;

  constructor(public notificationService: NotificationService){

  }
  
  ngOnInit() {
    this.notificationService.notification$.subscribe(notification => {
      this.notification = notification;

      if(notification.type == "success") {
        this.success = true;
        this.error = false;
      }
      if(notification.type == "error") {
        this.error = true;
        this.success = false;
      }

      setTimeout(() => {
        this.hideNotification = true;
      }, 2000);

      this.hideNotification = false;
    });
  }
}