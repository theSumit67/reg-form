import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule , Validators } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AppComponent } from './app.component';
import { HelloComponent } from './components/hello.component';
import { RegFormComponent } from './reg-form/reg-form.component';
import { RegFormStep2Component } from './reg-form-step2/reg-form-step2.component';

import { RegFormService } from './reg-form.service';



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/' },
  { path: 'hello', component: HelloComponent },
  { path: 'form', children: [
      { path: 'step2', component: RegFormStep2Component },
      { path: '', component: RegFormComponent },
    ]
  }
];


@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    BsDatepickerModule.forRoot()
  ],
  declarations: [ AppComponent, HelloComponent, RegFormComponent, RegFormStep2Component ],
  bootstrap:    [ AppComponent ],
  providers: [RegFormService]
})
export class AppModule { }
