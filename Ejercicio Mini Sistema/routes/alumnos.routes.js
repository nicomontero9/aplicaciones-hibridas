import express from 'express'

import * as controller from '../controllers/alumnos.controllers.js'

const route = express.Router()

route.get('/alumnos', controller.getAlumnos)

route.get('/alumnos/nuevo', controller.formCreateAlumno)
route.post('/alumnos/nuevo', controller.createAlumno)

route.get('/alumnos/:legajo/edit', controller.formEditAlumno)
route.post('/alumnos/:legajo/edit', controller.editAlumno)

route.get('/alumnos/:legajo/delete', controller.formDeleteAlumno)
route.post('/alumnos/:legajo/delete', controller.deleteAlumno)


export default route