import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Products } from 'src/app/model/products';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Products[]=[];
  prefUrlImage=`${environment.PrefUrlImage}`;
  prodSub!: Subscription;
  constructor(private prodService:ProductsService) { }


  ngOnInit(): void {
    this.prodSub=this.prodService.prodSubject.subscribe(
      (data:any)=>{
       this.products=data;
      }
    );
    this.prodService.emitProducts();
  }
  ngOnDestroy(): void {
    this.prodSub.unsubscribe();
  }

}