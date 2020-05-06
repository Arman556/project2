import { Injectable } from "@angular/core";
import { ApiEndPoints } from "../interfaces/api-end-point.interface";
import { BaseUrl } from "./base-url.api";

@Injectable({ providedIn: "root" })
export class CustomerApiEndPoint extends BaseUrl implements ApiEndPoints {
  getEndPoint =
    `${this.baseUrl}` +
    "customers?filter=%7B%0A%20%0A%20%20%22fields%22%3A%20%7B%0A" +
    "%20%20%20%20%22id%22%3A%20true%2C%0A%20%20%20%20%22name%22%3A%20true%2C%0A%20%20%20%20%22webs" +
    "ite%22%3A%20true%2C%0A%20%20%20%20%22description%22%3A%20true%0A%20%20%7D%0A%20%0A%7D";

  postEndPoint = `${this.baseUrl}customers/`;
  deleteEndPoint = `${this.baseUrl}customers/`;
  patchEndPoint = `${this.baseUrl}customers/`;

  usersRelatedWithCustomerEndpoint = (id: number) =>  {
    return `${this.baseUrl}` +
    `customers/${id}/users?` +
    "filter=%7B%0A%20%20%22additionalProp1%22%3A%20%7B%7D%0A%7D";
  } 
}
