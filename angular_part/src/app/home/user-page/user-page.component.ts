import { Component, OnInit, ViewChild, OnDestroy, Input } from "@angular/core";
import { DataService } from "../../service/user-data.service";
import {
  UserDataFormat,
  EmpRoleFormat,
  CustomerFormat,
  SaveDataFormat,
} from "src/app/service/interfaces";
import { RowOperationsService } from "./service/row-operations.service";
import { HttpErrorResponse } from "@angular/common/http";
import { CustomerDataService } from "src/app/service/customer-data.service";
import { EmpRoleDataService } from "src/app/service/emp-role-data.service";
import { Observable } from "rxjs";
const cloneDeep = require("lodash.clonedeep");

@Component({
  selector: "app-user-page",
  templateUrl: "./user-page.component.html",
  styleUrls: ["./user-page.component.css"],
  providers: [RowOperationsService],
})
export class UserPageComponent implements OnInit, OnDestroy {
  @Input() dataGetLink: Observable<UserDataFormat[]>;
  result: string;
  users: UserDataFormat[];
  cloneUsers: UserDataFormat[];
  editButtonClicked: boolean[] = [];
  saveButtonBlocked: boolean[] = [];
  roles: EmpRoleFormat[];
  customers: CustomerFormat[];
  constructor(
    private userDataService: DataService,
    private rowOperations: RowOperationsService,
    private customerDataService: CustomerDataService,
    private empRoleDataService: EmpRoleDataService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this.dataGetLink.subscribe(
      (users: UserDataFormat[]) => {
        this.users = users;
        this.cloneUsers = cloneDeep(this.users);
        this.initEditButtons(this.users.length);
      },
      (err) => {
        this.result = "Error at Backend";
      }
    );
    this.empRoleDataService.getEmpRoles().subscribe(
      (res: EmpRoleFormat[]) => {
        this.roles = res;
      },
      (err) => {
        this.result = "Error at Backend";
      }
    );
    this.customerDataService.getCustomers().subscribe(
      (res: CustomerFormat[]) => {
        this.customers = res;
      },
      (err) => {
        this.result = "Error at Backend";
      }
    );
  }
  initEditButtons(numberOfUsers: number) {
    for (let i = 0; i < numberOfUsers; i++) {
      this.editButtonClicked.push(false);
      this.saveButtonBlocked.push(false);
    }
  }
  onEdit(rowIndex) {
    this.editButtonClicked[rowIndex] = true;
    this.saveButtonBlocked[rowIndex] = true;
  }

  onDelete(id: number, rowIndex: number) {
    this.userDataService.deleteUser(id).subscribe(
      (response) => {
        this.users.splice(rowIndex, 1);
        this.editButtonClicked.splice(rowIndex, 1);
        this.saveButtonBlocked.splice(rowIndex, 1);
        this.result = "User Deleted Suceesfully";
      },
      (err: HttpErrorResponse) => {
        this.result = "Error" + " " + err.message;
      }
    );
  }

  onCancel(rowIndex) {
    this.saveButtonBlocked[rowIndex] = false;
    this.users[rowIndex] = cloneDeep(this.cloneUsers[rowIndex]);
    this.editButtonClicked[rowIndex] = false;
  }
  onSave(rowIndex) {
    const user = this.users[rowIndex];
    const convertedUser: SaveDataFormat = this.rowOperations.convertUser(user);
    this.userDataService.updateUser(convertedUser, convertedUser.id).subscribe(
      (res) => {
        this.saveButtonBlocked[rowIndex] = false;
        this.editButtonClicked[rowIndex] = false;
        this.cloneUsers[rowIndex] = this.users[rowIndex];
        this.result = "Data Upadated!";
      },
      (err: HttpErrorResponse) => {
        this.users[rowIndex] = this.cloneUsers[rowIndex];
        this.result = "Error Occured: " + err.error.error.message;
      }
    );
  }
  onHandleAlert() {
    this.result = null;
  }
  ngOnDestroy() {
    this.userDataService.userLoadedEmiiter.next(false);
  }
}
