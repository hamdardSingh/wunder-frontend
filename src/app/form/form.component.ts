import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { Store } from '@ngrx/store';
import { Observable, Subscription, finalize, first, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormFields, FormState } from './state/form.state';
import { EditForm, NavigateForm, Reset } from './state/form.actions';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-form',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  standalone: true
})
export class FormComponent implements OnInit, OnDestroy {

  personalFormGroup = this._fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    phone: ['', Validators.required]
  });

  addressFormGroup = this._fb.group({
    street: ['', Validators.required],
    number: ['', Validators.required],
    zip: ['', Validators.required],
    city: ['', Validators.required],
  });

  paymentFormGroup = this._fb.group({
    name: ['', Validators.required],
    iban: ['', Validators.required],
  });

  formData = this._fb.group({
    personal: this.personalFormGroup,
    address: this.addressFormGroup,
    payment: this.paymentFormGroup
  });

  formData$: Observable<FormState>;
  subscriptions: Subscription = new Subscription();
  slectectedStep = 0;
  isLoading = false;
  paymentId: string | null = null;

  constructor(private _fb: FormBuilder, private store: Store<{ formdata: FormState }>, private apiService: ApiService) {
    this.formData$ = this.store.select('formdata');
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.formData$.pipe(
        first(),
        tap(data => {
          this.personalFormGroup.setValue({
            firstname: data.formfields?.personal?.firstname ?? '',
            lastname: data.formfields?.personal?.lastname ?? '',
            phone: data.formfields?.personal?.phone ?? '',
          })

          this.addressFormGroup.setValue({
            street: data.formfields?.address?.city ?? '',
            number: data.formfields?.address?.city ?? '',
            zip: data.formfields?.address?.city ?? '',
            city: data.formfields?.address?.city ?? ''
          })

          this.paymentFormGroup.setValue({
            name: data.formfields?.payment?.name ?? '',
            iban: data.formfields?.payment?.iban ?? '',
          });
          this.slectectedStep = data.step;
        }))
        .subscribe()
    )
  }

  onStepChange(index: number): void {
    this.store.dispatch(EditForm({ formfields: this.formData.value as FormFields }));
    this.store.dispatch(NavigateForm({ step: index }));
  }

  saveForm() {
    this.isLoading = true;
    this.subscriptions.add(
      this.apiService.saveForm(this.formData.value as FormFields)
        .pipe(finalize(() => this.isLoading = false))
        .pipe(tap((data) => {
          this.paymentId = data.paymentDataId;
          this.store.dispatch(Reset());
        }))
        .subscribe()
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
