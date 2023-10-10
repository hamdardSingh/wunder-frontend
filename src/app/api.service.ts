import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormFields } from './form/state/form.state';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {

  }

  saveForm(data: FormFields): Observable<{ paymentDataId: string }> {
    return this.http.post<{ paymentDataId: string }>('/default/wunderfleet-recruiting-backend-dev-save-payment-data', { customerId: 1, iban: data.payment.iban, owner: data.payment.name });
  }
}
