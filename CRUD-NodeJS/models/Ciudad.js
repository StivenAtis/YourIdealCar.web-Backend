//Estructura o esquema de los datos de la entidad Ciudad.

const mongoose = require("mongoose");

let CiudadSchema = new mongoose.Schema({
    id: String,
    codigo_ciudad: String,
    nombre: String,
    estado: Boolean
});

module.exports = mongoose.model("Ciudad", CiudadSchema, "Ciudades");