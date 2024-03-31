import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { getLoading } from 'src/app/store/shared/shared.selector';
import { getAllRentalSelector } from './state/rental.selector';
import { DELETE_MANY_RENTAL_FAIL, DELETE_MANY_RENTAL_SUCCESS, deleteManyRental, getAllRental } from './state/rental.action';
import { Rental } from 'src/app/models/rental.model';
import { setLoading } from 'src/app/store/shared/shared.action';
import { Actions } from '@ngrx/effects';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class RentalComponent implements OnInit{
  rentals!: Observable<Rental[]>;
  selectedRentals: Rental[]=[]
  loading!: Observable<boolean>;

  @ViewChild('dt') dt: Table | undefined;

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  
  
  constructor(
    private store:Store<AppState>,
    private messageService: MessageService, 
    private confirmationService: ConfirmationService,
    private action$: Actions
  ){}

  ngOnInit(): void {
    this.loading=this.store.select(getLoading)
    this.rentals=this.store.select(getAllRentalSelector)

    
    this.store.dispatch(getAllRental())

    //delete many rental notify
    this.action$.subscribe((action: any) => {
      if(action.type === DELETE_MANY_RENTAL_SUCCESS){
        this.store.dispatch(setLoading({status:false}))
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Xóa thành công!', life: 2000 });
      }
      if(action.type === DELETE_MANY_RENTAL_FAIL){
        this.store.dispatch(setLoading({status:false}))
        this.messageService.add({severity:'error', summary:'Error', detail:action.message, life: 2000 });
      }
    });
  }
  

  onHandleDelete(){
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa không?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {    
        const arrayId = this.selectedRentals.map(reltal => reltal.id);
        this.store.dispatch(deleteManyRental({ids: arrayId}));
        this.store.dispatch(setLoading({status:true}))
      }
    });
  }
}
