import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Products } from '../model/products';
import { Result } from '../model/result';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products:Products[]=[];
  numberOfProductByPage=6;

  prodSubject=new Subject<Products[]>();
  constructor(private http:HttpClient) { 
    this.getproductfromserver()
  }
  
  emitProducts(){
    this.prodSubject.next(this.products)
  }
  getproductfromserver(){
    const url=`${environment.API+'products?'+environment.API_KEY}`;
    this.http.get(url)
    .subscribe(
      (dataProducts: Result| any): void=>{
        if(dataProducts.status==200){
          this.products=dataProducts.result;
          this.emitProducts();
        }else{
          console.log("Erreur :" +dataProducts.message);
          
        }
      }
    )
  }
  getProductById(id:number):Products{
    const product=this.products.find(element=>element.idProduct==id);
    if(product){
      return product;
    }
    return null;
  }

  getProductByPage(numberpage:number):Products[]{
    const numberOfPage=this.products.length/this.numberOfProductByPage;
    if(numberpage > 0 || numberpage < numberOfPage  ){
     const prodResult=this.products.slice(numberpage*6,(numberpage+1)*6);
     return prodResult;
    }
    return null;

  }
}
