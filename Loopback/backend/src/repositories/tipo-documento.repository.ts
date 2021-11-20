import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {TipoDocumento, TipoDocumentoRelations, Administrador, Asesor, Cliente} from '../models';
import {AdministradorRepository} from './administrador.repository';
import {AsesorRepository} from './asesor.repository';
import {ClienteRepository} from './cliente.repository';

export class TipoDocumentoRepository extends DefaultCrudRepository<
  TipoDocumento,
  typeof TipoDocumento.prototype.id,
  TipoDocumentoRelations
> {

  public readonly administradors: HasManyRepositoryFactory<Administrador, typeof TipoDocumento.prototype.id>;

  public readonly asesors: HasManyRepositoryFactory<Asesor, typeof TipoDocumento.prototype.id>;

  public readonly clientes: HasManyRepositoryFactory<Cliente, typeof TipoDocumento.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(TipoDocumento, dataSource);
    this.clientes = this.createHasManyRepositoryFactoryFor('clientes', clienteRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
    this.asesors = this.createHasManyRepositoryFactoryFor('asesors', asesorRepositoryGetter,);
    this.registerInclusionResolver('asesors', this.asesors.inclusionResolver);
    this.administradors = this.createHasManyRepositoryFactoryFor('administradors', administradorRepositoryGetter,);
    this.registerInclusionResolver('administradors', this.administradors.inclusionResolver);
  }
}
