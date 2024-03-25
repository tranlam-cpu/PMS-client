import { createReducer, on } from "@ngrx/store";
import { initialState } from "./auth.state";
import { autoLogout, loginSuccess } from "./auth.actions";

const _AuthReducer = createReducer(
    initialState,
    on(loginSuccess,(state,action)=>{
        return{
            ...state,
            user: action.user,
        }
    }),
    on(autoLogout,(state)=>{
        return{
            ...state,
            user: null
        }
    })
);

export function AuthReducer(state:any,action:any){
    return _AuthReducer(state,action);
}