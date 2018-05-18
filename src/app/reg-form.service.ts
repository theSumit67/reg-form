import { Injectable } from '@angular/core';
import { RegForm, RegFormStep2  } from './reg-form.model';
import { Observable, ReplaySubject, zip, combineLatest } from 'rxjs';



@Injectable()
export class RegFormService {

  regFormData = new ReplaySubject(1);
  regFormStep2Data = new ReplaySubject(1);

  constructor() {
    this.regFormData.next(false);
    this.regFormStep2Data.next(false);
  }

  saveRegFormData( formData : RegForm ){
    this.regFormData.next(formData);
  }
  getRegFormData() {
      return this.regFormData.asObservable();
  }

  saveRegFormStep2Data( formData : RegFormStep2 ){
    this.regFormStep2Data.next(formData);
  }

  getRegFormStep2Data(): Observable<any> {
    return this.regFormStep2Data.asObservable();
  }

  getAlldata(): void {

    combineLatest(this.regFormData.asObservable(), this.regFormStep2Data.asObservable())
    .subscribe(([fData, sData ]) => {
      console.log ( Object.assign(fData, sData));
    }, (err) => {
      console.error('Error occurred: ' + err )
    }).unsubscribe();

  }
}