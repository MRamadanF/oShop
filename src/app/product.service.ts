import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '../../node_modules/angularfire2/database';
import { map } from '../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product){
    return this.db.list('/products').push(product);
  }

  getProducts(){
    return this.db.list('/products').snapshotChanges().pipe(
      map(changes => changes.map(
        p => ({ key: p.payload.key, data:p.payload.val() })
      ))
    );
  }

  getProductbyId(productId){
    return this.db.object('/products/' + productId).snapshotChanges().pipe(
      map(product => ({ value: product.payload.val() }))
    );
  }

  update(productId, product){
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId){
    return this.db.object('/products/' + productId).remove();
  }
}
