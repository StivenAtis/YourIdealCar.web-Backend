//Estructura o esquema de los datos de la entidad TipoVehiculo.

const mongoose = require("mongoose");

let TipoVehiculoSchema = new mongoose.Schema({
    id: String,
    id_tipo_vehiculo: String,
    tipo: String,
    estado: Boolean
});

module.exports = mongoose.model("TipoVehiculo", TipoVehiculoSchema, "TipoVehiculos");