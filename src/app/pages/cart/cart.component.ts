import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { async } from 'rxjs';
import {Cart, CartItem} from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent {
  cart: Cart = {items: [{
    product: 'https://via.placeholder.com/150',
    name: 'snickers',
    price: 150,
    quantity: 1,
    id: 1,
},
{
  product: 'https://via.placeholder.com/150',
  name: 'snickers',
  price: 150,
  quantity: 3,
  id: 2,
}]};
  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ];

  constructor(private cartService: CartService, private http: HttpClient){}

ngOnInit(): void{
  this.cartService.cart.subscribe((_cart: Cart) => {
  this.cart = _cart;
  this.dataSource=this.cart.items;
  });
}

getTotal(items: Array<CartItem>): number{
  return this.cartService.getTotal(items);
}

onClearCart(): void{
  this.cartService.clearCart();
}

ononRemoveFromCart(item: CartItem): void{
  this.cartService.removeFromCart(item);
}

onAddQuantity(item: CartItem): void{
  this.cartService.addToCart(item);
}

onRemoveQuantity(item: CartItem): void{
this.cartService.removeQuantity(item);
}

onCheckout(): void{
  this.http.post('http://localhost:4242/checkout', {
    items: this.cart.items
  }).subscribe(async (res: any) => {
      let stripe = await loadStripe('pk_test_51O88scSELjSo1D7UlpMtk78HUZfc4MT5KJ8fY169ASh4aUd9hHUvVN1T15EH2kLd5OxytyXYmEcDPuzHxoXNEJkt003qRGJ92x');
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    });
}
}
