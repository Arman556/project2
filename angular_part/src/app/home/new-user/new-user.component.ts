import { Component, OnInit, ViewChild, NgModule } from "@angular/core";
import { NgForm, NgModel } from "@angular/forms";
import {
  EmpRoleFormat,
  CustomerFormat,
  UserDataFormat,
  SaveDataFormat,
} from "src/app/service/interfaces";
import { DataService } from "../../service/user-data.service";
import { HttpErrorResponse } from "@angular/common/http";
import { CustomerDataService } from "src/app/service/customer-data.service";
import { EmpRoleDataService } from 'src/app/service/emp-role-data.service';

@Component({
  selector: "app-new-user",
  templateUrl: "./new-user.component.html",
  styleUrls: ["./new-user.component.css"],
})
export class NewUserComponent implements OnInit {
  @ViewChild("f") newUserForm: NgForm;
  result: string;
  roles: EmpRoleFormat[];
  customers: CustomerFormat[];
  defaultRole: number;
  defaultCustomer: number;
  constructor(
    private userDataService: DataService,
    private customerDataService: CustomerDataService,
    private empRoleDataService: EmpRoleDataService
  ) {}

  ngOnInit(): void {
    this.empRoleDataService.getEmpRoles().subscribe((res: EmpRoleFormat[]) => {
      this.roles = res;
      this.defaultRole = res[0].id;
    });
    this.customerDataService.getCustomers().subscribe((res: CustomerFormat[]) => {
      this.customers = res;
      this.defaultCustomer = res[0].id;
    });
  }
  onSubmit() {
    const newUserSave: SaveDataFormat = this.newUserForm.value;
    newUserSave.empRoleId = +newUserSave.empRoleId;
    newUserSave.customerId = +newUserSave.customerId;
    if (!newUserSave.middleName) {
      newUserSave.middleName = "";
    }
    this.userDataService.saveUser(newUserSave).subscribe(
      (res) => {
        this.result = "Successfully Created New User";
        this.newUserForm.reset();
      },
      (err: HttpErrorResponse) => {
        this.result = err.error.error.message;
      }
    );
  }
  onHandleAlert() {
    this.result = null;
  }
}
