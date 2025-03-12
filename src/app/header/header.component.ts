import { ChangeDetectorRef, Component } from '@angular/core';
import { ResolveEnd, Router } from '@angular/router';
import { CartserviceService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public totalCountOfCartProducts:number=0;
  isLoggedIn = false;
  userRole: string = '';
  
  constructor(private router: Router,private cartService:CartserviceService, private accService:AccountService, private cdr: ChangeDetectorRef) {
    this.router.events.subscribe(
      (event => {
        if(event instanceof ResolveEnd && event.urlAfterRedirects !== '/login'){
          this.isLoggedIn = true;
          this.accService.getRoleFromToken();
        }
      })
    )
  }

  ngOnInit(){
   
   this.isLoggedIn = !!localStorage.getItem('token');
   this.userRole = this.accService.getRoleFromToken();
   
   this.accService.role$.subscribe(role => {
    this.userRole = role;
    console.log('isLoggedIn:', this.isLoggedIn);
    console.log('userRole:', this.userRole);

    if (this.isLoggedIn && this.userRole === 'customer') {
      this.cartService.getProducts().subscribe(res => {
        this.totalCountOfCartProducts = res.length;
        this.cdr.detectChanges();
      });
    } else {
      this.cdr.detectChanges();
    }
  });
  
  this.accService.getRoleFromToken();
}

   
  navigateToCart() {
    this.router.navigate(['cart']);
  }

  navigateToLoginPage(){
    this.router.navigate(['login']);
  }

  logout(){
    this.isLoggedIn = false;
    this.accService.logout();
  }

}
