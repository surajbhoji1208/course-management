import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private apiUrl = 'http://localhost:3000/videos';

  constructor(private http: HttpClient) {}

  getVideos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addVideo(video: any): Observable<any> {
    return this.http.post(this.apiUrl, video);
  }

  deleteVideo(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
