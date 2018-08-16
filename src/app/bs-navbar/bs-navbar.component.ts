import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  appUser: AppUser;
  shoppingCartItemCount: number;
  

  constructor(
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService) {
    
    
   }

  logout(){
    this.auth.logout();
  }

  async ngOnInit(){
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    
    let cart$ = (await this.shoppingCartService.getCart()).snapshotChanges();
    cart$.subscribe(cart => {
      this.shoppingCartItemCount = 0;
      
      if(cart.payload.val()){
        for (let productId in cart.payload.val().items)
          this.shoppingCartItemCount += cart.payload.val().items[productId].quantity;
      }
    });
  }

}
