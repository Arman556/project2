import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appPhoneNumberValidator]',
  providers: [
    {provide: NG_VALIDATORS,
    useExisting: PhoneNumberValidatorDirective,
    multi: true
    }
  ]
})
export class PhoneNumberValidatorDirective implements Validator{

  constructor() { }
  validate(control: AbstractControl): {[key: string]: boolean} | null {
    const regexpPhoneNo = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
    return regexpPhoneNo.test(control.value) && control.value.length === 14 ? null : { 'phoneNumberValidate': false};
  }

}
