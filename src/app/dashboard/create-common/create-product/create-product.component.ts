import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map, tap } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { AppState } from 'src/app/store/app.state';
import { getAllCategorySelector } from '../../category/state/category.selector';
import { getAllCategory } from '../../category/state/category.actions';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateProductModal } from 'src/app/models/create-product.model';
import { createProduct, createProductFail, createProductSuccess } from '../../product/state/product.action';
import { setLoading } from 'src/app/store/shared/shared.action';
import { Actions, ofType } from '@ngrx/effects';
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
  providers: [MessageService]
})
export class CreateProductComponent implements OnInit{

  uploadedFiles: any[] = [];

  constructor(
    private store:Store<AppState>,
    private messageService: MessageService,
    private action$: Actions
  ) { }

  categorys!:Observable<Category[]>
  
  formGroup!: FormGroup;

  ngOnInit(): void {
    this.categorys= this.store.select(getAllCategorySelector).pipe(
      tap((data)=>{
        if(data.length>0){
          this.formGroup.patchValue({category: data[0]})
        }
      })
    )
    this.store.dispatch(getAllCategory())

    this.formGroup=new FormGroup({
      name: new FormControl('',[Validators.required]),
      description: new FormControl(''),
      category: new FormControl(''),
      price: new FormControl('',[Validators.pattern('^[0-9]*$|^$')]),
      quantity: new FormControl('',[Validators.pattern('^[0-9]*$|^$')]),
    })


    //handle notifi create product
    this.action$.pipe(
      ofType(createProductSuccess),
      tap(()=>{
        this.store.dispatch(setLoading({status:false}))
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Thêm thành công!', life: 2000 });
        this.formGroup.reset()
      })
    ).subscribe()

    this.action$.pipe(
      ofType(createProductFail),
      tap(action=>{
        this.store.dispatch(setLoading({status:false}))
        this.messageService.add({ severity: 'error', summary: 'Error', detail: action.message, life: 2000 });
      })
    ).subscribe()
  }

  onHandleCreateSubmit(){
    const { name, description, price, quantity } = this.formGroup.value;
    const formData = new CreateProductModal(name,this.formGroup.value.category.id, description, price || 0, quantity || 0, this.uploadedFiles[0]);
    this.store.dispatch(createProduct({product: formData}))
 
  }

  onFileSelect(event: any) {
    for(let file of (event as any).files) {
      this.uploadedFiles.push(file);
    }
  }
  onFileRemove(event: any) {
    this.uploadedFiles = [];
  }
}
