import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '../../node_modules/angularfire2/database';
import { Product } from './models/product';
import { take } from '../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  create(){
    return  this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getCart(cartId: string){
    return this.db.object('/shopping-carts/' + cartId).snapshotChanges();
  }

  private async getOrCreateCartId(){
    let cartId = localStorage.getItem('cartId');

    if(cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async addToCart(product: Product){
    let cartId = await this.getOrCreateCartId();

    let item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key$);

    item$.snapshotChanges().pipe(take(1)).subscribe(item => {
      //if(item.payload.exists()) item$.update({ quantity: item.payload.val().quantity + 1 })
    });
  }
}
