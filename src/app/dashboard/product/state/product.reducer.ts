import { createReducer, on } from "@ngrx/store";
import { initialState, productsAdapter } from "./product.state";
import { createProduct, createProductSuccess, deleteManyProductSuccess, deleteProduct, deleteProductSuccess, editProductSuccess, getAllProductSuccess } from "./product.action";


const _ProductReducer = createReducer(
    initialState,
    on(getAllProductSuccess, (state:any, action:any) => {
        return productsAdapter.setAll(action.products, state)
    }),
    on(createProductSuccess, (state:any, action:any) => {
        return productsAdapter.addOne(action.product, state)
    }),
    on(deleteProductSuccess, (state:any, action:any) => {
        return productsAdapter.removeOne(action.product.id, state)
    
    }),
    on(deleteManyProductSuccess, (state:any, action:any) => {
        return productsAdapter.removeMany(action.ids, state)
    }),
    on(editProductSuccess,(state:any, action:any)=>{
        return productsAdapter.updateOne(action.product, state)
    })
)

export function ProductReducer(state:any, action:any) {
    return _ProductReducer(state, action);
}