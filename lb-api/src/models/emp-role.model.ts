import {Entity, hasMany, model, property} from '@loopback/repository';
import {User} from './user.model';

@model({
  settings: {
    postgresql: {
      table: 'emp_roles',
    },
  },
})
export class EmpRole extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    index: {
      unique: true,
    },
    postgresql: {
      columnName: 'role_name',
      dataType: 'varchar(20)',
    },
  })
  roleName: string;

  @hasMany(() => User)
  users: User[];

  constructor(data?: Partial<EmpRole>) {
    super(data);
  }
}

export interface EmpRoleRelations {
  // describe navigational properties here
}

export type EmpRoleWithRelations = EmpRole & EmpRoleRelations;
