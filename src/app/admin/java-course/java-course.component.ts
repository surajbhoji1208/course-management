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
           id: chapter.id,
           course_id: chapter.course_id,
           name: chapter.name,
           desc: chapter.desc
         }));
       });
     });
   }
 
   addChapter() {
     const newChapter = this.fb.group({
       id: Math.floor(Math.random() * 1000),
       course_id: [null,Validators.required],
       name: [null,Validators.required],
       desc: [null,Validators.required]
     });
 
     this.chapters.push(newChapter);
   }
 
   updateChapter(index: number) {
     const chapter = this.chapters.at(index).value;
     this.http.put(`http://localhost:3000/chapters/${chapter.id}`, chapter)
       .subscribe(() => alert('Chapter Updated!'));
   }
 
   deleteChapter(index: number) {
    const chapter = this.chapters.at(index);
    const isValid = Object.values(chapter).some(value => value === null && value === '');
    console.log(isValid);
    
    if (isValid) {
      this.http.delete(`http://localhost:3000/chapters/${chapter.value?.course_id}`).subscribe(() => {
        this.chapters.removeAt(index); // Remove from FormArray after deletion
      });
    } else {
      this.chapters.removeAt(index); // Just remove from FormArray if not saved in DB
    }
   }
}
