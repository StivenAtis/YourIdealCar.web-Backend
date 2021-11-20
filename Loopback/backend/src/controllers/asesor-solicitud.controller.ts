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
  Solicitud,
} from '../models';
import {AsesorRepository} from '../repositories';

export class AsesorSolicitudController {
  constructor(
    @repository(AsesorRepository)
    public asesorRepository: AsesorRepository,
  ) { }

  @get('/asesors/{id}/solicitud', {
    responses: {
      '200': {
        description: 'Solicitud belonging to Asesor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async getSolicitud(
    @param.path.string('id') id: typeof Asesor.prototype.id,
  ): Promise<Solicitud> {
    return this.asesorRepository.solicitud(id);
  }
}
