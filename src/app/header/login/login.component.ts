import { Component, OnInit } from '@angular/core';
import { FormsModule,FormBuilder,FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Token } from '../../models/product.model';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup;
  constructor( private fb: FormBuilder,private accountService: AccountService,private router: Router ) {
    
  }

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
          this.router.navigate(['products'])
        }
      })
      
    }
  }
}
