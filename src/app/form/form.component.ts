import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-form',
  imports: [
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
export class FormComponent implements AfterViewInit {
  @ViewChild('stepper') stepper: MatStepper = {} as MatStepper;
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
  constructor(private _fb: FormBuilder) { }

  ngAfterViewInit(): void {
    // this.stepper.selectedIndex = 0; 
  }
}
