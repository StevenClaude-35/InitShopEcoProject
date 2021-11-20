import { Injectable } from '@angular/core';
import { element } from 'protractor';
import { Cart } from '../model/cart';
import { Products } from '../model/products';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart:Cart[];
  cartData={len:0,cost:0};
  constructor() { 
    this.initCart();
  }

  initCart():void{
    if(typeof(localStorage)!=="undefined"){
      const cart=JSON.parse(localStorage.getItem('this.cart'));
      const cartData=JSON.parse(localStorage.getItem('this.cartData'));
      this.cart=cart? cart:[];
      this.cartData=cartData? cartData:{len:0,cost:0};
    }else{
      this.cart=[];
      this.cartData={len:0,cost:0};
    }
  }
 
  updateDataCart(){
    let len=0;
    let cost=0;
    this.cart.forEach(element=>{
      len+=element.number;
      cost+=element.product.price*element.number;
    })
   this.cartData.len=len;
   this.cartData.cost=cost;
   if(typeof(localStorage)!=="undefined"){
     localStorage.setItem('cart',JSON.stringify(this.cart));
     localStorage.setItem('cartData',JSON.stringify(this.cartData));

   }
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
    if(indexProduct!== -1)
    if(this.cart[indexProduct].number>1){
      this.cart[indexProduct].number--;
    }else{
      this.cart.slice(indexProduct,1);
    }
    this.updateDataCart();
  }
 
}
