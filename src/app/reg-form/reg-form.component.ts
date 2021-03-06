import { Component, OnInit, HostListener, ElementRef, ViewChild} from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap'

import { RegForm } from '../reg-form.model';
import { RegFormService } from '../reg-form.service';

@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.css']
})
export class RegFormComponent implements OnInit {

  user: FormGroup;
  regFormData: RegForm;

  constructor(
  private regFormService: RegFormService,
  private router: Router,
  private fb: FormBuilder ){}

  ngOnInit() {

    this.regFormService.getRegFormData().subscribe((formData: RegForm)=>{
      console.log ( 'first form' );
      console.log ( formData  );

      this.user = this.fb.group({
        name: [ formData!.name ? formData.name : 'default name', [ Validators.required, Validators.minLength(3) ]],
        email: [formData!.email ? formData.email : '222@email', [ Validators.required, Validators.email ]],
        address: [formData!.address ? formData.address : 'a d d r e s s', [ Validators.required, Validators.minLength(10), Validators.maxLength(100) ]]
      } );
    }).unsubscribe();

  }

  get name() { return this.user.get('name'); }
  get email() { return this.user.get('email'); }
  get address() { return this.user.get('address'); }

  onSubmit({ value, valid }: { value: RegForm, valid: boolean }) {
    console.log(value, valid);
    this.regFormData = new RegForm().deserialize(value);
    console.log(this.regFormData);

    this.regFormService.saveRegFormData(this.regFormData);

    this.router.navigate(['/form/step2']);
  }


}