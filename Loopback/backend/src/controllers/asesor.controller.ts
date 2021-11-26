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
import { Asesor } from '../models';
import { Credenciales } from '../models';
import { keys } from '../config/keys';
import { AsesorRepository } from '../repositories';
import { AutenticacionService } from '../services';
const fetch = require('node-fetch');

//--------------------------------------------------------------------------------------------------------------------

export class AsesorController {
  constructor(
    @repository(AsesorRepository)
    public asesorRepository: AsesorRepository,
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService
  ) { }

  //--------------------------------------------------------------------------------------------------------------------

  @post("/autenticarAsesor",{
    responses:{
      "200":{
        description: "Autenticar Asesor"
      }
    }
  })
  async autenticarAsesor(
    @requestBody()credenciales:Credenciales
  ){
    let asesor = await this.servicioAutenticacion.IdentificarAsesor(credenciales.usuario,credenciales.contrasenia)
    if (asesor) {
      let token = this.servicioAutenticacion.GenerarJWT(asesor);
      return {
        datos:{
          nombre: asesor.nombres + " " + asesor.apellidos,
          correo: asesor.email,
          id: asesor.id_asesor,
          rol: "Asesor"
        },
        tk: token
      }
    }
    else {
      throw new HttpErrors[401]("Los datos ingresados no son validos");
    }
  }

  //--------------------------------------------------------------------------------------------------------------------

  @post('/asesors')
  @response(200, {
    description: 'Asesor model instance',
    content: { 'application/json': { schema: getModelSchemaRef(Asesor) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asesor, {
            title: 'NewAsesor',
            exclude: ['id'],
          }),
        },
      },
    })
    asesor: Omit<Asesor, 'id'>,
  ): Promise<Asesor> {
    //Creación de contraseña aleatoria:
    let password = this.servicioAutenticacion.GenerarPassword();
    //Cifrado de la contraseña:
    let passwordCifrado = this.servicioAutenticacion.CifrarPassword(password);
    asesor.contrasenia = passwordCifrado;
    let advisor = await this.asesorRepository.create(asesor);
    //Envio de notificación al correro electronico:
    let correo=asesor.email;
    let asunto=`Welcome ${asesor.nombres}`;
    let mensaje=`Bienvenid@ ${`${asesor.nombres} ${asesor.apellidos}, te damos la bienvenida a YourIdealCar.web`}`;
    fetch(`${keys.urlSrvNotificacion}/email?email=${correo}&subject=${asunto}&message=${mensaje}`).then((data:any)=>{
      console.log(data);
    });
    //fetch("http://127.0.0.1:5000/email?email=brayannStivenn02@gmail.com&subject=Correo de prueba&message=Hello!").then((data:any)=>{
      //console.log(data);
    //});
    return advisor;
  }

  //--------------------------------------------------------------------------------------------------------------------
  
  @get('/asesors/count')
  @response(200, {
    description: 'Asesor model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(Asesor) where?: Where<Asesor>,
  ): Promise<Count> {
    return this.asesorRepository.count(where);
  }

  @get('/asesors')
  @response(200, {
    description: 'Array of Asesor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Asesor, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(Asesor) filter?: Filter<Asesor>,
  ): Promise<Asesor[]> {
    return this.asesorRepository.find(filter);
  }

  @patch('/asesors')
  @response(200, {
    description: 'Asesor PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asesor, { partial: true }),
        },
      },
    })
    asesor: Asesor,
    @param.where(Asesor) where?: Where<Asesor>,
  ): Promise<Count> {
    return this.asesorRepository.updateAll(asesor, where);
  }

  @get('/asesors/{id}')
  @response(200, {
    description: 'Asesor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Asesor, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Asesor, { exclude: 'where' }) filter?: FilterExcludingWhere<Asesor>
  ): Promise<Asesor> {
    return this.asesorRepository.findById(id, filter);
  }

  @patch('/asesors/{id}')
  @response(204, {
    description: 'Asesor PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asesor, { partial: true }),
        },
      },
    })
    asesor: Asesor,
  ): Promise<void> {
    await this.asesorRepository.updateById(id, asesor);
  }

  @put('/asesors/{id}')
  @response(204, {
    description: 'Asesor PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() asesor: Asesor,
  ): Promise<void> {
    await this.asesorRepository.replaceById(id, asesor);
  }

  @del('/asesors/{id}')
  @response(204, {
    description: 'Asesor DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.asesorRepository.deleteById(id);
  }
}
