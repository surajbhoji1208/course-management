import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses'; // JSON Server URL

  constructor(private http: HttpClient) {}

  getCourses(p0?: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createCourse(course: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, course); // Ensure Course ID is stored
  }

  updateCourse(id: string, course: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, course);
  }

  // deleteCourse(id: string): Observable<any> {
  //   return this.http.delete<any>(`${this.apiUrl}/${id}`);
  // }

  deleteCourse(courseId: number) {
    return this.http.delete(`http://localhost:3000/courses/${courseId}`);
  }
  
}
