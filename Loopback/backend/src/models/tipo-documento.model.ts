import {Entity, model, property, hasMany} from '@loopback/repository';
import {Administrador} from './administrador.model';
import {Asesor} from './asesor.model';
import {Cliente} from './cliente.model';

@model()
export class TipoDocumento extends Entity {
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
  nombre: string;

  @property({
    type: 'boolean',
    required: true,
  })
  estado: boolean;

  @hasMany(() => Administrador)
  administradors: Administrador[];

  @hasMany(() => Asesor)
  asesors: Asesor[];

  @hasMany(() => Cliente)
  clientes: Cliente[];

  constructor(data?: Partial<TipoDocumento>) {
    super(data);
  }
}

export interface TipoDocumentoRelations {
  // describe navigational properties here
}

export type TipoDocumentoWithRelations = TipoDocumento & TipoDocumentoRelations;
