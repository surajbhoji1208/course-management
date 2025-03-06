import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { CourseDetailsComponent } from './user/course-details/course-details.component';
import { HomeComponent } from './user/home/home.component';
import { UserlayoutComponent } from './user/userlayout/userlayout.component';
import { AdminlayoutComponent } from './admin/adminlayout/adminlayout.component';
import { AddCourseComponent } from './admin/add-course/add-course.component';
import { AuthGuard } from './services/auth.guard';
import { MycourseComponent } from './user/mycourse/mycourse.component';
import { JavaCourseComponent } from './java-course/java-course.component';
import { VideoComponent } from './admin/video/video.component';
import { VideoDisplayComponent } from './user/video-display/video-display.component';
import { UserCourseComponent } from './user/user-course/user-course.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',

    component: LoginComponent
  },

  {
    path: '',
    component: UserlayoutComponent,
    canActivate: [AuthGuard],            //user
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'course-details',
        component: CourseDetailsComponent
      },
      {
        path: 'mycourse',
        component: MycourseComponent
      },
      {
        path: 'video-display',
        component: VideoDisplayComponent
      },
      {
        path: 'user-course',
        component: UserCourseComponent
      },
    ]
  },
  {
    path: '',
    component: AdminlayoutComponent,            //admin
    canActivate: [AuthGuard],
    children: [
      {
        path: 'add-course',
        component: AddCourseComponent
      },
      {
        path: 'java-course',
        component: JavaCourseComponent
      },
      {
        path: 'video',
        component: VideoComponent
      }
      

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
