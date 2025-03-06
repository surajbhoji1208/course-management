import { Component } from '@angular/core';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-add-course',
  standalone: false,
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent {

  courseName = '';
  courseDesc = '';
  // videoUrl = '';
  chapters = [{ id: 1, title: '', completed: false }];
  courses: any[] = [];
  courseImage ='';
  coursePrice='';
  courseOldPrice='';

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.loadCourses();
    
  }

  loadCourses() {
    this.courseService.getCourses().subscribe((data) => {
      this.courses = data;
    });
  }

  // addChapter() {
  //   this.chapters.push({ id: this.chapters.length + 1, title: '', completed: false });
  // }

  // removeChapter(index: number) {
  //   this.chapters.splice(index, 1);
  // }


  createCourse() {
    const newCourse = {
      name: this.courseName,
      course_desc: this.courseDesc,
      // video: this.videoUrl,
      progress: 0,
      chapters: this.chapters
    };

    this.courseService.createCourse(newCourse).subscribe(() => {
      alert('Course created successfully!');
      this.loadCourses(); // Reload courses after creation
    });
  }

  editCourse(course: any) {
    console.log('Editing course:', course);
    // Logic to edit the course, could navigate to a form or similar
  }

  deleteCourse(courseId: number) {
    this.courseService.deleteCourse(courseId).subscribe(() => {
      alert('Course deleted successfully!');
      this.loadCourses(); // Reload courses after deletion
    });
  }
  }