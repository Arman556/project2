import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {EmpRole} from '../models';
import {EmpRoleRepository} from '../repositories';

export class EmpRoleController {
  constructor(
    @repository(EmpRoleRepository)
    public empRoleRepository : EmpRoleRepository,
  ) {}

  @post('/emp-roles', {
    responses: {
      '200': {
        description: 'EmpRole model instance',
        content: {'application/json': {schema: getModelSchemaRef(EmpRole)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EmpRole, {
            title: 'NewEmpRole',
            exclude: ['id'],
          }),
        },
      },
    })
    empRole: Omit<EmpRole, 'id'>,
  ): Promise<EmpRole> {
    return this.empRoleRepository.create(empRole);
  }

  @get('/emp-roles/count', {
    responses: {
      '200': {
        description: 'EmpRole model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(EmpRole) where?: Where<EmpRole>,
  ): Promise<Count> {
    return this.empRoleRepository.count(where);
  }

  @get('/emp-roles', {
    responses: {
      '200': {
        description: 'Array of EmpRole model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(EmpRole, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(EmpRole) filter?: Filter<EmpRole>,
  ): Promise<EmpRole[]> {
    return this.empRoleRepository.find(filter);
  }

  @patch('/emp-roles', {
    responses: {
      '200': {
        description: 'EmpRole PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EmpRole, {partial: true}),
        },
      },
    })
    empRole: EmpRole,
    @param.where(EmpRole) where?: Where<EmpRole>,
  ): Promise<Count> {
    return this.empRoleRepository.updateAll(empRole, where);
  }

  @get('/emp-roles/{id}', {
    responses: {
      '200': {
        description: 'EmpRole model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(EmpRole, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EmpRole, {exclude: 'where'}) filter?: FilterExcludingWhere<EmpRole>
  ): Promise<EmpRole> {
    return this.empRoleRepository.findById(id, filter);
  }

  @patch('/emp-roles/{id}', {
    responses: {
      '204': {
        description: 'EmpRole PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EmpRole, {partial: true}),
        },
      },
    })
    empRole: EmpRole,
  ): Promise<void> {
    await this.empRoleRepository.updateById(id, empRole);
  }

  @put('/emp-roles/{id}', {
    responses: {
      '204': {
        description: 'EmpRole PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() empRole: EmpRole,
  ): Promise<void> {
    await this.empRoleRepository.replaceById(id, empRole);
  }

  @del('/emp-roles/{id}', {
    responses: {
      '204': {
        description: 'EmpRole DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.empRoleRepository.deleteById(id);
  }
}
