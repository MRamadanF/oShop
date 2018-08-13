import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { Product } from '../models/product';
import { switchMap } from '../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
products: Product[] = [];
filteredProducts: Product[] = [];

category: string;

  constructor(
    route: ActivatedRoute,
    productService: ProductService) {

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

  ngOnInit() {
  }

}
