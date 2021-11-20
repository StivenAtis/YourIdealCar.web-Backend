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
  TipoDocumento,
  Administrador,
} from '../models';
import {TipoDocumentoRepository} from '../repositories';

export class TipoDocumentoAdministradorController {
  constructor(
    @repository(TipoDocumentoRepository) protected tipoDocumentoRepository: TipoDocumentoRepository,
  ) { }

  @get('/tipo-documentos/{id}/administradors', {
    responses: {
      '200': {
        description: 'Array of TipoDocumento has many Administrador',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Administrador)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Administrador>,
  ): Promise<Administrador[]> {
    return this.tipoDocumentoRepository.administradors(id).find(filter);
  }

  @post('/tipo-documentos/{id}/administradors', {
    responses: {
      '200': {
        description: 'TipoDocumento model instance',
        content: {'application/json': {schema: getModelSchemaRef(Administrador)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof TipoDocumento.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Administrador, {
            title: 'NewAdministradorInTipoDocumento',
            exclude: ['id'],
            optional: ['tipoDocumentoId']
          }),
        },
      },
    }) administrador: Omit<Administrador, 'id'>,
  ): Promise<Administrador> {
    return this.tipoDocumentoRepository.administradors(id).create(administrador);
  }

  @patch('/tipo-documentos/{id}/administradors', {
    responses: {
      '200': {
        description: 'TipoDocumento.Administrador PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Administrador, {partial: true}),
        },
      },
    })
    administrador: Partial<Administrador>,
    @param.query.object('where', getWhereSchemaFor(Administrador)) where?: Where<Administrador>,
  ): Promise<Count> {
    return this.tipoDocumentoRepository.administradors(id).patch(administrador, where);
  }

  @del('/tipo-documentos/{id}/administradors', {
    responses: {
      '200': {
        description: 'TipoDocumento.Administrador DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Administrador)) where?: Where<Administrador>,
  ): Promise<Count> {
    return this.tipoDocumentoRepository.administradors(id).delete(where);
  }
}
