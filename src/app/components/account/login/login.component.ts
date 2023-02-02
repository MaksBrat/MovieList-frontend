import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from '../account.Service';
import { LoginService } from './login.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ["../account.component.css"]
})
export class LoginComponent {
    type: string = "password";
    isText: boolean = false;
    eyeIcon: string = "fa-eye-slash";

    constructor(public accountService : AccountService){

    }

    hideShowPass(){
        this.isText = !this.isText;
        this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
        this.isText ? this.type = "text" : this.type = "password";
    }

    login(form : NgForm){
      this.accountService.login(form);
    }    
}

