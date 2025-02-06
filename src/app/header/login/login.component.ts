import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  model:any = {};
  constructor(private accontService:AccountService){}
  loggedIn = false;

  login(){
    this.accontService.login(this.model).subscribe({
      next:response =>{
        console.log(response);
        this.loggedIn= true;
      },error:err =>{
        console.log(err);
      }

    })
  }
}
