import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { Product } from "src/app/models/product.model";


export interface ProductState extends EntityState<Product>{
}

export const productsAdapter = createEntityAdapter<Product>()

export const initialState: ProductState = productsAdapter.getInitialState()