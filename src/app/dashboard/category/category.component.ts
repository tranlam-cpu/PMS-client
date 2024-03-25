import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Table } from 'primeng/table'
import { Category } from 'src/app/models/category.model';
import { AppState } from 'src/app/store/app.state';
import { createCategory, createCategoryError, createCategorySuccess, deleteCategory, deleteCategoryError, deleteCategorySuccess, deleteManyCategory, deleteManyCategoryError, deleteManyCategorySuccess, getAllCategory, updateCategory, updateCategoryError, updateCategorySuccess } from './state/category.actions';
import { getAllCategorySelector } from './state/category.selector';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, tap } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { getLoading } from 'src/app/store/shared/shared.selector';
import { setLoading } from 'src/app/store/shared/shared.action';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class CategoryComponent implements OnInit{

  @ViewChild('dt') dt: Table | undefined;


  constructor(
    private store:Store<AppState>,
    private messageService: MessageService, 
    private confirmationService: ConfirmationService,
    private action$: Actions, 
  ){}
  
  selectedCategorys!: Category[];
  categorys!:  Observable<Category[]>;
  
  loading!: Observable<boolean>;
  categoryDialog!: boolean;
  category!: Category
  statuses: any[]=[]
  submitted!: boolean;

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  ngOnInit(): void {
  
    // this.store.select(getAllCategorySelector).subscribe((data)=>{
    //   if(data!=null){
    //     this.categorys=JSON.parse(JSON.stringify(data))
    //   }      
    // })
    this.categorys=this.store.select(getAllCategorySelector)
    this.loading=this.store.select(getLoading)
    this.store.dispatch(getAllCategory())
    
    this.statuses = [
      { label: 'kích hoạt', value: true },
      { label: 'chưa kích hoạt', value: false },
    ];
    //notify delete category
    this.action$.pipe(
      ofType(deleteCategoryError),
      tap((action)=>{
        this.store.dispatch(setLoading({status:false}))
        this.messageService.add({ severity: 'error', summary: 'Error', detail: action.message, life: 2000 });
      })
    ).subscribe()

    this.action$.pipe(
      ofType(deleteCategorySuccess),
      tap(()=>{
        this.store.dispatch(setLoading({status:false}))
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Xóa thành công!', life: 2000 });
      })
    ).subscribe()
    //notify create category
    this.action$.pipe(
      ofType(createCategorySuccess),
      tap(()=>{
        this.store.dispatch(setLoading({status:false}))
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Thêm thành công!', life: 2000 });
        this.categoryDialog = false;
        this.category={} as Category;
      })
    ).subscribe()

    this.action$.pipe(
      ofType(createCategoryError),
      tap(action=>{
        this.store.dispatch(setLoading({status:false}))
        this.messageService.add({ severity: 'error', summary: 'Error', detail: action.message, life: 2000 });
      })
    ).subscribe()
    //notify update category
    this.action$.pipe(
      ofType(updateCategorySuccess),
      tap(()=>{
        this.store.dispatch(setLoading({status:false}))
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Cập nhật thành công!', life: 2000 });
        this.categoryDialog = false;
        this.category={} as Category;
      })
    ).subscribe()

    this.action$.pipe(
      ofType(updateCategoryError),
      tap(action=>{
        this.store.dispatch(setLoading({status:false}))
        this.messageService.add({ severity: 'error', summary: 'Error', detail: action.message, life: 2000 });
      })
    ).subscribe()

    // norify delete many category
    this.action$.pipe(
      ofType(deleteManyCategorySuccess),
      tap(()=>{
        this.store.dispatch(setLoading({status:false}))
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Xóa thành công!', life: 2000 });
        this.categoryDialog = false;
        this.category={} as Category;
      })
    ).subscribe()

    this.action$.pipe(
      ofType(deleteManyCategoryError),
      tap(action=>{
        this.store.dispatch(setLoading({status:false}))
        this.messageService.add({ severity: 'error', summary: 'Error', detail: action.message, life: 2000 });
      })
    ).subscribe()

  }
  
  
  
  onHandleDelete(){
    
    
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa không?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {    
        const arrayId = this.selectedCategorys.map(category => category.id);
        this.store.dispatch(deleteManyCategory({ids:arrayId}))
        this.store.dispatch(setLoading({status:true}))
      }
    });
  }

  onHandleEdit(category: Category){
    this.category = { ...category };
    this.categoryDialog = true;
  }

  
  onHandleDeleteSingle(categoryId: string){
    
      this.confirmationService.confirm({
        message: 'Bạn có chắc chắn muốn xóa không?',
        header: 'Xác nhận',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {    
          this.store.dispatch(setLoading({status:true}))
          this.store.dispatch(deleteCategory({id:categoryId}))
        }
      });
    
  }

  onHandleCreate(){
    
    this.submitted = true;
    if(this.category.name.trim()) {
      try{
        if (this.category.id) {
          //update category
          this.store.dispatch(updateCategory({category: this.category}))
          this.store.dispatch(setLoading({status:true}))
        }else{
          //create category
          this.store.dispatch(createCategory({category: this.category}))
          this.store.dispatch(setLoading({status:true}))
        }
       
      }catch(error){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Lỗi không xác định!', life: 2000 });
      }
      
    }
    
  }

  hideDialog(){
    this.categoryDialog = false;
    this.submitted = false;
  }

  openDialog(){
    this.category = {} as Category;
    this.categoryDialog = true;
    this.submitted = false;
  }

  getSeverity(status: Boolean) {
    switch (status) {
        case true:
            return 'success';
        default:
            return 'danger';
    }
  }

  
}


