import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS }   from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MovieComponent } from './components/movie/movie.component';
import { AppComponent } from './app.component';
import {CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { NavBarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/account/login/login.component';
import {MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule  } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { RegisterComponent } from './components/account/register/register.component';
import { AuthGuard } from './services/authGuard.service';
import { JwtHelperService, JWT_OPTIONS} from '@auth0/angular-jwt';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileEditComponent } from './components/profile/profile-edit/profile-edit.component';
import { httpInterceptor } from './components/account/interseptor';
import { AdminTabComponent } from './components/admin-tab/admin-tab.component';
import { MovieAboutComponent } from './components/movie-about/movie-about.component';
import { MovieService } from './services/movie.service';
import { AccountService } from './services/account.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MovieListComponent } from './components/profile/movie-list/movie-list.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HomeComponent } from './components/home/home.component';
import { TrailerComponent } from './components/movie-about/trailer/trailer.component';
import { NotificationComponent } from './components/notification/notification.component';
import { CreatenewsComponent } from './components/news/create-news/create-news.component';
import { NewsAboutComponent } from './components/news/news-about/news-about.component';
import { CommentComponent } from './components/comment/comment.component';
import { ChatComponent } from './components/chat/chat.component';
import { NgOptimizedImage } from '@angular/common'
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { EmailConfirmationComponent } from './components/account/email-confirmation/email-confirmation.component';
import { RegisterSuccessComponent } from './components/account/register-success/register-success.component';

export function tokenGetter(){
  return localStorage.getItem("jwt");
}

const appRoutes: Routes =[
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'movie', component: MovieComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register-success', component: RegisterSuccessComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'edit-profile', component : ProfileEditComponent, canActivate: [AuthGuard] },
  { path: "admin-tab", component: AdminTabComponent, canActivate: [AuthGuard] },
  { path: "movie/:id", component: MovieAboutComponent },
  { path: "movie-list", component: MovieListComponent, canActivate: [AuthGuard] },
  { path: "create-news", component: CreatenewsComponent, canActivate: [AuthGuard] },
  { path: "news/:id", component: NewsAboutComponent },
  { path: 'confirm-email', component: EmailConfirmationComponent }
];

@NgModule({
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    HttpClientModule, 
    CommonModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    Ng2SearchPipeModule,
    SlickCarouselModule,
    NgOptimizedImage,
    InfiniteScrollModule
  ],
  declarations: [ 
    AppComponent, 
    MovieComponent,
    MovieAboutComponent,
    NavBarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ProfileEditComponent,
    AdminTabComponent,
    MovieListComponent,
    HomeComponent,
    TrailerComponent,
    NotificationComponent,
    CreatenewsComponent,
    NewsAboutComponent,
    CommentComponent,
    ChatComponent,
    EmailConfirmationComponent,
    RegisterSuccessComponent,
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService, 
    AuthGuard,
    AccountService,
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: httpInterceptor, 
      multi: true 
    },
    MovieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
