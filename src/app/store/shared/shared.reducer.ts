import { createReducer, on } from "@ngrx/store";
import { initialState } from "./shared.state";
import { setLoading, setMessage } from "./shared.action";

const _SharedReducer = createReducer(
    initialState,
    on(setLoading, (state, action) => {
        return {
            ...state,
            showLoading: action.status
        }
    }),
    on(setMessage,(state, action)=>{
        return {
            ...state,
            errrorMessage: action.message
        }
    })
)

export function SharedReducer(state:any, action:any) {
    return _SharedReducer(state, action);
}