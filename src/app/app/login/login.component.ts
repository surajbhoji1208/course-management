import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj: any = {
    UserName: '',
    Password: '',
  };

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void { }

  onLogin() {
    if (!this.loginObj.email || !this.loginObj.password) {
      alert("Please enter email and password!");
      return;
    }

    // Check in the users' API
    this.http.get<any>("http://localhost:3000/login_users").subscribe({
      next: (users) => {
        const user = users.find((u: any) => 
          u.email === this.loginObj.email && u.password === this.loginObj.password
        );

        if (user) {
          localStorage.setItem('localUserData', JSON.stringify(user));
          this.router.navigateByUrl("/home");  // Redirect to user dashboard
        } else {
          // Check in the admins' API
          this.http.get<any>("http://localhost:3000/login_admins").subscribe({
            next: (admins) => {
              const admin = admins.find((a: any) => 
                a.email === this.loginObj.email && a.password === this.loginObj.password
              );

              if (admin) {
                localStorage.setItem('localAdminData', JSON.stringify(admin));
                this.router.navigateByUrl("/add-course");  // Redirect to admin dashboard
              } else {
                alert("Invalid Credentials! Please try again.");
              }
            },
            error: () => {
              alert("An error occurred during admin login. Please try again.");
            }
          });
        }
      },
      error: () => {
        alert("An error occurred during user login. Please try again.");
      }
    });
  }

  logout() {
    localStorage.removeItem('localUserData');
    localStorage.removeItem('localAdminData');
    this.router.navigateByUrl("/login");
  }

}
