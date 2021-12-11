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
import {Cliente} from '../models';
import { Credenciales } from '../models';
import { keys } from '../config/keys';
import {ClienteRepository} from '../repositories';
import { AutenticacionService } from '../services';
const fetch = require('node-fetch');

//--------------------------------------------------------------------------------------------------------------------

export class ClienteController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository : ClienteRepository,
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService
  ) {}

  //--------------------------------------------------------------------------------------------------------------------

  @post("/autenticarCliente",{
    responses:{
      "200":{
        description: "Autenticar Cliente"
      }
    }
  })
  async autenticarCliente(
    @requestBody()credenciales:Credenciales
  ){
    let cliente = await this.servicioAutenticacion.IdentificarCliente(credenciales.usuario,credenciales.contrasenia)
    if (cliente) {
      let token = this.servicioAutenticacion.GenerarJWTCliente(cliente);
      return {
        datos:{
          nombre: cliente.nombres + " " + cliente.apellidos,
          correo: cliente.email,
          id: cliente.id_cliente,
          rol: "Cliente"
        },
        tk: token
      }
    }
    else {
      throw new HttpErrors[401]("Los datos ingresados no son validos");
    }
  }

  //--------------------------------------------------------------------------------------------------------------------

  //@authenticate("cliente")
  @post('/clientes')
  @response(200, {
    description: 'Cliente model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewCliente',
            exclude: ['id'],
          }),
        },
      },
    })
    cliente: Omit<Cliente, 'id'>,
  ): Promise<Cliente> {
    //Creación de contraseña aleatoria:
    let password = this.servicioAutenticacion.GenerarPassword();
    //Cifrado de la contraseña:
    let passwordCifrado = this.servicioAutenticacion.CifrarPassword(password);
    cliente.contrasenia = passwordCifrado;
    let customer = this.clienteRepository.create(cliente);
    //Envio de notificación al correro electronico:
    let correo=cliente.email;
    let asunto=`Welcome ${cliente.nombres}`;
    let mensaje=`Bienvenid@ ${`${cliente.nombres} ${cliente.apellidos}, te damos la bienvenida a YourIdealCar.web`}. Debes usar los siguientes datos para ingresar</p>
    <p>Usuario: ${cliente.email}</p>
    <p>Contraseña: ${password}</p>`;
    fetch(`${keys.urlSrvNotificacion}/email?email=${correo}&subject=${asunto}&message=${mensaje}`).then((data:any)=>{
      console.log(data);
    });
    //fetch("http://127.0.0.1:5000/email?email=brayannStivenn02@gmail.com&subject=Correo de prueba&message=Hello!").then((data:any)=>{
      //console.log(data);
    //});
     return customer;
  }

  //--------------------------------------------------------------------------------------------------------------------

  @get('/clientes/count')
  @response(200, {
    description: 'Cliente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Cliente) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.clienteRepository.count(where);
  }

  @get('/clientes')
  @response(200, {
    description: 'Array of Cliente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cliente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Cliente) filter?: Filter<Cliente>,
  ): Promise<Cliente[]> {
    return this.clienteRepository.find(filter);
  }

  @patch('/clientes')
  @response(200, {
    description: 'Cliente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Cliente,
    @param.where(Cliente) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.clienteRepository.updateAll(cliente, where);
  }

  @get('/clientes/{id}')
  @response(200, {
    description: 'Cliente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cliente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Cliente, {exclude: 'where'}) filter?: FilterExcludingWhere<Cliente>
  ): Promise<Cliente> {
    return this.clienteRepository.findById(id, filter);
  }

  @patch('/clientes/{id}')
  @response(204, {
    description: 'Cliente PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Cliente,
  ): Promise<void> {
    await this.clienteRepository.updateById(id, cliente);
  }

  @put('/clientes/{id}')
  @response(204, {
    description: 'Cliente PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cliente: Cliente,
  ): Promise<void> {
    await this.clienteRepository.replaceById(id, cliente);
  }

  @del('/clientes/{id}')
  @response(204, {
    description: 'Cliente DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.clienteRepository.deleteById(id);
  }
}
