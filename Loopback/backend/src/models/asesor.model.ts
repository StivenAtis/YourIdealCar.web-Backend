import {Entity, model, property, belongsTo} from '@loopback/repository';
import {TipoDocumento} from './tipo-documento.model';
import {Solicitud} from './solicitud.model';
import {Vehiculo} from './vehiculo.model';

@model()
export class Asesor extends Entity {
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
  id_asesor: string;

  @property({
    type: 'string',
    required: true,
  })
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'number',
    required: true,
  })
  edad: number;

  @property({
    type: 'string',
    required: true,
  })
  genero: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  contrasenia: string;

  @property({
    type: 'boolean',
    required: true,
  })
  estado: boolean;

  @belongsTo(() => TipoDocumento)
  tipoDocumentoId: string;

  @belongsTo(() => Solicitud)
  solicitudId: string;

  @belongsTo(() => Vehiculo)
  vehiculoId: string;

  constructor(data?: Partial<Asesor>) {
    super(data);
  }
}

export interface AsesorRelations {
  // describe navigational properties here
}

export type AsesorWithRelations = Asesor & AsesorRelations;
