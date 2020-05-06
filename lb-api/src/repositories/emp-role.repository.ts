import {DefaultCrudRepository} from '@loopback/repository';
import {EmpRole, EmpRoleRelations} from '../models';
import {PostgresConnectorDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class EmpRoleRepository extends DefaultCrudRepository<
  EmpRole,
  typeof EmpRole.prototype.id,
  EmpRoleRelations
> {
  constructor(
    @inject('datasources.postgresConnector') dataSource: PostgresConnectorDataSource,
  ) {
    super(EmpRole, dataSource);
  }
}
