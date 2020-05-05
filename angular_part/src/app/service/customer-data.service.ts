import { Injectable } from "@angular/core";
import { CustomerApiEndPoint } from "../shared/api-endpoints/customer.api.service";
import { CustomerFormat, UserDataFormat } from "./interfaces";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class CustomerDataService {
  constructor(
    private customerApi: CustomerApiEndPoint,
    private httpClient: HttpClient
  ) {}

  getCustomers(): Observable<CustomerFormat[]> {
    return this.httpClient.get<CustomerFormat[]>(this.customerApi.getEndPoint);
  }
  postCustomer(customer: CustomerFormat) {
    return this.httpClient.post(this.customerApi.postEndPoint, customer);
  }
  patchCustomer(customer: CustomerFormat, id: number) {
    return this.httpClient.patch(
      this.customerApi.patchEndPoint + `${id}`,
      customer
    );
  }
  deleteCustomer(id: number) {
    return this.httpClient.delete(this.customerApi.deleteEndPoint + `${id}`);
  }
  getUsersRelatedWithCustomer(id: number) {
    this.customerApi.usersRelatedWithCustomerEndpoint[2] = `${id}`;

    return this.httpClient.get<UserDataFormat[]>(
      this.customerApi.usersRelatedWithCustomerEndpoint(id)
    );
  }
}
