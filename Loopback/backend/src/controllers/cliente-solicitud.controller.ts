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
  Solicitud,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteSolicitudController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/solicitud', {
    responses: {
      '200': {
        description: 'Solicitud belonging to Cliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async getSolicitud(
    @param.path.string('id') id: typeof Cliente.prototype.id,
  ): Promise<Solicitud> {
    return this.clienteRepository.solicitud(id);
  }
}
