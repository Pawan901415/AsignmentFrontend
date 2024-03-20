import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule ,Validators} from '@angular/forms';
import AuthService from '../../Services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{

  type:string="password";
  isText:boolean=false;
  eyeIcon:string="fa-eye-slash";
  signUpForm!:FormGroup;
  constructor(private fb :FormBuilder,private auth:AuthService,private router:Router){

  }
  ngOnInit(): void {
    this.signUpForm=this.fb.group(
      {
        firstName:['',Validators.required],
        lastName:['',Validators.required],
        email:['',Validators.required],
      password:['',Validators.required],
      userName:['',Validators.required],
      }
    )
    
  }
  HideShowPass(){
    this.isText=!this.isText;
    this.isText ? this.eyeIcon="fa-eye":this.eyeIcon="fa-eye-slash";
      this.isText ?this.type="text":this.type="password";
    

    }


    onSignup(){
      if(this.signUpForm.valid){
        console.log(this.signUpForm.value)
        this.auth.signup(this.signUpForm)
        .subscribe({
         next:(res=>{
          alert(res.message)
         this.signUpForm.reset();

         this.router.navigate(['login'])

         })
         ,error:(err=>{
          alert(err.error.message)
         })




        })
      }
      else{
        console.log("form is not vaild")
        this.validateAllFormFields(this.signUpForm)
        alert("your form is invaild");
      }
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
