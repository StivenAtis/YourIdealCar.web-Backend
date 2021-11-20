//Estructura o esquema de los datos de la entidad Solicitud.

const mongoose = require("mongoose");

let SolicitudSchema = new mongoose.Schema({
    id: String,
    id_solicitud: String,
    id_cliente: String,
    id_asesor: String,
    id_vehiculo: String,
    cantidad_vehiculos: Number,
    fecha: Date,
    estado: Boolean
});

module.exports = mongoose.model("Solicitud", SolicitudSchema, "Solicitudes");