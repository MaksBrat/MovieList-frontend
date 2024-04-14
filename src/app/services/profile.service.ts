import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../../models/profile/profile';
import { NotificationService } from 'src/app/services/notification.service';
import { catchError, of, tap } from 'rxjs';
import { ProfileResponse } from 'src/models/profile/profile-response';
import { UrlOptions } from 'src/models/options/url-options';

@Injectable({
    providedIn: 'root'
})
export class ProfileService{
    constructor(private http: HttpClient, private notificationService: NotificationService){

    }

    private profileUrl =  UrlOptions.BaseUrl + 'api/Profile';

    get(){
        return this.http.get<Profile>(this.profileUrl);
    }

    update(profile: ProfileResponse){
        this.http.put<Profile>(this.profileUrl, profile)
        .pipe(
            tap(response => {
                this.notificationService.riseNotification({
                    message: 'Profile updated successfully!',
                    type: 'success'
                });
            }),
            catchError(error => {
                this.notificationService.riseNotification({
                    message: 'Error updating profile',
                    type: 'error'
                });
                return of(error);
            })
        ).subscribe();    
    }

    changeAvatar(avatar: File) {
        const formData = new FormData();     
        formData.append("avatar", avatar);

        this.http.put<Profile>(this.profileUrl + '/change-avatar', formData)
            .subscribe(response => { 
                window.location.reload();
            });
    }
}