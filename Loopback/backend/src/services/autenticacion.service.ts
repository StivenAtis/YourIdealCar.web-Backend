import {injectable, /* inject, */ BindingScope} from '@loopback/core';
const generador=require("password-generator");
const crypto=require("crypto-js");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */
  //Función para genewrar la contraseña:
  GenerarPassword(){
    let password = generador(9,false);
    return password;
  }

  //Función para cifrar contraseña:
  CifrarPassword(password: string){
    let passwordCifrado = crypto.MD5(password).toString();
    return passwordCifrado;
  }
}
