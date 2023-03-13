import { Component} from '@angular/core';
import { ProfileService } from '../profile.service';
import { HttpClient } from '@angular/common/http';
import { ProfileResponseModel } from 'src/models/DTO/ResponseModels/ProfileResponseModel';
import { catchError, of, tap } from 'rxjs';
import { NotificationService } from 'src/app/services/NotificationService';
import { Profile } from 'src/models/Profile';
import { UrlOptions } from 'src/models/UrlOptions';

@Component({
    selector: 'profileEdit',
    templateUrl: './profileEdit.component.html',
    styleUrls: ["../profile.component.css"],

    providers: [ProfileService]
})
export class ProfileEditComponent{
    public profileResponse: ProfileResponseModel;

    private profileUrl =  UrlOptions.BaseUrl + 'api/Profile';

    public avatar: File;
    public age: number;
    public name: string;

    public showMessage = false;
    public image: any;
    
    constructor(
        private profileService: ProfileService, 
        private http: HttpClient,
        public notificationService: NotificationService){
    }

    ngOnInit(){       
        this.profileService.get().subscribe(profile => 
        {   
            this.profileResponse = profile;
            this.age = profile.age;
            this.name = profile.name
        });         
    }

    ChangeAvatar(event: Event) {
        if(event.target instanceof HTMLInputElement){
            this.avatar = event.target.files![0];

            const formData = new FormData();     
            formData.append("avatar", this.avatar);

            this.http.post<Profile>(this.profileUrl + '/change-avatar', formData)
                .subscribe(response => { 
                    window.location.reload();
                });
            
            this.showMessage = true;
        }
    }

    Edit(){
        const formData = new FormData();
        
        formData.append("Name", this.name);
        if(this.age){
            formData.append("Age", this.age.toString());
        }
        
        this.http.post<Profile>(this.profileUrl + '/edit', formData)
        .pipe(
            tap(response => {
                this.notificationService.addNotification({
                    message: 'Profile update successfully!',
                    type: 'success'
                });
            }),
            catchError(error => {
                this.notificationService.addNotification({
                    message: 'Error update profile',
                    type: 'error'
                });
                return of(error);
            })
        ).subscribe();            
    }
}