import { createReducer, on } from "@ngrx/store";
import { initialState, rentalsAdapter } from "./rental.state";
import { deleteManyRentalSuccess, getAllRentalSuccess } from "./rental.action";


const _RentalReducer = createReducer(
    initialState,
    on(getAllRentalSuccess, (state:any, action:any) => {
        return rentalsAdapter.setAll(action.rentals, state)
    }),
    on(deleteManyRentalSuccess, (state:any, action:any) => {
        return rentalsAdapter.removeMany(action.ids, state)
    
    })
)

export function RentalReducer(state:any, action:any) {
    return _RentalReducer(state, action);
}