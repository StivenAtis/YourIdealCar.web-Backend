//Estructura o esquema de los datos de la entidad Departamento.

const mongoose = require("mongoose");

let DepartamentoSchema = new mongoose.Schema({
    id: String,
    codigo_departamento: String,
    nombre: String,
    estado: Boolean
});

module.exports = mongoose.model("Departamento", DepartamentoSchema, "Departamentos");