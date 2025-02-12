import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Token } from '../../models/product.model';
import { NotificationService } from '../../services/notification.service';


@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup;
  constructor( private fb: FormBuilder,private accountService: AccountService,
    private router: Router ,private notificationService:NotificationService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.accountService.login(this.loginForm.value)
      .subscribe((data : Token) => {
        if(data){
          localStorage.setItem('token', data.token);
          this.notificationService.show('Login successful!', 'Close', 3000,['custom-snackbar-success'],'right','top' );
          this.router.navigate(['products'])
        }else {
          this.notificationService.show('Login failed!', 'Close', 3000, ['custom-snackbar-error']);
        }
      }, error => {
        this.notificationService.show('An error occurred!', 'Close', 3000, ['custom-snackbar-error']);
      });
    } else {
        this.notificationService.show('Please fill in all required fields.', 'Close', 3000, ['custom-snackbar-warning']);
      }
  }
      
}
  

