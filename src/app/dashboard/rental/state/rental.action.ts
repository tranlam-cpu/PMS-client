import { createAction, props } from "@ngrx/store";
import { Rental } from "src/app/models/rental.model";


export const GET_ALL_RENTAL = '[Rental] Get All Rental';
export const GET_ALL_RENTAL_SUCCESS = '[Rental] Get All Rental Success';

export const getAllRental=createAction(GET_ALL_RENTAL)

export const getAllRentalSuccess=createAction(
    GET_ALL_RENTAL_SUCCESS,
    props<{rentals: Rental[]}>()
)

//delete many rental
export const DELETE_MANY_RENTAL = '[Rental] Delete Many Rental';
export const DELETE_MANY_RENTAL_SUCCESS = '[Rental] Delete Many Rental Success';
export const DELETE_MANY_RENTAL_FAIL = '[Rental] Delete Many Rental Fail';

export const deleteManyRental=createAction(
    DELETE_MANY_RENTAL,
    props<{ids: string[]}>()
)

export const deleteManyRentalSuccess=createAction(
    DELETE_MANY_RENTAL_SUCCESS,
    props<{ids: string[]}>()
)

export const deleteManyRentalFail=createAction(
    DELETE_MANY_RENTAL_FAIL,
    props<{message: string}>()
)