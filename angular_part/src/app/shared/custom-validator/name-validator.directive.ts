import { Directive } from "@angular/core";
import { NG_VALIDATORS, AbstractControl, Validator } from "@angular/forms";

@Directive({
  selector: "[appNameValidator]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: NameValidatorDirective,
      multi: true,
    },
  ],
})
export class NameValidatorDirective implements Validator {
  constructor() {}
  validate(control: AbstractControl): { [key: string]: boolean | null } {
    const regexpName = /^[a-zA-Z_\-]+$/;
    return regexpName.test(control.value) ||
      control.value.length === 0
      ? null
      : { 'name-validate': false };
  }
}
