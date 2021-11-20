//----------------------------------------------------------------------------------------------------------------------------------------

const express=require('express');
const mongoose = require("mongoose");
const AdministradorSchema = require("./models/Administrador.js");
const AsesorSchema = require("./models/Asesor.js");
const ClienteSchema = require("./models/Cliente.js");
const SolicitudSchema = require("./models/Solicitud.js");
const VehiculoSchema = require("./models/Vehiculo.js");
const TipoVehiculoSchema = require("./models/TipoVehiculo.js");
const CiudadSchema = require("./models/Ciudad.js");
const DepartamentoSchema = require("./models/Departamento.js");

//----------------------------------------------------------------------------------------------------------------------------------------

const app = express();
const router = express.Router();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//----------------------------------------------------------------------------------------------------------------------------------------

router.get("/", (req, res) => {
    res.send("Hello Node JS");
});

//----------------------------------------------------------------------------------------------------------------------------------------

// Conexión DB
mongoose.connect("mongodb+srv://StivenAtis:__@clusteryouridealcar.fgwsz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

//----------------------------------------------------------------------------------------------------------------------------------------

//CRUD Administrador

//Consultar Administrador
router.get("/Administrador", (req, res) => {
    let doc = req.query.doc;
    if (doc == "") {
        AdministradorSchema.find(function (err, datos) { 
            if (err) {
                console.log("Error en la consulta de los administradores")
            }
            else {
                res.send(datos);
            }
        });
    }
    else {
        AdministradorSchema.find({ id_administrador: doc }, function (err, datos) {
            if (err) {
                console.log("Error en la consulta del administrador")
            }
            else {
                res.send(datos);
            }
        });
    }
});

//-----------------------------------------------------------------------------------------------

//Crear Administrador.
router.post("/Administrador", (req, res) => {
    let nuevoAdministrador = new AdministradorSchema({
        id_administrador: req.body.documento,
        tipo_documento: req.body.tipoDoc,
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        edad: req.body.edad,
        genero: req.body.genero,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        email: req.body.email,
        contrasena: req.body.contrasena,
        estado: req.body.estado
    });

    nuevoAdministrador.save(function (err) {
        if (err) {
            console.log(err + "Error");
        }
        else {
            res.send("Administrador almacenado correctamente");
        }
    });
})

//-----------------------------------------------------------------------------------------------

//Borrar Administrador.
router.delete("/Administrador", function (req, res) {
    let doc = req.query.doc;
    AdministradorSchema.deleteOne({ id_administrador: doc }, function (err) {
        if (err) {
            console.log("Error borrando el administrador: " + err);
        }
        else {
            res.send("Administrador eliminado correctamente");
        }
    });
});

//-----------------------------------------------------------------------------------------------

//Actualizar Administrador.
router.patch("/Administrador", (req, res) => {
    let doc = req.body.doc;
    AdministradorSchema.updateOne({ id_administrador: doc }, { tipo_documento: "CC" }, function (err, datos) {
        if (err) {
            console.log("Error actualizando el administrador: " + err);
        }
        else {
            res.send("Administrador actualizado correctamente");
        }
    });
});

//----------------------------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------------------------

//CRUD Asesor

//Consultar Asesor.
router.get("/Asesor", (req, res) => {
    let doc = req.query.doc;
    if (doc == "") {
        AsesorSchema.find(function (err, datos) { 
            if (err) {
                console.log("Error en la consulta de los asesores")
            }
            else {
                res.send(datos);
            }
        });
    }
    else {
        AsesorSchema.find({ id_asesor: doc }, function (err, datos) {
            if (err) {
                console.log("Error en la consulta del asesor")
            }
            else {
                res.send(datos);
            }
        });
    }
});

//-----------------------------------------------------------------------------------------------

//Crear Asesor.
router.post("/Asesor", (req, res) => {
    let nuevoAsesor = new AsesorSchema({
        id_asesor: req.body.documento,
        tipo_documento: req.body.tipoDoc,
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        edad: req.body.edad,
        genero: req.body.genero,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        email: req.body.email,
        contrasena: req.body.contrasena,
        estado: req.body.estado,
        id_administrador: req.body.id_administrador
    });

    nuevoAsesor.save(function (err) {
        if (err) {
            console.log(err + "Error");
        }
        else {
            res.send("Asesor almacenado correctamente");
        }
    });
})

//-----------------------------------------------------------------------------------------------

//Borrar Asesor.
router.delete("/Asesor", function (req, res) {
    let doc = req.query.doc;
    AsesorSchema.deleteOne({ id_asesor: doc }, function (err) {
        if (err) {
            console.log("Error borrando el asesor: " + err);
        }
        else {
            res.send("Asesor eliminado correctamente");
        }
    });
});

//-----------------------------------------------------------------------------------------------

//Actualizar Asesor.
router.patch("/Asesor", (req, res) => {
    let doc = req.body.doc;
    AsesorSchema.updateOne({ id_asesor: doc }, { tipo_documento: "CC" }, function (err, datos) {
        if (err) {
            console.log("Error actualizando el asesor: " + err);
        }
        else {
            res.send("Asesor actualizado correctamente");
        }
    });
});

//----------------------------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------------------------

//CRUD Cliente

//Consultar Cliente.
router.get("/Cliente", (req, res) => {
    let doc = req.query.doc;
    if (doc == "") {
        ClienteSchema.find(function (err, datos) { 
            if (err) {
                console.log("Error en la consulta de los clientes")
            }
            else {
                res.send(datos);
            }
        });
    }
    else {
        ClienteSchema.find({ id_cliente: doc }, function (err, datos) {
            if (err) {
                console.log("Error en la consulta del cliente")
            }
            else {
                res.send(datos);
            }
        });
    }
});

//-----------------------------------------------------------------------------------------------

//Crear Cliente.
router.post("/Cliente", (req, res) => {
    let nuevoCliente = new ClienteSchema({
        id_cliente: req.body.documento,
        tipo_documento: req.body.tipoDoc,
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        edad: req.body.edad,
        genero: req.body.genero,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        email: req.body.email,
        contrasena: req.body.contrasena,
        estado: req.body.estado
    });

    nuevoCliente.save(function (err) {
        if (err) {
            console.log(err + "Error");
        }
        else {
            res.send("Cliente almacenado correctamente");
        }
    });
})

//-----------------------------------------------------------------------------------------------

//Borrar Cliente.
router.delete("/Cliente", function (req, res) {
    let doc = req.query.doc;
    ClienteSchema.deleteOne({ id_cliente: doc }, function (err) {
        if (err) {
            console.log("Error borrando el cliente: " + err);
        }
        else {
            res.send("Cliente eliminado correctamente");
        }
    });
});

//-----------------------------------------------------------------------------------------------

//Actualizar Cliente.
router.patch("/Cliente", (req, res) => {
    let doc = req.body.doc;
    ClienteSchema.updateOne({ id_cliente: doc }, { tipo_documento: "CC" }, function (err, datos) {
        if (err) {
            console.log("Error actualizando el cliente: " + err);
        }
        else {
            res.send("Cliente actualizado correctamente");
        }
    });
});

//----------------------------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------------------------

//CRUD Solicitud

//Consultar Solicitud.
router.get("/Solicitud", (req, res) => {
    let doc = req.query.doc;
    if (doc == "") {
        SolicitudSchema.find(function (err, datos) { 
            if (err) {
                console.log("Error en la consulta de las solicitudes")
            }
            else {
                res.send(datos);
            }
        });
    }
    else {
        SolicitudSchema.find({ id_solicitud: doc }, function (err, datos) {
            if (err) {
                console.log("Error en la consulta de la solicitud")
            }
            else {
                res.send(datos);
            }
        });
    }
});

//-----------------------------------------------------------------------------------------------

//Crear Solicitud.
router.post("/Solicitud", (req, res) => {
    let nuevaSolicitud = new SolicitudSchema({
        id_solicitud: req.body.idSolicitud,
        id_cliente: req.body.cliente,
        id_asesor: req.body.asesor,
        id_vehiculo: req.body.vehiculo,
        cantidad_vehiculos: req.body.cantidadVehiculos,
        fecha: req.body.fecha,
        estado: req.body.estado
    });

    nuevaSolicitud.save(function (err) {
        if (err) {
            console.log(err + "Error");
        }
        else {
            res.send("Solicitud almacenada correctamente");
        }
    });
})

//-----------------------------------------------------------------------------------------------

//Borrar Solicitud.
router.delete("/Solicitud", function (req, res) {
    let doc = req.query.doc;
    SolicitudSchema.deleteOne({ id_solicitud: doc }, function (err) {
        if (err) {
            console.log("Error borrando la solicitud: " + err);
        }
        else {
            res.send("Solicitud eliminada correctamente");
        }
    });
});

//-----------------------------------------------------------------------------------------------

//Actualizar Solicitud.
router.patch("/Solicitud", (req, res) => {
    let doc = req.body.doc;
    SolicitudSchema.updateOne({ id_solicitud: doc }, { estado: false }, function (err, datos) {
        if (err) {
            console.log("Error actualizando la solicitud: " + err);
        }
        else {
            res.send("Solicitud actualizada correctamente");
        }
    });
});

//----------------------------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------------------------

//CRUD Vehiculo.

//Consultar Vehiculo.
router.get("/Vehiculo", (req, res) => {
    let doc = req.query.doc;
    if (doc == "") {
        VehiculoSchema.find(function (err, datos) { 
            if (err) {
                console.log("Error en la consulta de los vehiculos")
            }
            else {
                res.send(datos);
            }
        });
    }
    else {
        VehiculoSchema.find({ id_vehiculo: doc }, function (err, datos) {
            if (err) {
                console.log("Error en la consulta del vehiculo")
            }
            else {
                res.send(datos);
            }
        });
    }
});

//-----------------------------------------------------------------------------------------------

//Crear Vehiculo.
router.post("/Vehiculo", (req, res) => {
    let nuevoVehiculo = new VehiculoSchema({
        id_vehiculo: req.body.idVehiculo,
        id_asesor: req.body.asesor,
        id_tipo_vehiculo: req.body.tipoVehiculo,
        codigo_departamento: req.body.Departamento,
        codigo_ciudad: req.body.ciudad,
        marca: req.body.marca,
        referencia: req.body.referencia,
        modelo: req.body.modelo,
        valor: req.body.valor,
        fecha: req.body.fecha,
        estado: req.body.estado
    });

    nuevoVehiculo.save(function (err) {
        if (err) {
            console.log(err + "Error");
        }
        else {
            res.send("Vehiculo almacenado correctamente");
        }
    });
})

//-----------------------------------------------------------------------------------------------

//Borrar Vehiculo.
router.delete("/Vehiculo", function (req, res) {
    let doc = req.query.doc;
    VehiculoSchema.deleteOne({ id_vehiculo: doc }, function (err) {
        if (err) {
            console.log("Error borrando el vehiculo: " + err);
        }
        else {
            res.send("Vehiculo eliminado correctamente");
        }
    });
});

//-----------------------------------------------------------------------------------------------

//Actualizar Vehiculo.
router.patch("/Vehiculo", (req, res) => {
    let doc = req.body.doc;
    VehiculoSchema.updateOne({ id_vehiculo: doc }, { modelo: 'BMW' }, function (err, datos) {
        if (err) {
            console.log("Error actualizando el vehiculo: " + err);
        }
        else {
            res.send("Vehiculo actualizado correctamente");
        }
    });
});

//----------------------------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------------------------

//CRUD TipoVehiculo.

//Consultar TipoVehiculo.
router.get("/TipoVehiculo", (req, res) => {
    let doc = req.query.doc;
    if (doc == "") {
        TipoVehiculoSchema.find(function (err, datos) { 
            if (err) {
                console.log("Error en la consulta de los tipos de vehiculos")
            }
            else {
                res.send(datos);
            }
        });
    }
    else {
        TipoVehiculoSchema.find({ id_tipo_vehiculo: doc }, function (err, datos) {
            if (err) {
                console.log("Error en la consulta del tipo de vehiculo")
            }
            else {
                res.send(datos);
            }
        });
    }
});

//-----------------------------------------------------------------------------------------------

//Crear TipoVehiculo.
router.post("/TipoVehiculo", (req, res) => {
    let nuevoTipoVehiculo = new TipoVehiculoSchema({
        id_tipo_vehiculo: req.body.idTipoVehiculo,
        tipo: req.body.tipo,
        estado: req.body.estado
    });

    nuevoTipoVehiculo.save(function (err) {
        if (err) {
            console.log(err + "Error");
        }
        else {
            res.send("Tipo de vehiculo almacenado correctamente");
        }
    });
})

//-----------------------------------------------------------------------------------------------

//Borrar TipoVehiculo.
router.delete("/TipoVehiculo", function (req, res) {
    let doc = req.query.doc;
    TipoVehiculoSchema.deleteOne({ id_tipo_vehiculo: doc }, function (err) {
        if (err) {
            console.log("Error borrando el tipo de vehiculo: " + err);
        }
        else {
            res.send("Tipo de vehiculo eliminado correctamente");
        }
    });
});

//-----------------------------------------------------------------------------------------------

//Actualizar TipoVehiculo.
router.patch("/TipoVehiculo", (req, res) => {
    let doc = req.body.doc;
    TipoVehiculoSchema.updateOne({ id_tipo_vehiculo: doc }, { tipo: 'Camión' }, function (err, datos) {
        if (err) {
            console.log("Error actualizando el tipo de vehiculo: " + err);
        }
        else {
            res.send("Tipo de vehiculo actualizado correctamente");
        }
    });
});

//----------------------------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------------------------

//CRUD Ciudad.

//Consultar Ciudad.
router.get("/Ciudad", (req, res) => {
    let doc = req.query.doc;
    if (doc == "") {
        CiudadSchema.find(function (err, datos) { 
            if (err) {
                console.log("Error en la consulta de las ciudades")
            }
            else {
                res.send(datos);
            }
        });
    }
    else {
        CiudadSchema.find({ codigo_ciudad: doc }, function (err, datos) {
            if (err) {
                console.log("Error en la consulta de la ciudad")
            }
            else {
                res.send(datos);
            }
        });
    }
});

//-----------------------------------------------------------------------------------------------

//Crear Ciudad.
router.post("/Ciudad", (req, res) => {
    let nuevaCiudad = new CiudadSchema({
        codigo_ciudad: req.body.codigoCiudad,
        nombre: req.body.nombre,
        estado: req.body.estado
    });

    nuevaCiudad.save(function (err) {
        if (err) {
            console.log(err + "Error");
        }
        else {
            res.send("Ciudad almacenada correctamente");
        }
    });
})

//-----------------------------------------------------------------------------------------------

//Borrar Ciudad.
router.delete("/Ciudad", function (req, res) {
    let doc = req.query.doc;
    CiudadSchema.deleteOne({ codigo_ciudad: doc }, function (err) {
        if (err) {
            console.log("Error borrando la ciudad: " + err);
        }
        else {
            res.send("Ciudad eliminada correctamente");
        }
    });
});

//-----------------------------------------------------------------------------------------------

//Actualizar Ciudad.
router.patch("/Ciudad", (req, res) => {
    let doc = req.body.doc;
    CiudadSchema.updateOne({ codigo_ciudad: doc }, { estado: false }, function (err, datos) {
        if (err) {
            console.log("Error actualizando la ciudad: " + err);
        }
        else {
            res.send("Ciudad actualizada correctamente");
        }
    });
});

//----------------------------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------------------------

//CRUD Departamento.

//Consultar Departamento.
router.get("/Departamento", (req, res) => {
    let doc = req.query.doc;
    if (doc == "") {
        DepartamentoSchema.find(function (err, datos) { 
            if (err) {
                console.log("Error en la consulta de los departamentos")
            }
            else {
                res.send(datos);
            }
        });
    }
    else {
        DepartamentoSchema.find({ codigo_departamento: doc }, function (err, datos) {
            if (err) {
                console.log("Error en la consulta del departamento")
            }
            else {
                res.send(datos);
            }
        });
    }
});

//-----------------------------------------------------------------------------------------------

//Crear Departamento.
router.post("/Departamento", (req, res) => {
    let nuevoDepartamento = new DepartamentoSchema({
        codigo_departamento: req.body.codigoDepartamento,
        nombre: req.body.nombre,
        estado: req.body.estado
    });

    nuevoDepartamento.save(function (err) {
        if (err) {
            console.log(err + "Error");
        }
        else {
            res.send("Departamento almacenado correctamente");
        }
    });
})

//-----------------------------------------------------------------------------------------------

//Borrar Departamento.
router.delete("/Departamento", function (req, res) {
    let doc = req.query.doc;
    DepartamentoSchema.deleteOne({ codigo_departamento: doc }, function (err) {
        if (err) {
            console.log("Error borrando el departamento: " + err);
        }
        else {
            res.send("Departamento eliminado correctamente");
        }
    });
});

//-----------------------------------------------------------------------------------------------

//Actualizar Departamento.
router.patch("/Departamento", (req, res) => {
    let doc = req.body.doc;
    DepartamentoSchema.updateOne({ codigo_departamento: doc }, { estado: false }, function (err, datos) {
        if (err) {
            console.log("Error actualizando el departamento: " + err);
        }
        else {
            res.send("Departamento actualizado correctamente");
        }
    });
});

//----------------------------------------------------------------------------------------------------------------------------------------

app.use(router);
app.listen(8000,()=>{
    console.log("\n" + "Servidor node js, puerto 8000" + "\n");
});

//----------------------------------------------------------------------------------------------------------------------------------------