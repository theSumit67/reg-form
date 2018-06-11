import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule , Validators } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatDialogModule, MatInputModule, MatButtonModule, MatFormFieldModule } from '@angular/material';

import { AppComponent } from './app.component';
import { HelloComponent } from './components/hello.component';
import { RegFormComponent } from './reg-form/reg-form.component';
import { RegFormStep2Component } from './reg-form-step2/reg-form-step2.component';
import { DataTableComponent, DialogRowEditComponent } from './data-table/data-table.component';

import { RegFormService } from './reg-form.service';



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/' },
  { path: 'hello', component: HelloComponent },
  { path: 'data-table', component: DataTableComponent },
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
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    NgxDatatableModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  declarations: [ AppComponent, HelloComponent, RegFormComponent, RegFormStep2Component, DataTableComponent, DialogRowEditComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ RegFormService ],
  entryComponents: [ DialogRowEditComponent ]
})
export class AppModule { }
