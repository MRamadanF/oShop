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
  items;
  totalPrice;

  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit(){
    
    let cart$ = (await this.shoppingCartService.getCart()).snapshotChanges();
    this.subscription = cart$.subscribe(cart => {
      this.shoppingCartItemCount = 0;
      this.totalPrice = 0;
      for (let productId in cart.payload.val().items){
        this.shoppingCartItemCount += cart.payload.val().items[productId].quantity;
        this.totalPrice += (cart.payload.val().items[productId].product.price * cart.payload.val().items[productId].quantity);
      }

      this.items = cart.payload.val().items;
      this.productIds = Object.keys(this.items);
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  clearCart(){
    this.shoppingCartService.clearCart();
  }

}
