import { SuccessComponent } from './success/success.component';
import { HttpErrorComponent } from './http-error/http-error.component';
import { HomeComponent } from './home/home.component';
import { InsuranceFormComponent } from './insurance-form/insurance-form.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'policy', component: InsuranceFormComponent },
  {path: 'http-error', component: HttpErrorComponent },
  {path: 'success', component: SuccessComponent },
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
