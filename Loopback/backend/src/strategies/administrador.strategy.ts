import { AuthenticationStrategy } from '@loopback/authentication';
import { service } from '@loopback/core';
import { HttpErrors } from '@loopback/rest';
import { Request } from '@loopback/rest/dist/types';
import { UserProfile } from '@loopback/security';
import parseBearerToken from "parse-bearer-token";
import { AutenticacionService } from '../services';


export class EstrategiaAdministrador implements AuthenticationStrategy {
    name: string = "administrador";
    constructor(
        @service(AutenticacionService)
        public servicioAutenticacion: AutenticacionService
    ) { }

    async authenticate(request: Request): Promise<UserProfile | undefined> {
        let token = parseBearerToken(request);
        if (token) {
            let datos = this.servicioAutenticacion.ValidarJWT(token);
            if (datos) {
                let profile: UserProfile = Object.assign({
                    nombre: datos.data.nombre
                });
                if (datos.data.rol != "Administrador") {
                    throw new HttpErrors[401]("El rol " + datos.data.rol + " no es válido");
                }
                return profile;
            } else {
                throw new HttpErrors[401]("El token no es válido");
            }

        } else {
            throw new HttpErrors[401]("La solicitud no cuenta con un token");
        }
    }
}
