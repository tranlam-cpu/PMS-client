import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/enviroment";
import { Category } from "../models/category.model";
import { getAllCategory } from "../dashboard/category/state/category.actions";
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.state";

@Injectable({
    providedIn: 'root'
})
export class CategoryService{

    constructor(
        private http: HttpClient,
        private store: Store<AppState>
    ){}

    getAllCategory():Observable<Category[]>{
        return this.http.get<Category[]>(`${environment.apiUrl}category`).pipe(
            map((data)=>{
                const category: Category[] = []
                for(let key in data){
                    category.push(data[key])
                }
                
                return category
            })
        )
    }

    createCategory(category: Category):Observable<Category>{
        return this.http.post<Category>(`${environment.apiUrl}category`, category)
    }

    deleteCategory(id: string):Observable<Category>{
        return this.http.delete<Category>(`${environment.apiUrl}category/${id}`)
    }

    updateCategory(category: Category):Observable<Category>{
        return this.http.patch<Category>(`${environment.apiUrl}category/${category.id}`, category)
    }

    deleteManyCategory(ids: string[]):Observable<string[]>{
        return this.http.post<string[]>(`${environment.apiUrl}category/delete-many`, {ids}).pipe(
            map(()=>ids)
        )
    }
}