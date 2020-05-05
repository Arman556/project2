import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  User,
  EmpRole,
} from '../models';
import {UserRepository} from '../repositories';

export class UserEmpRoleController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/emp-roles', {
    responses: {
      '200': {
        description: 'Array of User has many EmpRole',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EmpRole)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<EmpRole>,
  ): Promise<EmpRole[]> {
    return this.userRepository.empRoles(id).find(filter);
  }

  @post('/users/{id}/emp-roles', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(EmpRole)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EmpRole, {
            title: 'NewEmpRoleInUser',
            exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) empRole: Omit<EmpRole, 'id'>,
  ): Promise<EmpRole> {
    return this.userRepository.empRoles(id).create(empRole);
  }

  @patch('/users/{id}/emp-roles', {
    responses: {
      '200': {
        description: 'User.EmpRole PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EmpRole, {partial: true}),
        },
      },
    })
    empRole: Partial<EmpRole>,
    @param.query.object('where', getWhereSchemaFor(EmpRole)) where?: Where<EmpRole>,
  ): Promise<Count> {
    return this.userRepository.empRoles(id).patch(empRole, where);
  }

  @del('/users/{id}/emp-roles', {
    responses: {
      '200': {
        description: 'User.EmpRole DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(EmpRole)) where?: Where<EmpRole>,
  ): Promise<Count> {
    return this.userRepository.empRoles(id).delete(where);
  }
}
