import { NgModule } from "@angular/core";
import { NameValidatorDirective } from './name-validator.directive';
import { PhoneNumberValidatorDirective } from './phone-number-validator.directive';

@NgModule({
    declarations: [NameValidatorDirective, PhoneNumberValidatorDirective],
    imports: [],
    exports: [NameValidatorDirective, PhoneNumberValidatorDirective]
})
export class CustomValidatorModule {}