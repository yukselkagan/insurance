import { ErrorInterceptor } from './interceptors/error.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PersonInfoComponent } from './agreement-components/person-info/person-info.component';
import { PriceInfoComponent } from './agreement-components/price-info/price-info.component';
import { InsuranceFormComponent } from './insurance-form/insurance-form.component';
import { PolicySelectComponent } from './agreement-components/policy-select/policy-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { HttpErrorComponent } from './http-error/http-error.component';
import { SuccessComponent } from './success/success.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PersonInfoComponent,
    PriceInfoComponent,
    InsuranceFormComponent,
    PolicySelectComponent,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    HttpErrorComponent,
    SuccessComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
