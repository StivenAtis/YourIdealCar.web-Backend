import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Asesor,
  TipoDocumento,
} from '../models';
import {AsesorRepository} from '../repositories';

export class AsesorTipoDocumentoController {
  constructor(
    @repository(AsesorRepository)
    public asesorRepository: AsesorRepository,
  ) { }

  @get('/asesors/{id}/tipo-documento', {
    responses: {
      '200': {
        description: 'TipoDocumento belonging to Asesor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TipoDocumento)},
          },
        },
      },
    },
  })
  async getTipoDocumento(
    @param.path.string('id') id: typeof Asesor.prototype.id,
  ): Promise<TipoDocumento> {
    return this.asesorRepository.tipoDocumento(id);
  }
}
