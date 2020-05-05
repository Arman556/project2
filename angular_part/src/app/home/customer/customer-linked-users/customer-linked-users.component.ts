import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { CustomerDataService } from 'src/app/service/customer-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDataFormat } from 'src/app/service/interfaces';

@Component({
  selector: "app-customer-linked-users",
  templateUrl: "./customer-linked-users.component.html",
  styleUrls: ["./customer-linked-users.component.css"],
})
export class CustomerLinkedUsersComponent implements OnInit {
  result = "";
  dataProviderLink: Observable<UserDataFormat[]>;
  
  // tslint:disable-next-line: no-input-rename
  @Input("id") customerId: number;
  // tslint:disable-next-line: no-output-native
  @Output() close = new EventEmitter<void>();
  constructor(private customerDataService: CustomerDataService) {}

  ngOnInit(): void {
    this.initData();
  }
  initData() {
  this.dataProviderLink = this.customerDataService.getUsersRelatedWithCustomer(+this.customerId);
  }
  onClose() {
    this.close.emit();
  }
  onHandleAlert() {
    this.result = "";
  }
}
