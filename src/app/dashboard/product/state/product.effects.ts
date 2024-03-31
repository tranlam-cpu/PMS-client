import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { ProductService } from "src/app/services/product.services";
import { AppState } from "src/app/store/app.state";
import { createProduct, createProductFail, createProductSuccess, deleteManyProduct, deleteManyProductFail, deleteManyProductSuccess, deleteProduct, deleteProductFail, deleteProductSuccess, editProduct, editProductFail, editProductSuccess, getAllProduct, getAllProductSuccess } from "./product.action";
import { catchError, filter, map, of, switchMap, tap, withLatestFrom } from "rxjs";
import { ROUTER_NAVIGATION, RouterNavigatedAction } from "@ngrx/router-store";
import { getAllProductSelector } from "./product.selector";
import { Router } from "@angular/router";
import { updateCategorySuccess } from "../../category/state/category.actions";


@Injectable()
export class ProductEffects{
    constructor(
        private action$: Actions,
        private productService: ProductService,
        private store: Store<AppState>,
        private router: Router
    ){}

    getAllProduct$=createEffect(()=>{
        return this.action$.pipe(
            ofType(getAllProduct, updateCategorySuccess),
            withLatestFrom(this.store.select(getAllProductSelector)),
            switchMap(([action,products])=>{
                if(!products.length || action.type===updateCategorySuccess.type){
                    return this.productService.getAllProduct().pipe(
                        map((data)=>{
                            
                            return getAllProductSuccess({products: data})
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


    createProduct$=createEffect(()=>{
        return this.action$.pipe(
            ofType(createProduct),
            switchMap((action)=>{
                return this.productService.createProduct(action.product).pipe(
                    map((data)=>{
                        return createProductSuccess({product: data})
                    }),
                    catchError((error)=>{
                        return of(createProductFail({message: "tạo mới thất bại!"}))
                    })
                )
            })
        )
    })

    editProduct$=createEffect(()=>{
        return this.action$.pipe(
            ofType(editProduct),
            switchMap((action)=>{
                return this.productService.editProduct(action.product).pipe(
                    map((data)=>{
                        return editProductSuccess({product: {id: data.id, changes: {...data}}})
                    }),
                    catchError((error)=>{
                        return of(editProductFail({message: "chỉnh sửa thất bại!"}))
                    })
                )
            })
        )
    })

   


    deleteProduct$=createEffect(()=>{
        return this.action$.pipe(
            ofType(deleteProduct),
            switchMap((action)=>{
                return this.productService.deleteProduct(action.id).pipe(
                    map((data)=>{
                        return deleteProductSuccess({product: data})
                    }),
                    catchError((error)=>{
                        return of(deleteProductFail({message: "xoá thất bại!"}))
                    })
                )
            })
        )
    })

    deleteManyProduct$=createEffect(()=>{
        return this.action$.pipe(
            ofType(deleteManyProduct),
            switchMap((action)=>{
                return this.productService.deleteManyProduct(action.ids).pipe(
                    map((data)=>{
                        return deleteManyProductSuccess({ids: data})
                    }),
                    catchError((error)=>{
                        return of(deleteManyProductFail({message: "xoá thất bại!"}))
                    })
                )
            })
        )
    })


    getSingleProduct$=createEffect(()=>{
        return this.action$.pipe(
            ofType(ROUTER_NAVIGATION),
            filter((r: RouterNavigatedAction) =>{
                
                return r.payload.routerState.url.startsWith('/dashboard/pd/edit')
            }),
            map((r: any)=>{
                return r.payload.routerState['params']['id']
            }),
            withLatestFrom(this.store.select(getAllProductSelector)),
            switchMap(([id,products])=>{
                if(!products.length){
                    return this.productService.getSingleProductById(id).pipe(
                        map((product)=>{
                            const productData=[{...product,id}]
                            return getAllProductSuccess({products: productData})
                        })
                    )
                }
                return of();
            })
        )
    })
    
}