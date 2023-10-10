import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopNavComponent } from './top-nav/top-nav.component';
import { FormComponent } from './form/form.component';
import { StoreModule } from '@ngrx/store';
import { formReducer } from './form/state/form.reducer';
import { localStorageMetaReducer } from './form/state/localstorage.reducer';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TopNavComponent,
    FormComponent,
    HttpClientModule,
    StoreModule.forRoot({formdata: formReducer}, { metaReducers: [localStorageMetaReducer] })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
