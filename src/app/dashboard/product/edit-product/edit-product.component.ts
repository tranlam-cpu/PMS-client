import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map, tap } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { AppState } from 'src/app/store/app.state';
import { getProductById } from '../state/product.selector';
import { MessageService } from 'primeng/api';
import { Actions } from '@ngrx/effects';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { getAllCategorySelector } from '../../category/state/category.selector';
import { getAllCategory } from '../../category/state/category.actions';
import { CreateProductModal } from 'src/app/models/create-product.model';
import { EditProductModal } from 'src/app/models/edit-product.model';
import { editProduct } from '../state/product.action';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  providers: [MessageService]
})
export class EditProductComponent implements OnInit{

   
    uploadedFiles: any[] = [];
    constructor(
      private store:Store<AppState>,
      private messageService: MessageService,
      private action$: Actions,
      private router: Router
    ) { }
    
    categorys!:Observable<any[]>
    formGroup!: FormGroup;
    categorySelectedId!: any;
    
    ngOnInit(): void {
      
      this.createForm()
      

      this.store.select(getProductById).subscribe(
        (data)=>{
          if(data){
        
            this.categorySelectedId=data.category.id
            this.formGroup.patchValue({
              id: data.id,
              name: data.name,
              description: data.description,
              category: data.category,
              price: data.price,
              quantity: data.quantity
            })
          } 
        }
      )
      

      this.categorys = this.store.select(getAllCategorySelector).pipe(
        map(data => data.map(item => ({ name: item.name, id: item.id })))
      );
      
      this.store.dispatch(getAllCategory())


      //edit product notify
      this.action$.subscribe((action: any) => {
        if(action.type === '[Product] Edit Product Success'){
          this.router.navigate(['/dashboard/pd']);
        }
        if(action.type === '[Product] Edit Product Fail'){
          this.messageService.add({severity:'error', summary:'Error', detail:'Product Edit Failed'});
        }
      });
    }

    createForm(){
      this.formGroup=new FormGroup({
        id: new FormControl(null),
        name: new FormControl(null,[Validators.required]),
        description: new FormControl(null),
        category: new FormControl(null),
        price: new FormControl(null,[Validators.pattern('^[0-9]*$|^$')]),
        quantity: new FormControl(null,[Validators.pattern('^[0-9]*$|^$')]),
      })
    }

    onHandleSubmit(){
     
      const { id, name, description, price, quantity } = this.formGroup.value;
      const formData = new EditProductModal(id,name,this.formGroup.value.category.id, description, price || 0, quantity || 0, this.uploadedFiles[0]);
      this.store.dispatch(editProduct({ product: formData }));
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
