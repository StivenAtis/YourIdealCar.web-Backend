import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Administrador, AdministradorRelations, TipoDocumento} from '../models';
import {TipoDocumentoRepository} from './tipo-documento.repository';

export class AdministradorRepository extends DefaultCrudRepository<
  Administrador,
  typeof Administrador.prototype.id,
  AdministradorRelations
> {

  public readonly tipoDocumento: BelongsToAccessor<TipoDocumento, typeof Administrador.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('TipoDocumentoRepository') protected tipoDocumentoRepositoryGetter: Getter<TipoDocumentoRepository>,
  ) {
    super(Administrador, dataSource);
    this.tipoDocumento = this.createBelongsToAccessorFor('tipoDocumento', tipoDocumentoRepositoryGetter,);
    this.registerInclusionResolver('tipoDocumento', this.tipoDocumento.inclusionResolver);
  }
}
