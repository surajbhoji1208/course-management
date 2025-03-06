import { Component } from '@angular/core';
import { CourseService } from '../../services/course.service';
//import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-add-course',
  standalone: false,
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent {
  courseName = '';
  courseDesc = '';
  courseImage = '';
  coursePrice: number = 0;
  courseOldPrice: number = 0;
  courses: any[] = [];
  http: any;

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCourses().subscribe((data) => {
      this.courses = data;
    });
  }

  createCourse() {
    const newCourse = {
      id: new Date().getTime(), // Temporary unique ID for JSON server
      name: this.courseName,
      course_desc: this.courseDesc,
      courseImage: this.courseImage,
      price: this.coursePrice,
      old_price: this.courseOldPrice,
      progress: 0,
      chapters: []
    };
  
    this.courseService.createCourse(newCourse).subscribe(() => {
      alert('Course created successfully!');
      this.loadCourses();
    });
  }
  
  editCourse(course: any) {
    console.log('Editing course:', course);
  }

  deleteCourse(courseId: number) {
    this.courseService.deleteCourse(courseId).subscribe(() => {
      alert('Course deleted successfully!');
      this.loadCourses();
    });
  }

  // deleteCourse(courseId: number) {
  //   if (!courseId) {
  //     console.error('Error: courseId is undefined!');
  //     return;
  //   }
  //   return this.http.delete(`http://localhost:3000/courses/${courseId}`);
  // }
  
}
