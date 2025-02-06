import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartserviceService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public totalCountOfCartProducts:number=0;
 
  constructor(private router: Router,private cartService:CartserviceService) {}
 
  navigateToCart() {
    this.router.navigate(['cart']);
  }
  ngOnInit(){
   this.cartService.getProducts().subscribe(
    res=>{
      this.totalCountOfCartProducts=res.length
    }
   )
  }
}
