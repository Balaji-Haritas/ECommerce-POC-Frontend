import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartserviceService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public totalCountOfCartProducts:number=0;
  isLoggedIn = false;
 
  constructor(private router: Router,private cartService:CartserviceService, private accService:AccountService) {
    this.isLoggedIn = !!localStorage.getItem('userToken');
  }

  ngOnInit(){
   this.cartService.getProducts().subscribe(
    res=>{
      this.totalCountOfCartProducts=res.length
    }
   )
  }

   
  navigateToCart() {
    this.router.navigate(['cart']);
  }

  navigateToLoginPage(){
    this.router.navigate(['login']);
  }

  logout(){
    this.accService.logout();
  }

}
