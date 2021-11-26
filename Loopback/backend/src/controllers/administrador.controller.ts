import {authenticate} from '@loopback/authentication';
import { service } from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import {Administrador} from '../models';
import { Credenciales } from '../models';
import { keys } from '../config/keys';
import {AdministradorRepository} from '../repositories';
import { AutenticacionService } from '../services';
const fetch = require('node-fetch');

//--------------------------------------------------------------------------------------------------------------------

export class AdministradorController {
  constructor(
    @repository(AdministradorRepository)
    public administradorRepository : AdministradorRepository,
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService
  ) {}

  //--------------------------------------------------------------------------------------------------------------------

  @post("/autenticarAdministrador",{
    responses:{
      "200":{
        description: "Autenticar Administrador"
      }
    }
  })
  async autenticarAdministrador(
    @requestBody()credenciales:Credenciales
  ){
    let administrador = await this.servicioAutenticacion.IdentificarAdministrador(credenciales.usuario,credenciales.contrasenia)
    if (administrador) {
      let token = this.servicioAutenticacion.GenerarJWTAdmin(administrador);
      return {
        datos:{
          nombre: administrador.nombres + " " + administrador.apellidos,
          correo: administrador.email,
          id: administrador.id_administrador,
          rol: "Administrador"
        },
        tk: token
      }
    }
    else {
      throw new HttpErrors[401]("Los datos ingresados no son validos");
    }
  }

  //--------------------------------------------------------------------------------------------------------------------

  @authenticate("administrador")
  @post('/administradors')
  @response(200, {
    description: 'Administrador model instance',
    content: {'application/json': {schema: getModelSchemaRef(Administrador)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Administrador, {
            title: 'NewAdministrador',
            exclude: ['id'],
          }),
        },
      },
    })
    administrador: Omit<Administrador, 'id'>,
  ): Promise<Administrador> {
    //Creación de contraseña aleatoria:
    let password = this.servicioAutenticacion.GenerarPassword();
    //Cifrado de la contraseña:
    let passwordCifrado = this.servicioAutenticacion.CifrarPassword(password);
    administrador.contrasenia = passwordCifrado;
    let manager = this.administradorRepository.create(administrador);
    //Envio de notificación al correro electronico:
    let correo=administrador.email;
    let asunto=`Welcome ${administrador.nombres}`;
    let mensaje=`Bienvenid@ ${`${administrador.nombres} ${administrador.apellidos}, te damos la bienvenida a YourIdealCar.web`}`;
    //fetch("http://127.0.0.1:5000/email?email=" +email+"&subject="+subject+"&message="+message).then((data:any)=>{
      //console.log(data);
    //});
    fetch(`${keys.urlSrvNotificacion}/email?email=${correo}&subject=${asunto}&message=${mensaje}`).then((data:any)=>{
      console.log(data);
    });
    return manager;
  }

  //--------------------------------------------------------------------------------------------------------------------

  @get('/administradors/count')
  @response(200, {
    description: 'Administrador model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Administrador) where?: Where<Administrador>,
  ): Promise<Count> {
    return this.administradorRepository.count(where);
  }

  @get('/administradors')
  @response(200, {
    description: 'Array of Administrador model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Administrador, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Administrador) filter?: Filter<Administrador>,
  ): Promise<Administrador[]> {
    return this.administradorRepository.find(filter);
  }

  @patch('/administradors')
  @response(200, {
    description: 'Administrador PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Administrador, {partial: true}),
        },
      },
    })
    administrador: Administrador,
    @param.where(Administrador) where?: Where<Administrador>,
  ): Promise<Count> {
    return this.administradorRepository.updateAll(administrador, where);
  }

  @get('/administradors/{id}')
  @response(200, {
    description: 'Administrador model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Administrador, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Administrador, {exclude: 'where'}) filter?: FilterExcludingWhere<Administrador>
  ): Promise<Administrador> {
    return this.administradorRepository.findById(id, filter);
  }

  @patch('/administradors/{id}')
  @response(204, {
    description: 'Administrador PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Administrador, {partial: true}),
        },
      },
    })
    administrador: Administrador,
  ): Promise<void> {
    await this.administradorRepository.updateById(id, administrador);
  }

  @put('/administradors/{id}')
  @response(204, {
    description: 'Administrador PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() administrador: Administrador,
  ): Promise<void> {
    await this.administradorRepository.replaceById(id, administrador);
  }

  @del('/administradors/{id}')
  @response(204, {
    description: 'Administrador DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.administradorRepository.deleteById(id);
  }
}
