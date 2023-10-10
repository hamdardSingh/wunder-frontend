import { createAction, props } from '@ngrx/store';
import { FormFields, FormState } from './form.state';

export const InitState = createAction('[Form] Init', props<{ formdata: FormState }>());
export const EditForm = createAction('[Form] Edit', props<{ formfields: FormFields }>());
export const NavigateForm = createAction('[Form] Navigate', props<{ step: number }>());
export const Reset = createAction('[Form] Reset');
