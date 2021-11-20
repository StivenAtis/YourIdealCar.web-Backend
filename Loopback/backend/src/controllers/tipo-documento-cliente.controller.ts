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
  Cliente,
} from '../models';
import {TipoDocumentoRepository} from '../repositories';

export class TipoDocumentoClienteController {
  constructor(
    @repository(TipoDocumentoRepository) protected tipoDocumentoRepository: TipoDocumentoRepository,
  ) { }

  @get('/tipo-documentos/{id}/clientes', {
    responses: {
      '200': {
        description: 'Array of TipoDocumento has many Cliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Cliente>,
  ): Promise<Cliente[]> {
    return this.tipoDocumentoRepository.clientes(id).find(filter);
  }

  @post('/tipo-documentos/{id}/clientes', {
    responses: {
      '200': {
        description: 'TipoDocumento model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof TipoDocumento.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewClienteInTipoDocumento',
            exclude: ['id'],
            optional: ['tipoDocumentoId']
          }),
        },
      },
    }) cliente: Omit<Cliente, 'id'>,
  ): Promise<Cliente> {
    return this.tipoDocumentoRepository.clientes(id).create(cliente);
  }

  @patch('/tipo-documentos/{id}/clientes', {
    responses: {
      '200': {
        description: 'TipoDocumento.Cliente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Partial<Cliente>,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.tipoDocumentoRepository.clientes(id).patch(cliente, where);
  }

  @del('/tipo-documentos/{id}/clientes', {
    responses: {
      '200': {
        description: 'TipoDocumento.Cliente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.tipoDocumentoRepository.clientes(id).delete(where);
  }
}
