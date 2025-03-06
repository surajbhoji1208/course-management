import { Component, OnInit } from '@angular/core';
//import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-details',
  standalone: false,
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent implements OnInit {
  courses: any[] = [];
  course: any;
  selectedCourse: any;
  courseId!: string;


  constructor(private route: ActivatedRoute, private courseService: CourseService) {}
 
 
  ngOnInit(): void {
    this.loadCourses();
    
  }

  // viewCourseDetails(course: any) {
  //   this.selectedCourse = course;
  // }

  loadCourses(): void {
    this.courseService.getCourses().subscribe((data: any) => {
      this.courses = data;
    }, (error: any) => {
      console.error("Error fetching courses:", error);
    });
  }

  }
