import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { Rental } from "src/app/models/rental.model";

export interface RentalState extends EntityState<Rental>{}

export const rentalsAdapter = createEntityAdapter<Rental>()

export const initialState: RentalState = rentalsAdapter.getInitialState()