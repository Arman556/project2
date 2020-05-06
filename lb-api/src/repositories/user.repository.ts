import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {User, UserRelations, Customer, EmpRole} from '../models';
import {PostgresConnectorDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {CustomerRepository} from './customer.repository';
import {EmpRoleRepository} from './emp-role.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly customers: HasManyRepositoryFactory<Customer, typeof User.prototype.id>;

  public readonly empRoles: HasManyRepositoryFactory<EmpRole, typeof User.prototype.id>;

  public readonly customer: BelongsToAccessor<Customer, typeof User.prototype.id>;

  public readonly cust: BelongsToAccessor<Customer, typeof User.prototype.id>;

  constructor(
    @inject('datasources.postgresConnector') dataSource: PostgresConnectorDataSource, @repository.getter('CustomerRepository') protected customerRepositoryGetter: Getter<CustomerRepository>, @repository.getter('EmpRoleRepository') protected empRoleRepositoryGetter: Getter<EmpRoleRepository>,
  ) {
    super(User, dataSource);
    this.cust = this.createBelongsToAccessorFor('cust', customerRepositoryGetter,);
    this.registerInclusionResolver('cust', this.cust.inclusionResolver);
    this.customer = this.createBelongsToAccessorFor('customer', customerRepositoryGetter,);
    this.registerInclusionResolver('customer', this.customer.inclusionResolver);
    this.empRoles = this.createHasManyRepositoryFactoryFor('empRoles', empRoleRepositoryGetter,);
    this.registerInclusionResolver('empRoles', this.empRoles.inclusionResolver);
    this.customers = this.createHasManyRepositoryFactoryFor('customers', customerRepositoryGetter,);
    this.registerInclusionResolver('customers', this.customers.inclusionResolver);
  }
}
