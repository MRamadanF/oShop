import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-shopping-carts',
  templateUrl: './shopping-carts.component.html',
  styleUrls: ['./shopping-carts.component.css']
})
export class ShoppingCartsComponent implements OnInit, OnDestroy {

  shoppingCartItemCount: number;
  subscription: Subscription;
  productIds;
  totalPrice;
  cart: any;
  cartItems;

  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit(){
        
    let cart$ = (await this.shoppingCartService.getCart()).snapshotChanges();
    
    
    this.subscription = cart$.subscribe(cart => {
      this.shoppingCartItemCount = 0;
      this.totalPrice = 0;
      this.cart = cart.payload.val();
      if(this.cart){
        this.cartItems = this.cart.items;
        this.productIds = Object.keys(this.cartItems);
        
        for (let productId in this.productIds){
          this.shoppingCartItemCount += this.cartItems[this.productIds[productId]].quantity;
          this.totalPrice += (this.cartItems[this.productIds[productId]].product.price * this.cartItems[this.productIds[productId]].quantity);
        }
      }
      
      
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  clearCart(){
    this.shoppingCartService.clearCart();
  }

}
