import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/operators";

import {ProductsService} from "../../../services/products.service";

import {Product} from "../../../models/product.model";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productID: string | null = null
  product: Product | null = null

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private location: Location
  ) { }

  ngOnInit(): void {
    console.log('entro')
    this.route.paramMap
      .pipe(
        switchMap(params => {
          this.productID = params.get('id')
          if (this.productID) {
            return this.productsService.getOne(this.productID)
          }
          return [null]
        }),
      )
      .subscribe(data => {
        console.log('Product => ', data)
        this.product = data
      })
  }

  goToBack(){
    this.location.back()
  }

}
