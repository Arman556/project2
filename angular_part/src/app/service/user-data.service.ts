import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  UserDataFormat,
  EmpRoleFormat,
  CustomerFormat,
  SaveDataFormat,
} from "./interfaces";
import { map, delay } from "rxjs/operators";
import { Subject } from "rxjs";
import { UserApiEndPoint } from "../shared/api-endpoints/user.api.service";


@Injectable({ providedIn: "root" })
export class DataService {
  constructor(
    private httpClient: HttpClient,
    private userApi: UserApiEndPoint
  ) {}
  userLoadedEmiiter = new Subject<boolean>();

  getUsers() {
    return this.httpClient.get<UserDataFormat[]>(this.userApi.getEndPoint).pipe(
      map((response) => {
        const users: UserDataFormat[] = [];
        response.forEach((user: any) => {
          users.push({
            id: user.id,
            firstName: user.firstName,
            middleName: user.middleName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            empRoleId: user.empRoleId,
            empRoleName: user.empRole.roleName,
            customerId: user.customerId,
            customerName: user.customer.name,
            address: user.address
          });
        });
        return users;
      })
    );
  }
  updateUser(user: SaveDataFormat, id: number) {
    return this.httpClient.patch(this.userApi.patchEndPoint + `${id}`, user);
  }

  saveUser(user: SaveDataFormat) {
    return this.httpClient.post(this.userApi.postEndPoint, user);
  }
  deleteUser(id: number) {
    return this.httpClient.delete(this.userApi.deleteEndPoint + `${id}`);
  }
}
