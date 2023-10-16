import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from "rxjs/operators";

import {Product} from "../../models/product.model";
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-category',
  // templateUrl: './category.component.html',
  template: `<app-products [products]="products" (onLoadMore)="loadMore()"></app-products>`,
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categoryId: string | null = null
  products: Product[] = []
  limit = 10
  offset = 0

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          this.categoryId = params.get('id')
          if (this.categoryId) {
            return this.productsService.getByCategory(this.categoryId, this.limit, this.offset)
          }
          return []
        }),

        // Si tenemos más subscribes que dependan uno de otro irían aquí
        // switchMap()
        // switchMap()
        // switchMap()
      )
      .subscribe(data => {
        this.products = data
      })
  }

  loadMore() {
    if (this.categoryId) {
      this.productsService.getByCategory(this.categoryId, this.limit, this.offset)
        .subscribe(data => {
          this.products = this.products.concat(data.filter(product => product.images.length > 0));
          this.offset += this.limit;
        });
    }
  }
}
