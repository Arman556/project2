import { NgModule } from "@angular/core";
import { AlertModule } from "src/app/shared/alert/alert.module";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CustomValidatorModule } from "src/app/shared/custom-validator/custom-validator.module";
import { UserPageComponent } from "./user-page.component";

@NgModule({
  declarations: [UserPageComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    CustomValidatorModule,
    AlertModule,
  ],
  exports: [UserPageComponent],
})
export class UserPageModule {}
