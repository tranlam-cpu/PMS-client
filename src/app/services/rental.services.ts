import { HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.state";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Rental } from "../models/rental.model";
import { environment } from "src/environments/enviroment";


@Injectable({
    providedIn: 'root'
})
export class RentalService{
    constructor(
        private http: HttpClient,
        private store: Store<AppState>
    ){}

    getAllRental():Observable<Rental[]>{
        return this.http.get<Rental[]>(`${environment.apiUrl}rental`)
    }

    deleteManyRental(ids: string[]):Observable<string[]>{
        return this.http.post<string[]>(`${environment.apiUrl}rental/delete-many`, {ids}).pipe(
            map(()=>ids)
        )
    }
}