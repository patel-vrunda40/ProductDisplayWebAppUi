import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import {ProductService} from '../service/product.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']  
})
export class ProductComponent implements OnInit {
  productDataList: Product[] = [];
  description="";
  modalTitle ="";
  isLoading = false;

  constructor(
    private readonly service:ProductService,
    private readonly cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.isLoading = true;
    this.service.getAllProduct().subscribe(
      (data) => {
        this.productDataList =data;
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        window.alert(error.message)        
        this.cd.detectChanges();
      }
    );
  }

  viewProductDetails(product : Product){
    if(product.id == undefined){
      throw new Error("The selected row doesn't have any id associated with. Can not complete request.")
    }
    this.isLoading = true;
    this.service.getProductById(product.id.toLocaleString()).subscribe(
      (data : Product) => {        
        this.description = data.description; 
        this.modalTitle = data.name;
        this.isLoading = false;               
      },       
      (error) => {
        window.alert(error.message); 
        this.cd.detectChanges();
        this.isLoading = false;
      }
    );
  }

}
