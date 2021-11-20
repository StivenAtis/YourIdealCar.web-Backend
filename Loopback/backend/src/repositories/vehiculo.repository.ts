import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations,Solicitud, TipoVehiculo, Departamento, Ciudad} from '../models';
import {SolicitudRepository} from './solicitud.repository';
import {TipoVehiculoRepository} from './tipo-vehiculo.repository';
import {DepartamentoRepository} from './departamento.repository';
import {CiudadRepository} from './ciudad.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.id,
  VehiculoRelations
> {

  public readonly solicitud: BelongsToAccessor<Solicitud, typeof Vehiculo.prototype.id>;

  public readonly tipoVehiculo: BelongsToAccessor<TipoVehiculo, typeof Vehiculo.prototype.id>;

  public readonly departamento: BelongsToAccessor<Departamento, typeof Vehiculo.prototype.id>;

  public readonly ciudad: BelongsToAccessor<Ciudad, typeof Vehiculo.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('TipoVehiculoRepository') protected tipoVehiculoRepositoryGetter: Getter<TipoVehiculoRepository>, @repository.getter('DepartamentoRepository') protected departamentoRepositoryGetter: Getter<DepartamentoRepository>, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.ciudad = this.createBelongsToAccessorFor('ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
    this.departamento = this.createBelongsToAccessorFor('departamento', departamentoRepositoryGetter,);
    this.registerInclusionResolver('departamento', this.departamento.inclusionResolver);
    this.tipoVehiculo = this.createBelongsToAccessorFor('tipoVehiculo', tipoVehiculoRepositoryGetter,);
    this.registerInclusionResolver('tipoVehiculo', this.tipoVehiculo.inclusionResolver);
    this.solicitud = this.createBelongsToAccessorFor('solicitud', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitud', this.solicitud.inclusionResolver);
  }
}
