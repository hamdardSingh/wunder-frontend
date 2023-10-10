import { createReducer, on } from '@ngrx/store';
import { FormState } from './form.state';
import { EditForm, NavigateForm, Reset } from './form.actions';
import { loadFormStateFromLocalStorage } from './localstorage.reducer';


//default form state
const defaultFromState: FormState = loadFormStateFromLocalStorage().formdata as FormState;


export const formReducer = createReducer(
    defaultFromState,
    on(EditForm, (state, { formfields }) => ({
        ...state,
        formfields
    })),
    on(NavigateForm, (state, { step }) => ({
        ...state,
        step
    })),
    on(Reset, () => ({} as FormState))
)