import {Entity, hasMany, model, property} from '@loopback/repository';
import {User} from './user.model';

@model({
  settings: {
    postgresql: {
      table: 'customers',
    },
  },
})
export class Customer extends Entity {
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
      dataType: 'varchar',
    },
  })
  name: string;

  @property({
    type: 'string',
    postgresql: {
      type: 'varchar',
    },
  })
  website?: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @hasMany(() => User)
  users: User[];

  constructor(data?: Partial<Customer>) {
    super(data);
  }
}

export interface CustomerRelations {
  // describe navigational properties here
}

export type CustomerWithRelations = Customer & CustomerRelations;
