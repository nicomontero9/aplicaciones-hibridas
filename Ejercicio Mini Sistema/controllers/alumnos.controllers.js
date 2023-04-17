import * as view from '../views/alumnos.views.js'
import * as service from '../services/alumnos.services.js'


function getAlumnos(req, res) {
    service.getAlumnos({ deleted: true })
        .then(function (alumnos) {
            res.send(view.generateListAlumnos(alumnos))
        })
}

function formCreateAlumno(req, res) {
    res.send(view.generateNewAlumnoForm())
}

function createAlumno(req, res) {
    let alumno = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        año: req.body.año
    }

    service.createAlumno(alumno)
        .then(function (alumno) {
            res.send(view.generatePage('Alumno Creado', `<h1>Alumno creado con exito</h1>`))
        })
        .catch(function (err) {
            res.send(view.generatePage('Error al crear alumno', `<h1>${err}</h1>`))
        })
}

function formEditAlumno(req, res) {
    let legajo = req.params.legajo

    service.getAlumnoByLegajo(legajo)
        .then(function (alumno) {
            if (alumno) {
                res.send(view.generateEditAlumnoForm(alumno))
            }
            else {
                res.send(view.generatePage('Modificar Alumno', `<h1>Alumno no encontrado</h1>`))
            }
        })
}

function editAlumno(req,res) {
    let legajo = parseInt(req.params.legajo)

    let alumno = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        año: parseInt(req.body.año)
    }

    service.editAlumno(legajo, alumno)
        .then(function (alumno) {
            if (alumno) {
                res.send(view.generatePage('Alumno Modificado', `<h1>Alumno modificado con exito</h1>`))
            }
            else {
                res.send(view.generatePage('Alumno Modificado', `<h1>Alumno no encontrado</h1>`))
            }
        })
        .catch(function (err) {
            res.send(view.generatePage('Error al modificar producto', `<h1>${err}</h1>`))
        })
}

function formDeleteAlumno(req, res) {
    let legajo = req.params.legajo

    service.getAlumnoByLegajo(legajo)
        .then(function (alumno) {
            if (alumno) {
                res.send(view.generateDeleteAlumno(alumno))
            }
            else {
                res.send(view.generatePage('Detalle de Alumno', `<h1>Alumno no encontrado</h1>`))
            }
        })
}


function deleteAlumno(req, res) {
    let legajo = parseInt(req.params.legajo)

    service.deleteAlumno(legajo)
        .then(function (alumno) {
            if (alumno) {
                res.send(view.generatePage('Alumno Eliminado', `<h1>Alumno eliminado con exito</h1>`))
            }
            else {
                res.send(view.generatePage('Detalle de Alumno', `<h1>Alumno no encontrado</h1>`))
            }
        })
        .catch(function (err) {
            res.send(view.generatePage('Error al eliminar alumno', `<h1>${err}</h1>`))
        })
}

export {
    getAlumnos,
    formCreateAlumno,
    createAlumno,
    formEditAlumno,
    editAlumno,
    formDeleteAlumno,
    deleteAlumno
}