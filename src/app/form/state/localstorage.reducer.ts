import { ActionReducer } from '@ngrx/store';
import { FormState } from './form.state';

export const LOCAL_STORAGE_KEY = 'formState';

export function localStorageMetaReducer(reducer: ActionReducer<{ formdata: FormState }>): ActionReducer<{ formdata: FormState }> {
    return (state, action) => {
        const newState = reducer(state, action);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
        return newState;
    };
}

export function loadFormStateFromLocalStorage(): { formdata: FormState } {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? '{}');
} 
