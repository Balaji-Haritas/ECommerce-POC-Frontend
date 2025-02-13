import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../notifications/notification.service';


@Component({
  selector: 'app-signup',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private accService:AccountService,
     private route:Router , private notificationService:NotificationService) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit():void{
    if(this.signupForm.valid){
      this.accService.register(this.signupForm.value).subscribe(
        () => {
          this.notificationService.showSuccess('Signup Succesfull!!. Please Login to Continue','Close');
          this.route.navigate(['login']);
        },error => {
          console.log('Error Regstering',error);
          this.notificationService.showError('An error occurred!', 'Close');
        }
      )
    }
  }
}