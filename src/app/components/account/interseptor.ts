import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, switchMap, tap, throwError } from 'rxjs';
import { AuthGuard } from './authGuard.service';

@Injectable()
export class httpInterceptor implements HttpInterceptor {
  constructor(public authService: AuthGuard){

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getAccessToken();
    if (token) {
      request = this.addToken(request, token);
    }
  
    return next.handle(request).pipe(
      catchError((error : HttpErrorResponse) =>{
        if (error instanceof HttpErrorResponse && error.status === 401){
          this.authService.refreshTokens();
          if(this.authService.isRefreshSuccess){
            return next.handle(this.addToken(request, this.authService.getAccessToken()))
          }
          else{
            return throwError(error);
          }
        }
        else{
          return throwError(error);
        }        
      })
    )
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

