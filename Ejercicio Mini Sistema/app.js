import express from 'express'
import ProductRoute from './routes/alumnos.routes.js'

const app = express() // crea el servidor utilizando express

// configuracion del servidor
app.use(express.urlencoded({ extended: true })) // permite recibir datos de formularios
app.use('/', express.static('public')) // permite acceder a los archivos estaticos

app.use(ProductRoute)

app.listen(2023, function () {
    console.log('Server is running in http://localhost:2023')
})
