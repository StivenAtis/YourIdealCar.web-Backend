import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Vehiculo,
  Ciudad,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoCiudadController {
  constructor(
    @repository(VehiculoRepository)
    public vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/ciudad', {
    responses: {
      '200': {
        description: 'Ciudad belonging to Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ciudad)},
          },
        },
      },
    },
  })
  async getCiudad(
    @param.path.string('id') id: typeof Vehiculo.prototype.id,
  ): Promise<Ciudad> {
    return this.vehiculoRepository.ciudad(id);
  }
}
