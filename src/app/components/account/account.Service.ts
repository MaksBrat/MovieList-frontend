import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService, JWT_OPTIONS  ,JwtModule} from '@auth0/angular-jwt';
import { AuthenticatedResponse } from "src/app/interfaces/AuthenticatedResponse";

@Injectable({
    providedIn: 'root'
})
export class AccountService{
    invalidLogin?: boolean;
    invalidRegister?: boolean;

    isAdminMode = JSON.parse(localStorage.getItem('isAdminMode')!) || false;

    constructor(private jwtHelper: JwtHelperService,
                private http: HttpClient,
                private router: Router){

    }

    register = (form : NgForm) => {
        if (form.valid) {
            const credentials = JSON.stringify(form.value);
            console.log(credentials);
            this.http.post("https://localhost:7003/api/Account/register", credentials,{
                headers: new HttpHeaders({ "Content-Type": "application/json"}),
                responseType: 'text'
            })
            .subscribe({
                next: () => {
                this.invalidRegister = false; 
                
                console.log("Register successful")
                this.router.navigate(["/login"]);
                },
                error: error => console.log(error)
                
            })
        }
    }

    login = ( form: NgForm) => {
        if (form.valid) {
            const credentials = JSON.stringify(form.value);
            this.http.post<AuthenticatedResponse>("https://localhost:7003/api/Account/login", credentials, {
                headers: new HttpHeaders({ "Content-Type": "application/json"}),           
            })
            .subscribe({
                next: (response: AuthenticatedResponse) => {
                    const token = response.token;
                    const refreshToken = response.refreshToken;
                    localStorage.setItem("jwt", token); 
                    localStorage.setItem("refreshToken", refreshToken);
                    this.invalidLogin = false; 
                    this.router.navigate(["/"]);
                },
                error: (err: HttpErrorResponse) => this.invalidLogin = true
            })
        }
    }

    logOut = () => {
        this.http.post("https://localhost:7003/api/Account/revoke",null);
        localStorage.removeItem("jwt");
        localStorage.removeItem("refreshToken");
        this.router.navigate(["/"]);
        window.location.reload();
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

        if(role == "Admin"){
            return true;
        }
        return false;
    }
    
    switchAdminMode(): boolean {
        this.isAdminMode = !this.isAdminMode;
        localStorage.setItem('isAdminMode', JSON.stringify(this.isAdminMode));
        return this.isAdminMode;
    }  
}