import { Component, OnInit } from '@angular/core';
import { Router }  from '@angular/router';
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

  regFormStep2Data : RegFormStep2;
  secondaryInfo : FormGroup;

  constructor(
    private router: Router,
    private regFormService: RegFormService,
    private fb: FormBuilder ){}

  ngOnInit() {

    this.regFormService.getRegFormData()
    .subscribe((formData) => {
        if ( !formData ) {
          this.router.navigate(['/form'])
        } else {

        }
      },
      (err) => console.error('something wrong occurred: ' + err),
    );

    this.secondaryInfo = this.fb.group({
        date: ['', [ Validators.required ]],
        contact: ['999999999', [ Validators.required, Validators.pattern ]],
        gender:  ['other', [Validators.required]],
        interested: ''
    });

  }


  get date() { return this.secondaryInfo.get('date'); }
  get contact() { return this.secondaryInfo.get('contact'); }
  get gender() { return this.secondaryInfo.get('gender'); }
  get interested() { return this.secondaryInfo.get('interested'); }


  onSubmit({ value, valid }: { value: RegFormStep2, valid: boolean }) {
    console.log(value, valid);
    this.regFormStep2Data = new RegFormStep2().deserialize(value);

    this.regFormService.saveRegFormStep2Data(this.regFormStep2Data);

    this.regFormService.getAlldata();

    }


}