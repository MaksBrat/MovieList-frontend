import { Component} from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { NotificationService } from 'src/app/services/notification.service';
import { AvatarUtility } from 'src/app/common/utility/avatar.utility';
import { ProfileResponse } from 'src/models/profile/profile-response';

@Component({
    selector: 'profileEdit',
    templateUrl: './profile-edit.component.html',
    styleUrls: ["../profile.component.css"],
    providers: [ProfileService]
})
export class ProfileEditComponent{
    public profile: ProfileResponse;
    
    constructor(private profileService: ProfileService, 
                public notificationService: NotificationService){
    }

    ngOnInit(){       
        this.profileService.get().subscribe(profile => {
            this.profile = profile
            this.profile.avatarUrl = AvatarUtility.buildAvatarUrl(profile.avatarUrl);
        });
    }

    changeAvatar(event: Event) {
        if(event.target instanceof HTMLInputElement){
            this.profileService.changeAvatar(event.target.files![0]);
        }
    }

    onSubmit(){        
        this.profileService.update(this.profile);
    }
}