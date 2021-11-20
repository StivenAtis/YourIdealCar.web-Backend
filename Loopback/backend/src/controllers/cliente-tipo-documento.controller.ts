import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Cliente,
  TipoDocumento,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteTipoDocumentoController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/tipo-documento', {
    responses: {
      '200': {
        description: 'TipoDocumento belonging to Cliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TipoDocumento)},
          },
        },
      },
    },
  })
  async getTipoDocumento(
    @param.path.string('id') id: typeof Cliente.prototype.id,
  ): Promise<TipoDocumento> {
    return this.clienteRepository.tipoDocumento(id);
  }
}
