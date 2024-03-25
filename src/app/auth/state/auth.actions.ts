import { createAction, props } from "@ngrx/store"
import { User } from "src/app/models/auth.model"

export const LOGIN_START = '[auth page] login start'
export const LOGIN_SUCCESS = '[auth page] login success'
export const LOGIN_FAIL = '[auth page] login fail'
export const AUTO_LOGIN = '[auth page] auto login'
export const LOGOUT = '[auth page] logout'

export const loginStart = createAction(
    LOGIN_START, 
    props<{email:string,password:string}>()
)

export const loginSuccess= createAction(
    LOGIN_SUCCESS,
    props<{user: User, redirect: boolean}>()
)

export const autoLogin= createAction(AUTO_LOGIN)
export const autoLogout= createAction(LOGOUT)