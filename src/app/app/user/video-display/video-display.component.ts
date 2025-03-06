import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-video-display',
  standalone: false,
  templateUrl: './video-display.component.html',
  styleUrl: './video-display.component.css'
})
export class VideoDisplayComponent implements OnInit {
  videos: any[] = [];
  jsonServerUrl = 'http://localhost:3000/videos';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>(this.jsonServerUrl).subscribe(data => {
      this.videos = data;
    });
  }
  
}
