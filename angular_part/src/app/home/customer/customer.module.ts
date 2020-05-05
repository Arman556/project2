import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomValidatorModule } from 'src/app/shared/custom-validator/custom-validator.module';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { AlertModule } from 'src/app/shared/alert/alert.module';
import { CustomerLinkedUsersComponent } from './customer-linked-users/customer-linked-users.component';
import { UserPageComponent } from '../user-page/user-page.component';
import { HomeModule } from '../home.module';
import { UserPageModule } from '../user-page/user-page.module';

@NgModule({
    declarations: [AddCustomerComponent, CustomerLinkedUsersComponent],
    imports: [BrowserModule, CommonModule, FormsModule, CustomValidatorModule, AlertModule, UserPageModule],
    exports: [AddCustomerComponent, CustomerLinkedUsersComponent]
})
export class CustomerModule { }
