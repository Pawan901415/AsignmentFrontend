import { Component, OnInit } from '@angular/core';
import AuthService from '../../Services/auth.service';
import { Router } from '@angular/router';
import { UserStoreService } from '../../Services/user-store.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
 

  public fullName:string=""
  public role:string=""
  constructor(private router:Router,private userstore:UserStoreService,private auth:AuthService) {
  
  }
  ngOnInit(): void {
   
    this.userstore.getFullNameFromStore()
    .subscribe(val=>{
      let fullNameFromToken=this.auth.getFullNameFromToken();
      this.fullName=val || fullNameFromToken;
    })

    this.userstore.getRoleFromStore()
    .subscribe(val=>{
      let roleFromToken=this.auth.getRoleFromToken();
      this.role=val ||roleFromToken
    })
  }
Logout(){


  localStorage.clear();
  this.router.navigate(['login'])

}
}
