import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { Store } from '@ngrx/store';
import { Observable, Subscription, first, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormFields, FormState } from './state/form.state';
import { EditForm, NavigateForm } from './state/form.actions';

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
    patyment: this.paymentFormGroup
  });

  formData$: Observable<FormState>;
  subscriptions: Subscription = new Subscription();
  slectectedStep: number = 0;

  constructor(private _fb: FormBuilder, private store: Store<{ formdata: FormState }>) {
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
