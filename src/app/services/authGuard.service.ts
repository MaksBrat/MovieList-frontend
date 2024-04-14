import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService} from '@auth0/angular-jwt';
import { catchError, of, tap } from "rxjs";
import { AuthenticatedResponse } from "src/models/account/authenticated-response";
import { UrlOptions } from "src/models/options/url-options";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  private _isRefreshSuccess = false;

  constructor(private router:Router, 
              private jwtHelper: JwtHelperService, 
              private http: HttpClient){
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
      const token = this.getAccessToken();
      if (token && !this.jwtHelper.isTokenExpired(token)){
          return true;
      }

      this.refreshTokens().subscribe();  
      
      if (this.isRefreshSuccess()) { 
        return true;
      }
      return false;
  }

  public refreshTokens() {      
      const accessToken = this.getAccessToken();
      const refreshToken = this.getRefreshToken();

      const credentials = JSON.stringify({ accessToken: accessToken, refreshToken: refreshToken });

      return this.http.post<AuthenticatedResponse>(UrlOptions.BaseUrl + '/api/Token/refresh', credentials, {
          headers: new HttpHeaders({
            "Content-Type": "application/json"
          })
      }).pipe(
        tap((response) => {
          this.storeTokens(response);
          this._isRefreshSuccess = true;
          return true;
        }),
        catchError((error) => {
          this._isRefreshSuccess = false;
          this.redirectToLogin();
          return of(false);
        })
      );
  };

  public isRefreshSuccess(){
    return this._isRefreshSuccess;
  }

  public redirectToLogin(){
    this.router.navigate(["login"]); 
  }

  public getAccessToken(){
    return localStorage.getItem("jwt");
  }
  public getRefreshToken(){
    return localStorage.getItem("refreshToken");
  }

  public setAccessToken(token: string){
    localStorage.setItem("jwt", token);
  }
  public setRefreshToken(refreshToken: string){
    localStorage.setItem("refreshToken", refreshToken);
  }

  public storeTokens(response: AuthenticatedResponse){
    localStorage.setItem("jwt", response.token);
    localStorage.setItem("refreshToken", response.refreshToken);
  }
  public removeToken(){
    localStorage.remove("jwt");
    localStorage.remove("refreshToken");
  }
}