

export interface SharedState {
    showLoading: boolean;
    errrorMessage: string;
}

export const initialState: SharedState={
    showLoading: false,
    errrorMessage: ''
}