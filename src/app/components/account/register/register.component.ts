import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticatedResponse } from 'src/app/interfaces/AuthenticatedResponse';
import { AccountService } from '../account.Service';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ["../account.component.css"]
})
export class RegisterComponent {
    type: string = "password";
    isText: boolean = false;
    eyeIcon: string = "fa-eye-slash";

    constructor(private accountService: AccountService){
        
    }

    hideShowPass(){
        this.isText = !this.isText;
        this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
        this.isText ? this.type = "text" : this.type = "password";
    }

    register(form: NgForm){
      this.accountService.register(form);
    }
}

