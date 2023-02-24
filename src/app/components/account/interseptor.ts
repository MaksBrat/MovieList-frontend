import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class httpInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, newRequest: HttpHandler): Observable<HttpEvent<any>> {

        const token = localStorage.getItem('jwt')
        if (token) {
            request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
                
                }
            });
        }

        return newRequest.handle(request);
    }
}