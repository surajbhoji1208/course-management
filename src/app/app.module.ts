import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './user/home/home.component';
import { CourseDetailsComponent } from './user/course-details/course-details.component';
import { LoginComponent } from './login/login.component';
import { UserlayoutComponent } from './user/userlayout/userlayout.component';
import { AdminlayoutComponent } from './admin/adminlayout/adminlayout.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { MycourseComponent } from './user/mycourse/mycourse.component';
//import { JavaCourseComponent } from './java-course/java-course.component';
import { VideoComponent } from './admin/video/video.component';
import { VideoDisplayComponent } from './user/video-display/video-display.component';
import { UserCourseComponent } from './user/user-course/user-course.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from './services/safe-url.pipe';
import { VideoService } from './services/video.service';
import { AddCourseComponent } from './admin/add-course/add-course.component'; // ✅ Import standalone component
import { JavaCourseComponent } from './admin/java-course/java-course.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CourseDetailsComponent,
    SignupComponent,
    LoginComponent,
    UserlayoutComponent,
    AdminlayoutComponent,
    MycourseComponent,
    JavaCourseComponent,
    VideoComponent,
    VideoDisplayComponent,
    SafeUrlPipe,
    UserCourseComponent,
    AddCourseComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule,
    // ✅ Import standalone component here
  ],
  providers: [VideoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
