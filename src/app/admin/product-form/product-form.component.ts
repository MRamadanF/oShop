import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { ProductService } from '../../product.service';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = {};
  id;

  constructor(
    private categoryService: CategoryService, 
    private productService: ProductService, 
    private router: Router,
    private activatedRoute: ActivatedRoute) 
    {
      this.categories$ = categoryService.getCategories();
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
      if(this.id) this.product = this.productService.getProductbyId(this.id).subscribe(p => this.product = p);
    }

  ngOnInit() {
  }

  save(product){
    if(this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }


  delete(){
    if(!confirm('Are you sure you want to delete this product?')) return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

}
