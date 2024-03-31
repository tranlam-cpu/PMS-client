import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { CategoryService } from "src/app/services/category.services";
import { AppState } from "src/app/store/app.state";
import { createCategory, createCategoryError, createCategorySuccess, deleteCategory, deleteCategoryError, deleteCategorySuccess, deleteManyCategory, deleteManyCategoryError, deleteManyCategorySuccess, getAllCategory, getAllCategorySuccess, updateCategory, updateCategoryError, updateCategorySuccess } from "./category.actions";
import { catchError, map, mergeMap, of, switchMap, tap, withLatestFrom } from "rxjs";
import { Category } from "src/app/models/category.model";
import { Update } from "@ngrx/entity";
import { getAllCategorySelector } from "./category.selector";
import { getAllProduct } from "../../product/state/product.action";





@Injectable()
export class CategoryEffects{
    constructor(
        private action$: Actions, 
        private categoryService: CategoryService,
        private store: Store<AppState>,
    ){}


    getAllCategory$=createEffect(()=>{
        return this.action$.pipe(
            ofType(getAllCategory),
            withLatestFrom(this.store.select(getAllCategorySelector)),
            mergeMap(([action,categories])=>{
                if(!categories.length){
                    return this.categoryService.getAllCategory().pipe(
                        map((data)=>{
                            
                            return getAllCategorySuccess({category: data})
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

    createCategory$=createEffect(()=>{
        return this.action$.pipe(
            ofType(createCategory),
            mergeMap((action)=>{
                return this.categoryService.createCategory(action.category).pipe(
                    map((data)=>{
                        return createCategorySuccess({category: data})
                    }),
                    catchError((error)=>{
                        return of(createCategoryError({message: "tạo mới thất bại!"}))
                    })
                )
            })
        )
    })

    deleteCategory$=createEffect(()=>{
        return this.action$.pipe(
            ofType(deleteCategory),
            mergeMap((action)=>{
                return this.categoryService.deleteCategory(action.id).pipe(
                    map((data)=>{
                        return deleteCategorySuccess({category: data})
                    }),
                    catchError((error)=>{
                        return of(deleteCategoryError({message: "xoá thất bại!"}))
                    })
                )
            })
        )
    })

    deleteManyCategory$=createEffect(()=>{
        return this.action$.pipe(
            ofType(deleteManyCategory),
            switchMap((action)=>{
                return this.categoryService.deleteManyCategory(action.ids).pipe(
                    map((data)=>{
                        return deleteManyCategorySuccess({ids: data})
                    }),
                    catchError((error)=>{
                        return of(deleteManyCategoryError({message: "xoá thất bại!"}))
                    })
                )
            })
        )
    })

    updateCategory$=createEffect(()=>{
        return this.action$.pipe(
            ofType(updateCategory),
            switchMap((action)=>{
                return this.categoryService.updateCategory(action.category).pipe(
                    map((data)=>{
                        return updateCategorySuccess({category: {id: action.category.id, changes: {...action.category}}})
                    }),
                    catchError((error)=>{
                        return of(updateCategoryError({message: "cập nhật thất bại!"}))
                    })
                )
            })
        )
    })
}