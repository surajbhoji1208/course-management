import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-video',
  standalone: false,
  templateUrl: './video.component.html',
  styleUrl: './video.component.css'
})
export class VideoComponent {
  
  videos: any[] = [];
  newVideo = { videoTitle: '', videoDescription: '', videoUrl: '', videoThumbnail: '', totalDuration: '' };
  jsonServerUrl = 'http://localhost:3000/videos';  // JSON Server URL

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchVideos();
  }

  fetchVideos() {
    this.http.get<any[]>(this.jsonServerUrl).subscribe(data => {
      this.videos = data;
    });
  }

  addVideo() {
    this.http.post(this.jsonServerUrl, this.newVideo).subscribe(() => {
      this.fetchVideos();
      this.newVideo = { videoTitle: '', videoDescription: '', videoUrl: '', videoThumbnail: '', totalDuration: '' };
    });
  }

  deleteVideo(id: number) {
    this.http.delete(`${this.jsonServerUrl}/${id}`).subscribe(() => {
      this.fetchVideos();
    });
  }

  updateVideo(video: any) {
    this.http.put(`${this.jsonServerUrl}/${video.id}`, video).subscribe(() => {
      this.fetchVideos();
    });
  }

  }
