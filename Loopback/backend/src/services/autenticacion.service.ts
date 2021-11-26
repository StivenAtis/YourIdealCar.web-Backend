import { injectable, /* inject, */ BindingScope } from '@loopback/core';
import { repository } from '@loopback/repository';
import { Asesor, Administrador, Cliente } from '../models';
import { AsesorRepository, AdministradorRepository, ClienteRepository } from '../repositories';
import { keys } from '../config/keys';
const generador = require("password-generator");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");

@injectable({ scope: BindingScope.TRANSIENT })
export class AutenticacionService {
  constructor(
    @repository(AsesorRepository)
    public asesorRepository: AsesorRepository,
    @repository(AdministradorRepository)
    public administradorRepository: AdministradorRepository,
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository
  ) { }

  /*
   * Add service methods here
   */

  //--------------------------------------------------------------------------------------------------------------------

  //Función para genewrar la contraseña:
  GenerarPassword() {
    let password = generador(9, false);
    return password;
  }

  //Función para cifrar contraseña:
  CifrarPassword(password: string) {
    let passwordCifrado = crypto.MD5(password).toString();
    return passwordCifrado;
  }

  //--------------------------------------------------------------------------------------------------------------------

  //Función para identificar un asesor:
  IdentificarAsesor(usuario: string, clave: string) {
    try {
      let asesor = this.asesorRepository.findOne({ where: { email: usuario, contrasenia: clave } });
      if (asesor) {
        return asesor;
      }
      else {
        return false;
      }
    }
    catch {
      return false;
    }
  }

  //Función para identificar un administrador:
  IdentificarAdministrador(usuario: string, clave: string) {
    try {
      let administrador = this.administradorRepository.findOne({ where: { email: usuario, contrasenia: clave } });
      if (administrador) {
        return administrador;
      }
      else {
        return false;
      }
    }
    catch {
      return false;
    }
  }

   //Función para identificar un cliente:
   IdentificarCliente(usuario: string, clave: string) {
    try {
      let cliente = this.clienteRepository.findOne({ where: { email: usuario, contrasenia: clave } });
      if (cliente) {
        return cliente;
      }
      else {
        return false;
      }
    }
    catch {
      return false;
    }
  }

  //--------------------------------------------------------------------------------------------------------------------

  //Metdo para generar JWT asesor:
  GenerarJWT(asesor: Asesor) {
    let token = jwt.sign({
      data: {
        id: asesor.id_asesor,
        correo: asesor.email,
        nombre: asesor.nombres + " " + asesor.apellidos
      }
    }, keys.claveJWT
    );
    return token;
  }

  //Metdo para generar JWT administrador:
  GenerarJWTAdmin(administrador: Administrador) {
    let token = jwt.sign({
      data: {
        id: administrador.id_administrador,
        correo: administrador.email,
        nombre: administrador.nombres + " " + administrador.apellidos
      }
    }, keys.claveJWT
    );
    return token;
  }

  //Metdo para generar JWT cliente:
  GenerarJWTCliente(cliente: Cliente) {
    let token = jwt.sign({
      data: {
        id: cliente.id_cliente,
        correo: cliente.email,
        nombre: cliente.nombres + " " + cliente.apellidos
      }
    }, keys.claveJWT
    );
    return token;
  }

  //--------------------------------------------------------------------------------------------------------------------

  //Validar token:
  ValidarJWT(token: string) {
    try {
      let datos = jwt.verify(token, keys.claveJWT);
      return datos;
    } catch {
      return false;
    }
  }

  //--------------------------------------------------------------------------------------------------------------------
}
