import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { isEmpty, tap,delay } from 'rxjs/operators'

import { RegFormStep2 } from '../reg-form.model'
import { RegFormService } from '../reg-form.service';

@Component({
  selector: 'app-reg-form-step2',
  templateUrl: './reg-form-step2.component.html',
  styleUrls: ['./reg-form-step2.component.css']
})
export class RegFormStep2Component implements OnInit {

  regFormStep2Data: RegFormStep2;
  secondaryInfo: FormGroup;

  constructor(
    private router: Router,
    private regFormService: RegFormService,
    private fb: FormBuilder ) {}

  ngOnInit() {

    this.regFormService.getRegFormData()
    .subscribe((formData) => {
        if ( !formData ) {
          this.router.navigate(['/form']);
        }
      }).unsubscribe();

    this.regFormService.getRegFormStep2Data().subscribe((savedData: RegFormStep2) => {
      this.secondaryInfo = this.fb.group({
        date: [ savedData.date ? savedData.date : '', [ Validators.required ]],
        contact: [savedData.contact ? savedData.contact : '', [ Validators.required, Validators.pattern ]],
        gender:  [savedData.gender ? savedData.gender : 'other', [Validators.required]],
        interested: savedData.interested ? savedData.interested : false
      });
    }).unsubscribe();

  }


  get date() { return this.secondaryInfo.get('date'); }
  get contact() { return this.secondaryInfo.get('contact'); }
  get gender() { return this.secondaryInfo.get('gender'); }
  get interested() { return this.secondaryInfo.get('interested'); }

  saveFormData(): boolean {

    if ( this.secondaryInfo.valid ){

      this.regFormStep2Data = new RegFormStep2().deserialize(this.secondaryInfo.value);
      this.regFormService.saveRegFormStep2Data(this.regFormStep2Data);
      return true
    }
    return false;
  }

  goToPrevForm(){
    this.saveFormData() ? this.router.navigate(['/form']) : '';
  }

  onSubmit({ value, valid }: { value: RegFormStep2, valid: boolean }) {
    console.log(value, valid);
    this.saveFormData();
    this.regFormService.getAlldata();
  }


}
