import { Injectable } from "@angular/core";
import { EmpRoleApiEndPoint } from "../shared/api-endpoints/emp-role.api.service";
import { HttpClient } from "@angular/common/http";
import { EmpRoleFormat } from './interfaces';
import { Observable } from 'rxjs';

@Injectable({ providedIn: "root" })
export class EmpRoleDataService {
  constructor(
    private empRoleApi: EmpRoleApiEndPoint,
    private httpClient: HttpClient
  ) {}
  getEmpRoles(): Observable<EmpRoleFormat[]> {
    return this.httpClient.get<EmpRoleFormat[]>(this.empRoleApi.getEndPoint);
  }
}
