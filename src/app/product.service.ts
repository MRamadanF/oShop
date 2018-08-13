import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '../../node_modules/angularfire2/database';
import { map, take } from '../../node_modules/rxjs/operators';
import { Observable } from '../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products$: Observable<any[]>;
  productRef$: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) { }

  create(product){
    return this.db.list('/products').push(product);
  }

  getProducts(){
    this.productRef$ = this.db.list('/products/');
    if(!this.productRef$) return;

    this.products$ = this.productRef$.snapshotChanges().pipe(
      map(changes => changes.map(
        p => ({ 
          key: p.payload.key,
          title: p.payload.val().title,
          price: p.payload.val().price,
          category: p.payload.val().category,
          imageUrl: p.payload.val().imageUrl })
      ))
    );

    return this.products$;
  }

  getProductbyId(productId){
    return this.db.object('/products/' + productId).snapshotChanges().pipe(
      take(1), map(product => ({ value: product.payload.val() }))
    );
  }

  update(productId, product){
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId){
    return this.db.object('/products/' + productId).remove();
  }

  getProductsbyCategory(category){

  }
}
