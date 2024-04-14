import { OnInit, Component} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserBlockedModal } from 'src/app/common/modals/user-blocked/user-blocked.modal';
import { AccountService } from 'src/app/services/account.service';
import { SignalRService } from 'src/app/services/signaIR.Service';

@Component({
  selector: 'app-user-blocked',
  templateUrl: './user-blocked.component.html',
  styleUrls: ['./user-blocked.component.css']
})
export class UserBlockedComponent implements OnInit{
    userId: number;

    constructor(
        private accountService: AccountService,
        private signalRService: SignalRService, 
        private dialog: MatDialog){              
    }

    ngOnInit(){
        this.userId = this.accountService.getCurrentUserId();

        this.signalRService.createHubConnection();

        this.signalRService.addListener("UserConnected", () => {
            this.addUserConnectionId();
        })

        this.registerUserBlockEvent();
    }

    registerUserBlockEvent(){
        this.signalRService.addListener('UserBlocked', () => {           
            this.accountService.logout();
            this.openDialog();
        });
    }

    addUserConnectionId(){
        if(this.userId == null){
            return;
        }

        this.signalRService.hubConnection.invoke("AddUserConnectionId", this.userId.toString()).then();
    }

    openDialog(){
        const dialogRef = this.dialog.open(UserBlockedModal);
    }
}
