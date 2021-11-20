import {Entity, model, property, belongsTo, hasOne, hasMany} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';
import {Cliente} from './cliente.model';
import {Asesor} from './asesor.model';

@model()
export class Solicitud extends Entity {
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
  id_solicitud: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad_vehiculos: number;

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

  @hasOne(() => Vehiculo)
  vehiculo: Vehiculo;

  @hasMany(() => Cliente)
  clientes: Cliente[];

  @hasMany(() => Asesor)
  asesors: Asesor[];

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
