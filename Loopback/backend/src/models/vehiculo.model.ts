import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Solicitud} from './solicitud.model';
import {TipoVehiculo} from './tipo-vehiculo.model';
import {Departamento} from './departamento.model';
import {Ciudad} from './ciudad.model';

@model()
export class Vehiculo extends Entity {
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
  id_vehiculo: string;

  @property({
    type: 'string',
    required: true,
  })
  marca: string;

  @property({
    type: 'string',
    required: true,
  })
  referencia: string;

  @property({
    type: 'number',
    required: true,
  })
  modelo: number;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'boolean',
    required: true,
  })
  estado: boolean;

  @belongsTo(() => Solicitud)
  solicitudId: string;

  @belongsTo(() => TipoVehiculo)
  tipoVehiculoId: string;

  @belongsTo(() => Departamento)
  departamentoId: string;

  @belongsTo(() => Ciudad)
  ciudadId: string;

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
