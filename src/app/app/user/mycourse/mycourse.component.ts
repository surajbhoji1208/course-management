import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-mycourse',
  standalone: false,
  
  templateUrl: './mycourse.component.html',
  styleUrls: ['./mycourse.component.css'] 
})
export class MycourseComponent implements OnInit {

  chapters: any[] = [];
  selectedChapter: any = null;
  progress: number = 0;
  videos: any[] = [];
  jsonServerUrl = 'http://localhost:3000/videos';
  

  
  

  constructor(private http: HttpClient) {}

  

  ngOnInit(): void {
    this.fetchChapters();
    this.http.get<any[]>(this.jsonServerUrl).subscribe(data => {
      this.videos = data;
    });
    
  }

  fetchChapters() {
    this.http.get<any[]>('http://localhost:3000/chapters').subscribe(data => {
      this.chapters = data;
      this.calculateProgress();
    });
  }

  selectChapter(chapter: any) {
    this.selectedChapter = chapter;
    this.markAsWatched(chapter);
  }

  markAsWatched(chapter: any) {
    chapter.watched = true;
    this.http.put(`http://localhost:3000/chapters/${chapter.id}`, chapter)
      .subscribe(() => this.calculateProgress());
  }

  calculateProgress() {
    const watchedCount = this.chapters.filter(ch => ch.watched).length;
    this.progress = (watchedCount / this.chapters.length) * 100;
  }

}