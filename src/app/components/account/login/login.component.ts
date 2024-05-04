import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { AuthenticatedResponse } from 'src/models/account/authenticated-response';
import { AccountService } from '../../../services/account.service';
import { AuthGuard } from '../../../services/authGuard.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ["../account.component.css"]
})
export class LoginComponent {
    invalidLogin = false;

    constructor(public accountService : AccountService, 
                public authGuardService: AuthGuard,
                private notificationService: NotificationService){

    }

    login(form : NgForm){
        if(form.valid){
            this.accountService.login(form).subscribe({
                next: (response: AuthenticatedResponse) => {
                    const token = response.token;
                    const refreshToken = response.refreshToken;
                    const userId = response.userId;
    
                    localStorage.setItem("jwt", token); 
                    localStorage.setItem("refreshToken", refreshToken);
                    localStorage.setItem("userId", userId.toString());

                    window.location.href="/";
                },
                error: (err: HttpErrorResponse) => {
                    this.notificationService.riseNotification({
                        message: err.error.message,
                        type: 'error'
                    });
                    console.log(err);            
                }
            })
        }    
    }  
}

