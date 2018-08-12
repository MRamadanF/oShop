import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from '../../node_modules/rxjs/operators';
import { query } from '../../node_modules/@angular/core/src/render3/query';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categoriesList;
  constructor(private db: AngularFireDatabase) { }

  getCategories(){
    return this.db.list('/categories', q => q.orderByChild('name')).snapshotChanges().pipe(
      map(keys => keys.map(
        category => ({ key:category.payload.key, data: category.payload.val() })
      )
    ));
  }
}
