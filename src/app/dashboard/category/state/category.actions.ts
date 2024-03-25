import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { Category } from "src/app/models/category.model";


export const GET_ALL_CATEGORY = '[Category] Get All Category';
export const GET_ALL_CATEGORY_SUCCESS = '[Category] Get All Category Success';

export const CREATE_CATEGORY = '[Category] Create Category';
export const CREATE_CATEGORY_SUCCESS = '[Category] Create Category Success';
export const CREATE_CATEGORY_ERROR = '[Category] Create Category Error';

export const DELETE_CATEGORY = '[Category] Delete Category';
export const DELETE_CATEGORY_SUCCESS = '[Category] Delete Category Success';
export const DELETE_CATEGORY_ERROR = '[Category] Delete Category Error';

export const UPDATE_CATEGORY = '[Category] Update Category';
export const UPDATE_CATEGORY_SUCCESS = '[Category] Update Category Success';
export const Update_CATEGORY_ERROR = '[Category] Update Category Error';

export const DELETE_MANY_CATEGORY = '[Category] Delete Many Category';
export const DELETE_MANY_CATEGORY_SUCCESS = '[Category] Delete Many Category Success';
export const DELETE_MANY_CATEGORY_ERROR = '[Category] Delete Many Category Error';

//get all action
export const getAllCategory = createAction(GET_ALL_CATEGORY)
export const getAllCategorySuccess = createAction(
    GET_ALL_CATEGORY_SUCCESS,
    props<{category: Category[]}>()
)
//create action
export const createCategory=createAction(
    CREATE_CATEGORY,
    props<{category: Category}>()
)

export const createCategorySuccess=createAction(
    CREATE_CATEGORY_SUCCESS,
    props<{category: Category}>()
)

export const createCategoryError=createAction(
    CREATE_CATEGORY_ERROR,
    props<{message: string}>()
)
//delete action
export const deleteCategory=createAction(
    DELETE_CATEGORY,
    props<{id: string}>()
)
export const deleteCategorySuccess=createAction(
    DELETE_CATEGORY_SUCCESS,
    props<{category: Category}>()
)

export const deleteCategoryError=createAction(
    DELETE_CATEGORY_ERROR,
    props<{message: string}>()
)

//update action
export const updateCategory=createAction(
    UPDATE_CATEGORY,
    props<{category: Category}>()
)

//use entity
export const updateCategorySuccess=createAction(
    UPDATE_CATEGORY_SUCCESS,
    props<{category: Update<Category>}>()
)

export const updateCategoryError=createAction(
    Update_CATEGORY_ERROR,
    props<{message: string}>()
)

//delete many action

export const deleteManyCategory=createAction(
    DELETE_MANY_CATEGORY,
    props<{ids: string[]}>()
)

export const deleteManyCategorySuccess=createAction(
    DELETE_MANY_CATEGORY_SUCCESS,
    props<{ids: string[]}>()
)

export const deleteManyCategoryError=createAction(
    DELETE_MANY_CATEGORY_ERROR,
    props<{message: string}>()
)