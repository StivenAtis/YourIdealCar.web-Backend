import {Entity, model, property, hasMany} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';

@model()
export class TipoVehiculo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  id_tipo_vehiculo: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @property({
    type: 'boolean',
    required: true,
  })
  estado: boolean;

  @hasMany(() => Vehiculo)
  vehiculos: Vehiculo[];

  constructor(data?: Partial<TipoVehiculo>) {
    super(data);
  }
}

export interface TipoVehiculoRelations {
  // describe navigational properties here
}

export type TipoVehiculoWithRelations = TipoVehiculo & TipoVehiculoRelations;
