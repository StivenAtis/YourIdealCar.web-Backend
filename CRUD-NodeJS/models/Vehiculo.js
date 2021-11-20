//Estructura o esquema de los datos de la entidad Vehiculo.

const mongoose = require("mongoose");

let VehiculoSchema = new mongoose.Schema({
    id: String,
    id_vehiculo: String,
    id_asesor: String,
    id_tipo_vehiculo: String,
    codigo_departamento: String,
    codigo_ciudad: String,
    marca: String,
    referencia: Number,
    modelo: String,
    valor: Number,
    fecha: Date,
    estado: Boolean
});

module.exports = mongoose.model("Vehiculo", VehiculoSchema, "Vehiculos");