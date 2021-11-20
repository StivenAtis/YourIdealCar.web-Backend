//Estructura o esquema de los datos de la entidad Administrador.

const mongoose = require("mongoose");

let AdministradorSchema = new mongoose.Schema({
    id: String,
    id_administrador: String,
    tipo_documento: String,
    nombres: String,
    apellidos: String,
    edad: Number,
    genero: String,
    telefono: String,
    direccion: String,
    email: String,
    contrasena: String,
    estado: Boolean
});

module.exports = mongoose.model("Administrador", AdministradorSchema, "Administradores");