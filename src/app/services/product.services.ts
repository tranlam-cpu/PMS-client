import { HttpClient } from "@angular/common/http";
import { AppState } from "../store/app.state";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, map } from "rxjs";
import { Product } from "../models/product.model";
import { environment } from "src/environments/enviroment";
import { CreateProductModal } from "../models/create-product.model";
import { getCategoryNameById } from "../dashboard/category/state/category.selector";
import { EditProductModal } from "../models/edit-product.model";

@Injectable({
    providedIn: 'root'
})
export class ProductService{
    constructor(
        private http: HttpClient,
        private store: Store<AppState>
    ){}

    getAllProduct():Observable<Product[]>{
        return this.http.get<Product[]>(`${environment.apiUrl}product`)
    }

    convertProductData(data: any): Product {
        const responseDataFormat: Product ={
            id: data.id,
            name: data.name,
            description: data.description,
            price: data.price,
            quantity: data.quantity,
            image: data.image,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            category: {
                id: data.categoryId,
                name: ''
            }
        };

        this.store.select(getCategoryNameById, { id: data.categoryId }).subscribe(categoryName => {
            responseDataFormat.category.name = categoryName;
        });
        return responseDataFormat;
    }

    createProduct(product:CreateProductModal):Observable<Product>{
        const formData= new FormData();
        formData.append('name', product.name);
        formData.append('categoryId', product.categoryId);
        product.description && formData.append('description', product.description);
        product.price && formData.append('price', String(product.price));
        product.quantity && formData.append('quantity', String(product.quantity));
        product.image && formData.append('image', product.image);
        return this.http.post<Product>(`${environment.apiUrl}product`, formData).pipe(
            map((data:any)=>{
                const responseDataFormat: Product = this.convertProductData(data)
                return responseDataFormat
            })
        )
        
    }

    editProduct(product:EditProductModal):Observable<Product>{
        const formData= new FormData();
        formData.append('name', product.name);
        formData.append('categoryId', product.categoryId);
        product.description && formData.append('description', product.description);
        product.price && formData.append('price', String(product.price));
        product.quantity && formData.append('quantity', String(product.quantity));
        product.image && formData.append('image', product.image);
        return this.http.patch<Product>(`${environment.apiUrl}product/${product.id}`, formData).pipe(
            map((data:any)=>{
                const responseDataFormat: Product = this.convertProductData(data)
                return responseDataFormat
            })
        )
    }

    deleteProduct(id: string):Observable<Product>{
        return this.http.delete<Product>(`${environment.apiUrl}product/${id}`).pipe(
            map((data:any)=>{
                const responseDataFormat: Product = this.convertProductData(data)
                return responseDataFormat
            })
        
        )
    }

    getSingleProductById(id:string):Observable<Product>{
        return this.http.get<Product>(`${environment.apiUrl}product/${id}`)
    }

    deleteManyProduct(ids: string[]):Observable<string[]>{
        return this.http.post<string[]>(`${environment.apiUrl}product/delete-many`, {ids}).pipe(
            map(()=>ids)
        )
    }
}