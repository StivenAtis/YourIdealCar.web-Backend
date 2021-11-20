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
  Vehiculo,
} from '../models';
import {AsesorRepository} from '../repositories';

export class AsesorVehiculoController {
  constructor(
    @repository(AsesorRepository)
    public asesorRepository: AsesorRepository,
  ) { }

  @get('/asesors/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Vehiculo belonging to Asesor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async getVehiculo(
    @param.path.string('id') id: typeof Asesor.prototype.id,
  ): Promise<Vehiculo> {
    return this.asesorRepository.vehiculo(id);
  }
}
