import { DataService } from "src/app/service/user-data.service";
import { Injectable } from "@angular/core";
import { UserDataFormat, SaveDataFormat } from "src/app/service/interfaces";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class RowOperationsService {
  roleElement: HTMLSelectElement;
  customerElement: HTMLSelectElement;
  constructor(private userDataService: DataService) {}
  convertUser(user: UserDataFormat): SaveDataFormat {
    return {
      id: +user.id,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      empRoleId: +user.empRoleId,
      address: user.address,
      customerId: +user.customerId,
    };
  }

  deleteRowById(userId, rowIndex, users: UserDataFormat[]) {
    this.userDataService.deleteUser(userId).subscribe(
      (response) => {
        console.log(response);
        users.splice(rowIndex, 1);
      },
      (err: HttpErrorResponse) => {
        console.log("Cannot Delete");
      }
    );
  }
}
