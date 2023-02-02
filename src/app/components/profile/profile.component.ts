import { Component, OnInit} from '@angular/core';
import { ProfileService } from './profile.service';
import { Profile } from 'src/entity/Profile';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageService } from 'src/app/Services/ImageService';

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
                this.profile = profile, 
                this.data = new Date(this.profile.registratedAt)
            });     
        }  
}

