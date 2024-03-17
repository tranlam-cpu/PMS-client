import { createAction, props } from "@ngrx/store";

export const SET_LOADING = '[Shared] Set Loading';
export const SET_MESSAGE = '[Shared] Set Message';

export const setLoading=createAction(
    SET_LOADING, 
    props<{status: boolean}>()
);

export const setMessage=createAction(
    SET_MESSAGE, 
    props<{message: string}>()
)