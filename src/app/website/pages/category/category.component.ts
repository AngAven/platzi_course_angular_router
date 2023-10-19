import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from "rxjs/operators";

import {Product} from "../../../models/product.model";
import {ProductsService} from "../../../services/products.service";

@Component({
  selector: 'app-category',
  // templateUrl: './category.component.html',
  template: `<app-products [products]="products" (onLoadMore)="loadMore()" [productID]="productId"></app-products>`,
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categoryId: string | null = null
  products: Product[] = []
  limit = 10
  offset = 0
  productId: string | null = null

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
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

    this.route.queryParamMap.subscribe(params => {
      this.productId = params.get('product')
      console.log('this.productId | category=> ', this.productId)
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
