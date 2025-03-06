import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-java-course',
  standalone: false,
  templateUrl: './java-course.component.html',
  styleUrl: './java-course.component.css'
})
export class JavaCourseComponent implements OnInit{
  chapters: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchChapters();
  }

  fetchChapters() {
    this.http.get<any[]>('http://localhost:3000/chapters').subscribe(data => {
      this.chapters = data;
    });
  }

  updateChapter(chapter: any) {
    this.http.put(`http://localhost:3000/chapters/${chapter.id}`, chapter)
      .subscribe(() => alert('Chapter Updated!'));
  }

  deleteChapter(id: number) {
    this.http.delete(`http://localhost:3000/chapters/${id}`)
      .subscribe(() => {
        this.chapters = this.chapters.filter(ch => ch.id !== id);
      });
  }

  addChapter() {
    const newChapter = {
      id: Math.floor(Math.random() * 1000),
      course_id: '',
      name: '',
      desc: '',
      watched: false,
      video: '',
      quiz: { id: 0, question: '', options: [], correct_answer: '' }
    };

    this.http.post('http://localhost:3000/chapters', newChapter)
      .subscribe(() => {
        this.chapters.push(newChapter);
      });
  } 
}
