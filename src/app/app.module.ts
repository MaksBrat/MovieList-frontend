import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS }   from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AnimeComponent } from './components/anime/anime.component';
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
import { AuthGuard } from './components/account/authGuard.service';
import { JwtHelperService, JWT_OPTIONS} from '@auth0/angular-jwt';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileEditComponent } from './components/profile/profileEdit/profileEdit.component';
import { httpInterceptor } from './components/account/interseptor';
import { AdminTabComponent } from './components/admin-tab/admin-tab.component';
import { AnimeAboutComponent } from './components/anime-about/anime-about.component';
import { AnimeService } from './components/anime/anime.service';
import { AccountService } from './components/account/account.Service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AnimeListComponent } from './components/profile/anime-list/anime-list.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HomeComponent } from './components/home/home.component';
import { TrailerComponent } from './components/anime-about/trailer/trailer.component';
import { NotificationComponent } from './components/notification/notification.component';
import { CreatenewsComponent } from './components/news/createNews/createNews.component';
import { NewsAboutComponent } from './components/news/news-about/news-about.component';
import { CommentComponent } from './components/comment/comment.component';

export function tokenGetter(){
  return localStorage.getItem("jwt");
}

const appRoutes: Routes =[
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'anime', component: AnimeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { 
    path: 'profile', component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  { path: 'editProfile', component : ProfileEditComponent },
  { path: "adminTab", component: AdminTabComponent },
  { path: "anime/:id", component: AnimeAboutComponent },
  { path: "animeList", component: AnimeListComponent },
  { path: "createNews", component: CreatenewsComponent },
  { path: "news/:id", component: NewsAboutComponent }
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
  ],
  declarations: [ 
    AppComponent, 
    AnimeComponent,
    AnimeAboutComponent,
    NavBarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ProfileEditComponent,
    AdminTabComponent,
    AnimeListComponent,
    HomeComponent,
    TrailerComponent,
    NotificationComponent,
    CreatenewsComponent,
    NewsAboutComponent,
    CommentComponent,
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
    AnimeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
