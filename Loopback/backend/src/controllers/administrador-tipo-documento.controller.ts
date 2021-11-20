import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Administrador,
  TipoDocumento,
} from '../models';
import {AdministradorRepository} from '../repositories';

export class AdministradorTipoDocumentoController {
  constructor(
    @repository(AdministradorRepository)
    public administradorRepository: AdministradorRepository,
  ) { }

  @get('/administradors/{id}/tipo-documento', {
    responses: {
      '200': {
        description: 'TipoDocumento belonging to Administrador',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TipoDocumento)},
          },
        },
      },
    },
  })
  async getTipoDocumento(
    @param.path.string('id') id: typeof Administrador.prototype.id,
  ): Promise<TipoDocumento> {
    return this.administradorRepository.tipoDocumento(id);
  }
}
