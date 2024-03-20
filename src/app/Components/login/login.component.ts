import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import AuthService from '../../Services/auth.service';
import { Router } from '@angular/router';
import { UserStoreService } from '../../Services/user-store.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
type:string="password";
isText:boolean=false;
eyeIcon:string="fa-eye-slash";
loginForm!:FormGroup;



constructor(private fb:FormBuilder,private auth:AuthService,private router:Router,private userStore:UserStoreService){

}

  HideShowPass(){
this.isText=!this.isText;
this.isText ? this.eyeIcon="fa-eye":this.eyeIcon="fa-eye-slash";
  this.isText ?this.type="text":this.type="password";

}


onLogin() {
  if (this.loginForm.valid) {
    this.auth.login(this.loginForm.value).subscribe({
      next: (res) => {
        if (res?.message) {
          console.log(res);
          this.loginForm.reset();
          this.auth.storeToken(res.token);
          let tokenpayload=this.auth.decodeToken();
          this.userStore.setFullNameForStore(tokenpayload.name)
          this.userStore.setRoleForStore(tokenpayload.role)
          alert(res.message);
          this.router.navigate(['dashboard']);
         
          alert(res.token);
     
          
        } else {
          alert('Unexpected response from the server.');
        }
      },
      error: (err) => {
        alert(err?.error?.message || 'An error occurred during login.');
        console.log(err.error.message);
      }
    });
  } else {
    console.log('Form is not valid');
    this.validateAllFormFields(this.loginForm);
    alert('Your form is invalid.');
  }
}

ngOnInit(): void {
  this.loginForm=this.fb.group(
    {
      username:['',Validators.required],
      password:['',Validators.required]
    }
  )
  
}
private validateAllFormFields(formGroup:FormGroup){
  Object.keys(formGroup.controls).forEach(field => {
    const control=formGroup.get(field);
    if(control instanceof FormControl){
      control.markAsDirty({onlySelf:true})
    }
    else if(control instanceof FormGroup){

      this.validateAllFormFields(control)
    }

    
  });
}

}
