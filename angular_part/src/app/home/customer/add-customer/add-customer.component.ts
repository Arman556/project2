import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerFormat } from 'src/app/service/interfaces';
import { CustomerDataService } from 'src/app/service/customer-data.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
})
export class AddCustomerComponent implements OnInit {
  @Output() cancelEventEmitter = new EventEmitter<void>();
  @Output() refreshEventEmitter = new EventEmitter<void>();
  @ViewChild("f") newCustomerForm: NgForm;
  result = '';
  constructor(private customerDataService: CustomerDataService) {}

  ngOnInit(): void {}
  onCancel() {
    this.cancelEventEmitter.emit();
  }
  onSubmit() {
    const newCustomer: CustomerFormat = this.newCustomerForm.value;
    this.customerDataService.postCustomer(newCustomer).
    subscribe(response => {
      this.result = "New Customer Created";
      this.refreshEventEmitter.emit();
      this.newCustomerForm.reset();
    }, (err: HttpErrorResponse) => {
      this.result = err.error.error.message;
    });

  }
  onHandleAlert() {
    this.result = '';
  }
}
