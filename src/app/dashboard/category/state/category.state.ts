import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { Category } from "src/app/models/category.model"

export interface CategoryState extends EntityState<Category>{
    //ko extends - ko dung entity
    // category: Category[];
}

export const categorysAdapter = createEntityAdapter<Category>()

export const initialState: CategoryState = categorysAdapter.getInitialState()

// export const initialState: CategoryState = {
//     category: [],
// }
