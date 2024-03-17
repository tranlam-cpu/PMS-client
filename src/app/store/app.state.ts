import { AuthReducer } from "../auth/state/auth.reducer";
import { AUTH_STATE_NAME } from "../auth/state/auth.selector";
import { AuthState } from "../auth/state/auth.state";
import { SharedReducer } from "./shared/shared.reducer";
import { SHARED_STATE_NAME } from "./shared/shared.selector";
import { SharedState } from "./shared/shared.state";

export interface AppState {
    // auth: AuthState
    [AUTH_STATE_NAME]:AuthState
    [SHARED_STATE_NAME]:SharedState
}

export const appReducer = {
    // auth: AuthReducer,
    [AUTH_STATE_NAME]: AuthReducer,
    [SHARED_STATE_NAME]: SharedReducer
}