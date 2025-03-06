import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  public signupForm!:FormGroup;


  constructor( private fromBuilder :FormBuilder,private http:HttpClient,private router:Router){ }

  ngOnInit():void{
this.signupForm= this.fromBuilder.group({
  fullname:[''],
  email:[''],
  password:[''],
  mobile:['']
})
}

signUp(){
this.http.post<any>("http://localhost:3000/signup",this.signupForm.value).subscribe(_res=>{
  alert("Signup Successfull");
  this.signupForm.reset();
  this.router.navigate(['login']);
},err=>{
  alert("Something went wrong")
})

}
}
