import { Component } from '@angular/core';

@Component({
  selector: 'app-adminlayout',
  standalone: false,
  templateUrl: './adminlayout.component.html',
  styleUrl: './adminlayout.component.css'
})
export class AdminlayoutComponent {
router: any;
course: any;
//logout:any;


logout() {
  localStorage.removeItem('localUserData');
  localStorage.removeItem('localAdminData');
  this.router.navigateByUrl("/login");
}
}
