import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SharedState } from "./shared.state";

export const SHARED_STATE_NAME = "shared";

export const getSharedState = createFeatureSelector<SharedState>(SHARED_STATE_NAME)

export const getLoading=createSelector(getSharedState,(state)=>{
    return state.showLoading
})

export const getMessage=createSelector(getSharedState,(state)=>{
    return state.errrorMessage
})