import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
} from '@loopback/repository';
import {Customer} from './customer.model';
import {EmpRole} from './emp-role.model';

@model({
  settings: {
    postgresql: {
      table: 'users',
    },
    hiddenProperties: ['createdAt', 'updatedAt'],
  },
})
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'first_name',
      dataType: 'varchar(30)',
    },
  })
  firstName: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'middle_name',
      dataType: 'varchar(30)',
    },
  })
  middleName?: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'last_name',
      dataType: 'varchar(30)',
    },
  })
  lastName: string;

  @property({
    type: 'string',
    required: true,
    index: {
      unique: true,
    },
    jsonSchema: {
      format: 'email',
      errorMessage: 'Invalid Email',
    },
    postgresql: {
      columnName: 'email',
      dataType: 'varchar(50)',
    },
  })
  email: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'phone_number',
      dataType: 'varchar(14)',
    },
  })
  phoneNumber: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @property({
    type: 'date',
    required: false,
    default: new Date(),
    postgresql: {
      columnName: 'created_at',
    },
  })
  createdAt: Date;

  @property({
    type: 'date',
    required: false,
    default: new Date(),
    postgresql: {
      columnName: 'updated_at',
    },
  })
  updatedAt: Date;

  @hasMany(() => Customer, {keyTo: 'id'})
  customers: Customer[];

  @hasMany(() => EmpRole, {keyTo: 'id'})
  empRoles: EmpRole[];

  @belongsTo(() => Customer)
  customerId: number;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
