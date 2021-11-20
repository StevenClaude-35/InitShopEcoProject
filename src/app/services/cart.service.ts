import { Injectable } from '@angular/core';
import { element } from 'protractor';
import { Cart } from '../model/cart';
import { Products } from '../model/products';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart:Cart[]=[];
  cartData:{len:0,cost:0};
  constructor() { }
 
  updateDataCart(){
    let len;
    let cost;
    this.cart.forEach(element=>{
      len=element.number;
      cost=element.product.price*element.number;
    })
   this.cartData.len=len;
   this.cartData.cost=cost;
  };
  addProductToCart(newProduct:Products):void{
    const checkedProduct=this.cart.find(element=>element.product==newProduct);
    if(checkedProduct){
      checkedProduct.number++;
    }else{
      const newProductToAdd={
        number:1,
        product:newProduct
      };
      this.cart.push(newProductToAdd);
    }
    this.updateDataCart();
  }

  deleteFromCart(productToDelete:Products):void{
    const indexProduct=this.cart.findIndex(element=>element.product==productToDelete);
    if(indexProduct)
    if(this.cart[indexProduct].number>1){
      this.cart[indexProduct].number--;
    }else{
      this.cart.slice(indexProduct,1);
    }
    this.updateDataCart();
  }
 
}
