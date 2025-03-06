import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CourseDetailsComponent } from '../user/course-details/course-details.component';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  addCourse(newCourse: { name: string; course_desc: string; chapters: { id: number; title: string; completed: boolean; }[]; image: string; price: string; old_price: string; }) {
    throw new Error('Method not implemented.');
  }

  private apiUrl = 'http://localhost:3000/courses'; // ✅ Correct placement
  //deleteCourse: any;

  constructor(private http: HttpClient) {} // ✅ Fixed constructor

  getCourses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCourseById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createCourse(course: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, course);
  }

  updateCourse(id: number, course: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, course);
  }
  deleteCourse(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  
}
