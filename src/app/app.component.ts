import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet,RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularAuthUI';
  /**
   *
   */
  constructor(private router:Router) {
    
    
  }
  
  
  navigatetoLogin(){
    this.router.navigate(['login'])

  }
  navigatetoSignUp(){
this.router.navigate(['signup'])
  }
}
