import { RouterReducerState, routerReducer } from "@ngrx/router-store";
import { AuthReducer } from "../auth/state/auth.reducer";
import { AUTH_STATE_NAME } from "../auth/state/auth.selector";
import { AuthState } from "../auth/state/auth.state";
import { CategoryReducer } from "../dashboard/category/state/category.reducer";
import { CATEGORY_STATE_NAME } from "../dashboard/category/state/category.selector";
import { CategoryState } from "../dashboard/category/state/category.state";
import { SharedReducer } from "./shared/shared.reducer";
import { SHARED_STATE_NAME } from "./shared/shared.selector";
import { SharedState } from "./shared/shared.state";
import { PRODUCT_STATE_NAME } from "../dashboard/product/state/product.selector";
import { ProductState } from "../dashboard/product/state/product.state";
import { ProductReducer } from "../dashboard/product/state/product.reducer";
import { RENTAL_STATE_NAME } from "../dashboard/rental/state/rental.selector";
import { RentalState } from "../dashboard/rental/state/rental.state";
import { RentalReducer } from "../dashboard/rental/state/rental.reducer";

export interface AppState {
    // auth: AuthState
    [AUTH_STATE_NAME]:AuthState
    [SHARED_STATE_NAME]:SharedState
    [CATEGORY_STATE_NAME]: CategoryState
    [PRODUCT_STATE_NAME]: ProductState
    [RENTAL_STATE_NAME]: RentalState
    router: RouterReducerState
}

export const appReducer = {
    // auth: AuthReducer,
    [AUTH_STATE_NAME]: AuthReducer,
    [SHARED_STATE_NAME]: SharedReducer,
    [CATEGORY_STATE_NAME]: CategoryReducer,
    [PRODUCT_STATE_NAME]: ProductReducer,
    [RENTAL_STATE_NAME]: RentalReducer,
    router: routerReducer
}