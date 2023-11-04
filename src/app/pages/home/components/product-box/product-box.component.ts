import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
})
export class ProductBoxComponent implements OnInit{
ngOnInit(): void {
  // throw new Error('Method not implemented.');
}

@Input() fullWidthMode = false;
@Input() product: Product | undefined;
@Output() addToCart = new EventEmitter();

onAddToCart(): void{
  this.addToCart.emit(this.product);
}
}

