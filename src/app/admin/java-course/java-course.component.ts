import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { retry } from 'rxjs';

@Component({
  selector: 'app-java-course',
  standalone: false,
  templateUrl: './java-course.component.html',
  styleUrl: './java-course.component.css'
})
export class JavaCourseComponent implements OnInit{
  courseForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.courseForm = this.fb.group({
      chapters: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.fetchChapters();
  }

  get chapters() {
    return this.courseForm.get('chapters') as FormArray;
  }

  fetchChapters() {
    this.http.get<any[]>('http://localhost:3000/chapters').subscribe(data => {
      data.forEach(chapter => {
        this.chapters.push(this.fb.group({
          id: [chapter.id],
          course_id: [chapter.course_id, Validators.required],
          name: [chapter.name, Validators.required],
          desc: [chapter.desc, Validators.required],
          isNew: [false] // Indicates existing chapter
        }));
      });
    });
  }

  addChapter() {
    const newChapter = this.fb.group({
      id: Math.floor(Math.random() * 1000),
      course_id: [null, Validators.required],
      name: [null, Validators.required],
      desc: [null, Validators.required],
      isNew: [true] // Indicates new chapter
    });

    this.chapters.push(newChapter);
  }

  saveChapter(index: number) {
    const chapter = this.chapters.at(index).value;
    
    if (chapter.isNew) {
      // Add new chapter to backend
      this.http.post('http://localhost:3000/chapters', chapter).subscribe(response => {
        alert('Chapter Added!');
        this.chapters.at(index).patchValue({ isNew: false }); // Mark as existing chapter
      });
    } else {
      // Update existing chapter
      this.http.put(`http://localhost:3000/chapters/${chapter.id}`, chapter)
        .subscribe(() => alert('Chapter Updated!'));
    }
  }

  deleteChapter(index: number) {
    const chapter = this.chapters.at(index).value;

    if (!chapter.isNew) {
      // Delete only if it exists in the database
      this.http.delete(`http://localhost:3000/chapters/${chapter.id}`).subscribe(() => {
        this.chapters.removeAt(index); // Remove from form after deletion
      });
    } else {
      // Just remove from the form if not saved in DB
      this.chapters.removeAt(index);
    }
  }
}
