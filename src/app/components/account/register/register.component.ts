import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../../services/account.service';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ["../account.component.css"]
})
export class RegisterComponent {
    invalidRegister = false;

    constructor(public accountService: AccountService, private router: Router){
        
    }

    register(form: NgForm){
        if(form.valid){
            this.accountService.register(form).subscribe({
                next: (response) => {
                    this.invalidRegister = false;           
                    this.router.navigate(["/register-success"]);
                },
                error: (error) => {
                    this.invalidRegister = true;   
                }       
            })
        }     
    }
}

