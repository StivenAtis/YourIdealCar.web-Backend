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
  Asesor,
} from '../models';
import {TipoDocumentoRepository} from '../repositories';

export class TipoDocumentoAsesorController {
  constructor(
    @repository(TipoDocumentoRepository) protected tipoDocumentoRepository: TipoDocumentoRepository,
  ) { }

  @get('/tipo-documentos/{id}/asesors', {
    responses: {
      '200': {
        description: 'Array of TipoDocumento has many Asesor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Asesor)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Asesor>,
  ): Promise<Asesor[]> {
    return this.tipoDocumentoRepository.asesors(id).find(filter);
  }

  @post('/tipo-documentos/{id}/asesors', {
    responses: {
      '200': {
        description: 'TipoDocumento model instance',
        content: {'application/json': {schema: getModelSchemaRef(Asesor)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof TipoDocumento.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asesor, {
            title: 'NewAsesorInTipoDocumento',
            exclude: ['id'],
            optional: ['tipoDocumentoId']
          }),
        },
      },
    }) asesor: Omit<Asesor, 'id'>,
  ): Promise<Asesor> {
    return this.tipoDocumentoRepository.asesors(id).create(asesor);
  }

  @patch('/tipo-documentos/{id}/asesors', {
    responses: {
      '200': {
        description: 'TipoDocumento.Asesor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asesor, {partial: true}),
        },
      },
    })
    asesor: Partial<Asesor>,
    @param.query.object('where', getWhereSchemaFor(Asesor)) where?: Where<Asesor>,
  ): Promise<Count> {
    return this.tipoDocumentoRepository.asesors(id).patch(asesor, where);
  }

  @del('/tipo-documentos/{id}/asesors', {
    responses: {
      '200': {
        description: 'TipoDocumento.Asesor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Asesor)) where?: Where<Asesor>,
  ): Promise<Count> {
    return this.tipoDocumentoRepository.asesors(id).delete(where);
  }
}
