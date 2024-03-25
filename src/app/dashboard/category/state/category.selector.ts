import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CategoryState, categorysAdapter } from "./category.state";


export const CATEGORY_STATE_NAME = "category";

const getCategoryState = createFeatureSelector<CategoryState>(CATEGORY_STATE_NAME);

//selector
export const categorysSelectors = categorysAdapter.getSelectors()


// export const getAllCategorySelector=createSelector(getCategoryState,(state)=>{
//     return state.category
// })

export const getAllCategorySelector = createSelector(getCategoryState, categorysSelectors.selectAll)

export const getCategoryEntities=createSelector(
    getCategoryState,
    categorysSelectors.selectEntities
)

export const getCategoryNameById=createSelector(
    getCategoryEntities,
    (entities:any, props:any)=>{
        return entities ? entities[props.id].name : null
    }
)