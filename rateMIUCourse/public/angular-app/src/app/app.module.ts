import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {JwtHelperService, JWT_OPTIONS} from '@auth0/angular-jwt';


import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { CoursesComponent } from './courses/courses.component';
import { CourseComponent } from './course/course.component';
import { StarsRatingComponent } from './stars-rating/stars-rating.component';
import { SearchComponent } from './search/search.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { AddCourseComponent } from './add-course/add-course.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavigationComponent,
    HomeComponent,
    CoursesComponent,
    CourseComponent,
    StarsRatingComponent,
    SearchComponent,
    ErrorComponent,
    LoginComponent,
    RegisterComponent,
    EditCourseComponent,
    AddCourseComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: "",
        component: HomeComponent
      },
     
      {
        path: "courses",
        component: CoursesComponent
      },
      {
        path: "courses/:courseId",
        component: CourseComponent
      },
      {
        path:"addNew",
        component:AddCourseComponent
      },
      {
        path: "search",
        component: SearchComponent
      },
      {
        path:"register",
        component:RegisterComponent
      },
      {
        path: "**",
        component: ErrorComponent
      }
    ])
  ],
  providers: [{provide:JWT_OPTIONS, useValue:JWT_OPTIONS}, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
