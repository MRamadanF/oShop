import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { Product } from '../models/product';
import { switchMap } from '../../../node_modules/rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
products: Product[] = [];
filteredProducts: Product[] = [];
cart: any;
category: string;
subscription: Subscription;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private shoppingCartService: ShoppingCartService) {
      productService.getProducts().pipe(
        switchMap(p => {
          this.products = p;
          return route.queryParamMap;
        })
      ).subscribe(params => {
          this.category = params.get('category');
          this.filteredProducts = (this.category) ? 
          this.products.filter(p => p.category === this.category) :
          this.products;
        });
      
  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart()).snapshotChanges().subscribe(cart => this.cart = cart.payload.val());
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
