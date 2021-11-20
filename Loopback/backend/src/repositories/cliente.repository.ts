import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Cliente, ClienteRelations, TipoDocumento, Solicitud} from '../models';
import {TipoDocumentoRepository} from './tipo-documento.repository';
import {SolicitudRepository} from './solicitud.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly tipoDocumento: BelongsToAccessor<TipoDocumento, typeof Cliente.prototype.id>;

  public readonly solicitud: BelongsToAccessor<Solicitud, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('TipoDocumentoRepository') protected tipoDocumentoRepositoryGetter: Getter<TipoDocumentoRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Cliente, dataSource);
    this.solicitud = this.createBelongsToAccessorFor('solicitud', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitud', this.solicitud.inclusionResolver);
    this.tipoDocumento = this.createBelongsToAccessorFor('tipoDocumento', tipoDocumentoRepositoryGetter,);
    this.registerInclusionResolver('tipoDocumento', this.tipoDocumento.inclusionResolver);
  }
}
