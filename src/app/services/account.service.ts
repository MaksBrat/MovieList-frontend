import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticatedResponse } from "src/models/account/authenticated-response";
import { UrlOptions } from "src/models/options/url-options";

@Injectable({
    providedIn: 'root'
})
export class AccountService{
    type: string = "password";
    isText: boolean = false;
    eyeIcon: string = "fa-eye-slash";

    accountUrl = UrlOptions.BaseUrl + 'api/Account/';

    isAdminMode = true;

    constructor(private jwtHelper: JwtHelperService,
                private http: HttpClient,
                private router: Router){

    }

    hideShowPass(){
        this.isText = !this.isText;
        this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
        this.isText ? this.type = "text" : this.type = "password";
    }

    register(form : NgForm){       
        const credentials = JSON.stringify(form.value);
        return this.http.post(this.accountUrl + "register", credentials,{
            headers: new HttpHeaders({ "Content-Type": "application/json"})       
        })      
    }

    login(form: NgForm){      
        const credentials = JSON.stringify(form.value);
        return this.http.post<AuthenticatedResponse>(this.accountUrl + "login", credentials, {
            headers: new HttpHeaders({ "Content-Type": "application/json"}),           
        })      
    }

    logout = () => {
        this.http.post(this.accountUrl + "revoke",null);
        localStorage.clear();
        this.router.navigate(["/"]);
    }

    getCurrentUserId(): number{
        let currentUserId = localStorage.getItem("userId");
        return currentUserId ? parseInt(currentUserId, 10) : null;
    }

    isUserAuthenticated() : boolean {
        const token = localStorage.getItem("jwt");
        if (token && !this.jwtHelper.isTokenExpired(token)) {
            
          return true;
        }
        else {
          return false;
        }
      }

    isAdmin(): boolean{
        let token = localStorage.getItem('jwt');
        if(!token){
            return false;
        }
        let decodedJWT = JSON.parse(window.atob(token.split('.')[1]));
        let role = decodedJWT['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']

        if(role == "admin"){           
            return true;
        }
        return false;
    }
    
    switchAdminMode(): boolean {
        this.isAdminMode = !this.isAdminMode;
        localStorage.setItem('isAdminMode', JSON.stringify(this.isAdminMode));
        return this.isAdminMode;
    }  

    confirmEmail(token: string, email: string){
        let params = new HttpParams()
            .set('token', token)
            .set('email', email);

        return this.http.get(`${this.accountUrl}confirm-email?${params}`);
    }

    blockUser(userId: string){
        return this.http.post(`${this.accountUrl}block-user?userId=${userId}`, null);
    }

    unBlockUser(userId: string){
        return this.http.post(`${this.accountUrl}unblock-user?userId=${userId}`, null);
    }
}