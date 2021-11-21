import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  constructor(private prodService:ProductsService) { }
  products=[];
  prodSub:Subscription | undefined;
  ngOnInit(): void {
    this.prodSub=this.prodService.prodSubject.subscribe(
      (data:any)=>{
       this.products=this.prodService.getProductByPage(0)//data;
      }
    );
    this.prodService.emitProducts();
  }

}
