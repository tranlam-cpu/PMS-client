import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState, productsAdapter } from "./product.state";
import { getCurrentRoute } from "src/app/store/router/router.selector";
import { RouterStateUrl } from "src/app/store/router/custom-serializer";


export const PRODUCT_STATE_NAME = "product";

const getProductState = createFeatureSelector<ProductState>(PRODUCT_STATE_NAME);

//selector
export const productsSelectors = productsAdapter.getSelectors()

export const getAllProductSelector = createSelector(getProductState,productsSelectors.selectAll)

//entities
export const getProductEntities=createSelector(
    getProductState,
    productsSelectors.selectEntities
)

export const getProductById=createSelector(
    getProductEntities,
    getCurrentRoute,
    (entities:any, route: RouterStateUrl)=>{
        return entities[route.params['id']] 
    }
)