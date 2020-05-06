import { Injectable } from "@angular/core";
import { ApiEndPoints } from '../interfaces/api-end-point.interface';
import { BaseUrl } from './base-url.api';


@Injectable({providedIn: 'root'})
export class EmpRoleApiEndPoint extends BaseUrl implements ApiEndPoints {
    getEndPoint = `${this.baseUrl}`+"emp-roles?filter=%7B%0A%20%0A%20%20%22fields%22%3A%20%7B%0A%20%20"+
  "%20%20%22id%22%3A%20true%2C%0A%20%20%20%20%22roleName%22%3A%20true%0A%20%20%7D%0A%20%0A%7D";

}
