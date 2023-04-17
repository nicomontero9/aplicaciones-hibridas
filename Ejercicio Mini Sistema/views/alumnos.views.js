function generatePage(title, contnet) {

    let html = `<!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="/css/styles.css"> `

    html += '<title>' + title + '</title></head><body>'

    html += '<h1>Mini sistema de alumnos</h1>'

    html += '<nav><a href="/">Home</a> | <a href="/alumnos">Alumnos</a> | <a href="/alumnos/nuevo">Nuevo alumno</a></nav>'

    html += contnet;

    html += '</body></html>'

    return html;
}


function generateListAlumnos(alumnos) {
    let html = '<ul>';
    for (let alumno of alumnos) {
        html += `<li>${alumno.nombre} ${alumno.apellido} ${alumno.año} <a href="/alumnos/${alumno.legajo}">Ver</a> <a href="/alumnos/${alumno.legajo}/edit">Modificar</a> <a href="/alumnos/${alumno.legajo}/delete">Eliminar</a></li>`
    }
    html += '</ul>'

    return generatePage('Lista de Alumnos', html)
}

function generateNewAlumnoForm() {
    let html = `<form action="/alumnos/nuevo" method="post">
        <label for="nombre">Nombre: 
            <input type="text" name="nombre" id="nombre">
        </label>
        <label for="apellido">Apellido: 
            <input type="text" name="apellido" id="apellido">
        </label>
        <label for="año">Año:
            <input type="text" name="año" id="año">
        </label>
        <button type="submit">Crear</button>
    </form>`

    return generatePage('Crear Alumno', html)
}


function generateEditAlumnoForm(alumno) {
    let html = `
    <h1>Modificar Alumno #${alumno.nombre + ' ' + alumno.apellido }</h1>
    
    <form action="/alumnos/${alumno.legajo}/edit" method="post">
        <label for="nombre">Nombre: 
            <input type="text" name="nombre" id="nombre" value="${alumno.nombre}">
        </label>
        <label for="apellido">Apellido: 
            <input type="text" name="apellido" id="apellido" value="${alumno.apellido}">
        </label>
        <label for="año">Año:
            <input type="text" name="año" id="año" value="${alumno.año}">
        </label>
        <button type="submit">Crear</button>
    </form>`

    return generatePage(`Editar Alumno ${alumno.nombre + ' ' + alumno.apellido }`, html)
}

function generateDeleteAlumno(alumno) {
    let html = `<h1>${alumno.nombre + ' ' + alumno.apellido }</h1>`
    html += `<p>${alumno.año}</p>`

    html += `<form action="/alumnos/${alumno.legajo}/delete" method="post">
        <button type="submit">Eliminar</button>
    </form>`

    return generatePage('Eliminar Producto', html)
}


export {
    generatePage,
    generateListAlumnos,
    generateNewAlumnoForm,
    generateEditAlumnoForm,
    generateDeleteAlumno
}



/*
export default {
    generatePage,
    function2
}
*/