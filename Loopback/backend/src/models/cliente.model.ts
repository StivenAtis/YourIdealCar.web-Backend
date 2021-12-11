import {Entity, model, property, belongsTo} from '@loopback/repository';
import {TipoDocumento} from './tipo-documento.model';
import {Solicitud} from './solicitud.model';

@model()
export class Cliente extends Entity {
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
  id_cliente: string;

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

  /*@property({
    type: 'string',
    required: true,
  })
  imagen: string;*/

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

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
