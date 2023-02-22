import { Component, OnInit} from '@angular/core';
import { ProfileService } from './profile.service';
import { Profile } from 'src/models/Profile';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageService } from 'src/app/services/ImageService';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ["./profile.component.css"],

    providers: [ProfileService]
})

export class ProfileComponent{ 
    public profile: Profile;

    public data : Date;
    monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];

    constructor(private profileService: ProfileService, public imageService: ImageService){
        this.profileService.get().subscribe(profile => 
            {
                this.profile = profile;
                console.log(profile);
                this.data = new Date(this.profile.registratedAt);
            });     
    }  

    getRegisteredDate(){
        return this.monthNames[this.data.getMonth()] + this.data.getFullYear()
    }

}

