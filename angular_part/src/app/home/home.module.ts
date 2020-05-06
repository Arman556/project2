import { NgModule } from "@angular/core";
import { UserPageComponent } from "./user-page/user-page.component";
import { HomeRouterModule } from "./home-router.module";
import { BrowserModule } from "@angular/platform-browser";
import { DefaultPageComponent } from "./default-page/default-page.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NewUserComponent } from "./new-user/new-user.component";
import { CustomValidatorModule } from "../shared/custom-validator/custom-validator.module";
import { CustomerPageComponent } from "./customer/customer-page/customer-page.component";
import { CustomerModule } from "./customer/customer.module";
import { AlertModule } from "../shared/alert/alert.module";
import { UserPageShowComponent } from "./user-page-show/user-page-show.component";
import { UserPageModule } from "./user-page/user-page.module";

@NgModule({
  declarations: [
    DefaultPageComponent,
    NewUserComponent,
    CustomerPageComponent,
    UserPageShowComponent,
  ],
  imports: [
    HomeRouterModule,
    UserPageModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    CustomValidatorModule,
    CustomerModule,
    AlertModule,
  ],
  exports: [UserPageModule, HomeRouterModule],
})
export class HomeModule {}
