import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Product} from "../../models/product.model";
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
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
    this.route.paramMap.subscribe(params => {
      this.categoryId = params.get('id')
      if (this.categoryId) {
        console.log('categoryId => ', this.categoryId)
        this.productsService.getByCategory(this.categoryId, this.limit, this.offset)
          .subscribe(data => {
            console.log('Category Products => ', data)
            this.products = data
          })
      }
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
