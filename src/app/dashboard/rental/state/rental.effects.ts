import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { RentalService } from "src/app/services/rental.services";
import { AppState } from "src/app/store/app.state";
import { deleteManyRental, deleteManyRentalFail, deleteManyRentalSuccess, getAllRental, getAllRentalSuccess } from "./rental.action";
import { catchError, map, of, switchMap, withLatestFrom } from "rxjs";
import { getAllRentalSelector } from "./rental.selector";

@Injectable()
export class RentalEffects{
    constructor(
        private action$: Actions,
        private rentalService: RentalService,
        private store: Store<AppState>,
    ){}

    getAllRental$=createEffect(()=>{
        return this.action$.pipe(
            ofType(getAllRental),
            withLatestFrom(this.store.select(getAllRentalSelector)),
            switchMap(([action,rentals])=>{
             
                if(!rentals.length){
        
                    return this.rentalService.getAllRental().pipe(
                        map((data)=>{
                            return getAllRentalSuccess({rentals: data})
                        }),
                        catchError((error)=>{
                            return of(error)
                        })
                    )
                }
                return of()
            })
        )
    })

    deleteManyRental$=createEffect(()=>{
        return this.action$.pipe(
            ofType(deleteManyRental),
            switchMap((action)=>{
                return this.rentalService.deleteManyRental(action.ids).pipe(
                    map((data)=>{
                        return deleteManyRentalSuccess({ids: data})
                    }),
                    catchError((error)=>{
                        return of(deleteManyRentalFail({message: "Xóa thất bại!"}))
                    })
                )
            })
        )
    })
}