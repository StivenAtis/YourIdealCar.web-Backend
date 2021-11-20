//Estructura o esquema de los datos de la entidad Asesor.

const mongoose = require("mongoose");

let AsesorSchema = new mongoose.Schema({
    id: String,
    id_asesor: String,
    tipo_documento: String,
    nombres: String,
    apellidos: String,
    edad: Number,
    genero: String,
    telefono: String,
    direccion: String,
    email: String,
    contrasena: String,
    estado: Boolean,
    id_administrador: String
});

module.exports = mongoose.model("Asesor", AsesorSchema, "Asesores");