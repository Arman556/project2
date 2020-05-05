import { Component, OnInit } from "@angular/core";
import { CustomerDataService } from "src/app/service/customer-data.service";
import { CustomerFormat } from "src/app/service/interfaces";
import { HttpErrorResponse } from "@angular/common/http";
const cloneDeep = require("lodash.clonedeep");

@Component({
  selector: "app-customer-page",
  templateUrl: "./customer-page.component.html",
  styleUrls: ["./customer-page.component.css"],
})
export class CustomerPageComponent implements OnInit {
  result = null;
  customers: CustomerFormat[];
  editButtonClicked: boolean[] = [];
  cloneCustomers: CustomerFormat[];
  customerFormBoolean = false;
  showUsersBox = false;
  customerId: number;

  constructor(private customerDataService: CustomerDataService) {}

  ngOnInit(): void {
    this.initCustomers();
  }
  initCustomers() {
    this.customerDataService.getCustomers().subscribe(
      (customers: CustomerFormat[]) => {
        this.customers = customers;
        this.customers.forEach((customer) =>
          this.editButtonClicked.push(false)
        );
        this.cloneCustomers = cloneDeep(this.customers);
      },
      (err: HttpErrorResponse) => {
        this.result = "Error at backend";
      }
    );
  }
  onEdit(rowIndex: number) {
    this.editButtonClicked[rowIndex] = true;
  }
  onSave(id: number, rowIndex: number) {
    this.customerDataService
      .patchCustomer(this.customers[rowIndex], id)
      .subscribe(
        (response) => {
          this.result = "Data Saved";
          this.editButtonClicked[rowIndex] = false;
        },
        (err: HttpErrorResponse) => {
          this.result = err.error.error.message;
        }
      );
  }
  onDelete(id: number, rowIndex: number) {
    this.customerDataService.deleteCustomer(id).subscribe(
      (response) => {
        this.customers.splice(rowIndex, 1);
        this.cloneCustomers.splice(rowIndex, 1);
        this.result = "Customer Deleted";
      },
      (err: HttpErrorResponse) => {
        this.customers[rowIndex] = this.cloneCustomers[rowIndex];
        this.result = err.error.error.message;
      }
    );
  }
  onCancel(rowIndex: number) {
    this.customers[rowIndex] = this.cloneCustomers[rowIndex];
    this.editButtonClicked[rowIndex] = false;
  }
  onHandleAlert() {
    this.result = "";
  }
  onOpenCustomerForm() {
    this.customerFormBoolean = true;
  }
  onCloseCustomerForm() {
    this.customerFormBoolean = false;
  }
  refreshCustomers() {
    this.initCustomers();
  }
  onCloseUsersBox() {
    this.showUsersBox = false;
  }
  onShowUsersBox(customerId: number) {
    this.customerId = customerId;
    this.showUsersBox = true;
  }
}
