import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Token } from '../../models/product.model';
import { NotificationService } from '../../notifications/notification.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  private jwtHelper = new JwtHelperService();

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.accountService.login(this.loginForm.value)
        .subscribe((data: Token) => {
          if (data) {
            localStorage.setItem('token', data.token);
            this.notificationService.showSuccess('Login successful!', 'Close');
            this.navigateBasedOnRole(data.token);
          } else {
            this.notificationService.showWarning('User Name or Password is Incorrect.', 'Close');
          }
        }, error => {
          this.notificationService.showError('An error occurred!', 'Close');
        });
    }
  }

  private navigateBasedOnRole(token: string): void {
    const decodedToken = this.jwtHelper.decodeToken(token);
    const userRole = decodedToken?.role;

    if (userRole === 'Admin') {
      this.router.navigate(['admin']);
    } else {
      this.router.navigate(['products']);
    }
  }
}
