import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Asesor, AsesorRelations, TipoDocumento, Solicitud, Vehiculo} from '../models';
import {TipoDocumentoRepository} from './tipo-documento.repository';
import {SolicitudRepository} from './solicitud.repository';
import {VehiculoRepository} from './vehiculo.repository';

export class AsesorRepository extends DefaultCrudRepository<
  Asesor,
  typeof Asesor.prototype.id,
  AsesorRelations
> {

  public readonly tipoDocumento: BelongsToAccessor<TipoDocumento, typeof Asesor.prototype.id>;

  public readonly solicitud: BelongsToAccessor<Solicitud, typeof Asesor.prototype.id>;

  public readonly vehiculo: BelongsToAccessor<Vehiculo, typeof Asesor.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('TipoDocumentoRepository') protected tipoDocumentoRepositoryGetter: Getter<TipoDocumentoRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Asesor, dataSource);
    this.vehiculo = this.createBelongsToAccessorFor('vehiculo', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculo', this.vehiculo.inclusionResolver);
    this.solicitud = this.createBelongsToAccessorFor('solicitud', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitud', this.solicitud.inclusionResolver);
    this.tipoDocumento = this.createBelongsToAccessorFor('tipoDocumento', tipoDocumentoRepositoryGetter,);
    this.registerInclusionResolver('tipoDocumento', this.tipoDocumento.inclusionResolver);
  }
}
