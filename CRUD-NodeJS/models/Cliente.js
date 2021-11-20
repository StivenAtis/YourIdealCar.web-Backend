//Estructura o esquema de los datos de la entidad Cliente.

const mongoose = require("mongoose");

let ClienteSchema = new mongoose.Schema({
    id: String,
    id_cliente: String,
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

module.exports = mongoose.model("Cliente", ClienteSchema, "Clientes");