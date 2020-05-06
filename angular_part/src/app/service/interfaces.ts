export interface UserDataFormat {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  empRoleId: number;
  empRoleName: string;
  address: string;
  customerId: number;
  customerName: string;
}

export interface SaveDataFormat {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  empRoleId: number;
  address: string;
  customerId: number;
}

export interface EmpRoleFormat {
  id: number;
  roleName: string;
}

export interface CustomerFormat {
  id: number;
  name: string;
  website: string;
  description: string;
}
