import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RentalState, rentalsAdapter } from "./rental.state";

export const RENTAL_STATE_NAME = "rental";

const getRentalState = createFeatureSelector<RentalState>(RENTAL_STATE_NAME);

//selector
export const rentalsSelectors = rentalsAdapter.getSelectors()

export const getAllRentalSelector = createSelector(getRentalState,rentalsSelectors.selectAll)