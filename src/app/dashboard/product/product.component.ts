import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Table } from 'primeng/table';
import { Observable, tap } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { AppState } from 'src/app/store/app.state';
import { getLoading } from 'src/app/store/shared/shared.selector';
import { getAllProductSelector } from './state/product.selector';
import { deleteManyProduct, deleteManyProductFail, deleteManyProductSuccess, deleteProduct, deleteProductFail, deleteProductSuccess, getAllProduct } from './state/product.action';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Actions, ofType } from '@ngrx/effects';
import { setLoading } from 'src/app/store/shared/shared.action';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ProductComponent implements OnInit{
  products!: Observable<Product[]>;
  selectedProducts!: Product[];
  loading!: Observable<boolean>;
  idColors: any = [];

  constructor(
    private store:Store<AppState>,
    private messageService: MessageService, 
    private confirmationService: ConfirmationService,
    private action$: Actions
  ){}

  @ViewChild('dt') dt: Table | undefined;

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  
  ngOnInit(): void {
    
    this.loading=this.store.select(getLoading)
    this.products=this.store.select(getAllProductSelector).pipe(
      tap((data:any)=>{
        data.forEach((value:any)=>{
          if(!this.idColors[value.category?.id]){
            this.idColors[value.category?.id] = this.getRandomColor();
          }
        })
      })
    )
    
    this.store.dispatch(getAllProduct())
    

    

    //delete product notify
    this.action$.pipe(
      ofType(deleteProductFail),
      tap((action)=>{
        this.store.dispatch(setLoading({status:false}))
        this.messageService.add({ severity: 'error', summary: 'Error', detail: action.message, life: 2000 });
      })
    ).subscribe()

    this.action$.pipe(
      ofType(deleteProductSuccess),
      tap(()=>{
        this.store.dispatch(setLoading({status:false}))
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Xóa thành công!', life: 2000 });
      })
    ).subscribe()
    

    //delete many product notify
    this.action$.pipe(
      ofType(deleteManyProductFail),
      tap((action)=>{
        this.store.dispatch(setLoading({status:false}))
        this.messageService.add({ severity: 'error', summary: 'Error', detail: action.message, life: 2000 });
      })
    ).subscribe()

    this.action$.pipe(
      ofType(deleteManyProductSuccess),
      tap(()=>{
        this.store.dispatch(setLoading({status:false}))
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Xóa thành công!', life: 2000 });
      })
    ).subscribe()
  }

  onHandleDeleteSingle(productId: string){
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa không?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {    
        this.store.dispatch(setLoading({status:true}))
        this.store.dispatch(deleteProduct({id:productId}))
      }
    });
  }

  //delete many product
  onHandleDelete(){
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa không?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {    
        const arrayId = this.selectedProducts.map(product => product.id);
        this.store.dispatch(deleteManyProduct({ids:arrayId}))
        this.store.dispatch(setLoading({status:true}))
      }
    });
  }


  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
