import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { CreateProductModal } from "src/app/models/create-product.model";
import { EditProductModal } from "src/app/models/edit-product.model";
import { Product } from "src/app/models/product.model";


export const GET_ALL_PRODUCT = '[Product] Get All Product';
export const GET_ALL_PRODUCT_SUCCESS = '[Product] Get All Product Success';

export const getAllProduct=createAction(GET_ALL_PRODUCT)
export const getAllProductSuccess=createAction(
    GET_ALL_PRODUCT_SUCCESS,
    props<{products: Product[]}>()
)

//create product action

export const CREATE_PRODUCT = '[Product] Create Product';
export const CREATE_PRODUCT_SUCCESS = '[Product] Create Product Success';
export const CREATE_PRODUCT_FAIL = '[Product] Create Product Fail';

export const createProduct=createAction(
    CREATE_PRODUCT,
    props<{product: CreateProductModal}>()
)

export const createProductSuccess=createAction(
    CREATE_PRODUCT_SUCCESS,
    props<{product: Product}>()
)

export const createProductFail=createAction(
    CREATE_PRODUCT_FAIL,
    props<{message: string}>()
)


//delete product action

export const DELETE_PRODUCT = '[Product] Delete Product';
export const DELETE_PRODUCT_SUCCESS = '[Product] Delete Product Success';
export const DELETE_PRODUCT_FAIL = '[Product] Delete Product Fail';

export const deleteProduct=createAction(
    DELETE_PRODUCT,
    props<{id: string}>()
)
export const deleteProductSuccess=createAction(
    DELETE_PRODUCT_SUCCESS,
    props<{product: Product}>()
)

export const deleteProductFail=createAction(
    DELETE_PRODUCT_FAIL,
    props<{message: string}>()
)

//delete many product action

export const DELETE_MANY_PRODUCT = '[Product] Delete Many Product';
export const DELETE_MANY_PRODUCT_SUCCESS = '[Product] Delete Many Product Success';
export const DELETE_MANY_PRODUCT_FAIL = '[Product] Delete Many Product Fail';

export const deleteManyProduct=createAction(
    DELETE_MANY_PRODUCT,
    props<{ids: string[]}>()
)

export const deleteManyProductSuccess=createAction(
    DELETE_MANY_PRODUCT_SUCCESS,
    props<{ids: string[]}>()
)

export const deleteManyProductFail=createAction(
    DELETE_MANY_PRODUCT_FAIL,
    props<{message: string}>()
)

//edit product action

export const EDIT_PRODUCT = '[Product] Edit Product';
export const EDIT_PRODUCT_SUCCESS = '[Product] Edit Product Success';
export const EDIT_PRODUCT_FAIL = '[Product] Edit Product Fail';

export const editProduct=createAction(
    EDIT_PRODUCT,
    props<{product: EditProductModal}>()
)

export const editProductSuccess=createAction(
    EDIT_PRODUCT_SUCCESS,
    props<{product: Update<Product>}>()
)

export const editProductFail=createAction(
    EDIT_PRODUCT_FAIL,
    props<{message: string}>()
)