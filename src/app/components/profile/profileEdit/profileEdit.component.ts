import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Profile } from 'src/models/Profile';
import { ProfileService } from '../profile.service';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProfileRequestModel } from 'src/models/RequestModels/ProfileRequestModel';
import { ProfileResponseModel } from 'src/models/DTO/ResponseModels/ProfileResponseModel';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageService } from 'src/app/Services/ImageService';
@Component({
    selector: 'profileEdit',
    templateUrl: './profileEdit.component.html',
    styleUrls: ["../profile.component.css"],

    providers: [ProfileService]
})
export class ProfileEditComponent{
    //received profile
    public profileResponse: ProfileResponseModel;

    public avatar: File;
    public age: number;
    public name: string;

    public showMessage = false;
    public image: any;
    
    constructor(
        private profileService: ProfileService, 
        private http: HttpClient,
        private router: Router,
        public imageService: ImageService){

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
            formData.append("Avatar", this.avatar);

            this.http.post<any>("https://localhost:7003/api/Profile/change-avatar", formData)
                .subscribe(response => { 
                    console.log(response);

                    window.location.reload();
                });
            
            this.showMessage = true;
        }
    }

    Edit(){
        const formData = new FormData();
        
        formData.append("Name", this.name);
        formData.append("Age", this.age.toString());

        this.http.post<any>("https://localhost:7003/api/Profile/edit", formData)
            .subscribe(response => { console.log(response) });   

        // this.router.navigate(["/profile"]);
        window.location.href="http://localhost:4200/profile"
    }
}