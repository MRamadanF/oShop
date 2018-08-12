import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../product.service';
import { Subscription } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: any[];
  filteredProducts: any[];
  subscription: Subscription;

  constructor(private productService: ProductService) { 
    this.subscription = productService.getProducts().subscribe(p => this.filteredProducts = this.products = p);
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  filter(query: string){
    this.filteredProducts = (query) ?
    this.products.filter(p => p.data.title.toLowerCase().includes(query.toLowerCase())):
    this.products;    
  }

}
