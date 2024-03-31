import { Component, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/models/product.model';
import { AppState } from 'src/app/store/app.state';
import { getAllProduct } from '../../product/state/product.action';
import { getAllProductSelector } from '../../product/state/product.selector';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-rental',
  templateUrl: './create-rental.component.html',
  styleUrls: ['./create-rental.component.css']
})
export class CreateRentalComponent implements OnInit {

  constructor(
    private store: Store<AppState>
  ) { }
  //paginator
  first: number = 0;
  rows: number = 5;
  //dialog
  visible: boolean = false;
  quantityDialog: number = 1;
  maxQuantityDialog: number = 1;
  availableProducts!: Product[];
  
  //drag - drop
  selectedProducts: Product[] =[];

  draggedProduct: Product | null = null;
  modelData: Product | null = null;

  //pagelinksize
  pageLinkSize: number = 5;

  //search
  searchTerm: string = '';

  formGroup!: FormGroup;



  ngOnInit(): void {
    this.store.select(getAllProductSelector).subscribe((data)=>{
      
      this.availableProducts = data;
    })
    this.store.dispatch(getAllProduct());
    


    this.formGroup=new FormGroup({
      date: new FormControl<Date | null>(null,[Validators.required]),
      retal_fee: new FormControl('',[Validators.required]),
    })
  }




  //reponsive paginator
  @HostListener('window:resize')
  onResize() {
    this.updatePageLinkSize();
  }

  updatePageLinkSize() {
  
    if (window.innerWidth < 480) {
      this.pageLinkSize = 0;
    } else if (window.innerWidth < 768) {
      this.pageLinkSize = 3;
    } else {
      this.pageLinkSize = 5;
    }
  }

  //search
  getFilteredProducts() {
    if (!this.searchTerm) {
      return this.availableProducts;
    }
  
    return this.availableProducts.filter(product =>
      product.name?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onPageChange($event: any) {
      this.first = $event.first;
      this.rows = $event.rows;
  }

  showDialog() {
    this.visible = true;
    if(this.draggedProduct){
      this.modelData = this.draggedProduct;
      (this.maxQuantityDialog as any) =this.draggedProduct.quantity;
    } 
  }


  dragStart(product: Product) {
    this.draggedProduct = product;
  }


  dragEnd() {
    this.draggedProduct = null;
  }

  findIndex(product: Product) {
      let index = -1;
      for (let i = 0; i < this.availableProducts.length; i++) {
          if (product.id === this.availableProducts[i].id) {
              index = i;
              break;
          }
      }
      return index;
  } 

  onDialogAccept(){
    if (this.modelData) {
        this.modelData = { ...this.modelData, quantity: this.quantityDialog };
        let draggedProductIndex = this.findIndex(this.modelData);
        this.selectedProducts = [...this.selectedProducts, this.modelData];

        // Combine the quantities of the products with the same id
        this.selectedProducts = Object.values(
          this.selectedProducts.reduce((acc:any, product:any) => {
            if (acc[product.id]) {
              // If the product is already in the accumulator, combine the quantities
              acc[product.id].quantity += product.quantity;
            } else {
              // If the product is not in the accumulator, add it
              acc[product.id] = { ...product };
            }
            return acc;
          }, {})
        );

        // this.availableProducts = this.availableProducts.filter((val, i) => i == draggedProductIndex)
        this.availableProducts=this.availableProducts.reduce((acc:any,val:any,index:any)=>{
      
          if(index===draggedProductIndex){
            let quantityPresent = val.quantity - this.quantityDialog;
            if(quantityPresent>0){
              acc.push({...val ,quantity:quantityPresent});
            }
          }else{
            acc.push(val);
          }
          
          return acc;
        },[])
       
        this.modelData = null;
        this.visible = false;
        this.quantityDialog =1;
    }
  }

  onDialogCancel(){
    this.visible = false;
    this.quantityDialog = 0;
    this.maxQuantityDialog = 0;
    this.draggedProduct = null;
    this.modelData = null;
  }

  onDeleteProductOfRental(product: Product){
    let index = this.findIndex(product);
    if(index==-1){
      this.selectedProducts = this.selectedProducts.filter((val, i) => val.id !== product.id);
      this.availableProducts=[...this.availableProducts,product];
    }else{
      this.selectedProducts = this.selectedProducts.filter((val, i) => val.id !== product.id);
      this.availableProducts = this.availableProducts.reduce((acc:any,val:any,i:any)=>{
        if(i==index){
          let quantityPresent = val.quantity + product.quantity;
            acc.push({...val ,quantity:quantityPresent});  
        }else{
          acc.push(val);
        }
        return acc;
      },[])
    }

  }
}
