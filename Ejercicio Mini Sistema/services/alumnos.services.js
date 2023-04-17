import { readFile, writeFile } from 'node:fs/promises'

async function getAlumnos(filter = {}) {
    return readFile('./data/alumnos.json')
        .then(function (data) {
            return JSON.parse(data)
        })
        .then(function (alumnos) {
            if (filter?.deleted) {
                const filterProduct = []
                for (let i = 0; i < alumnos.length; i++) {
                    if (!alumnos[i].deleted) {
                        filterProduct.push(alumnos[i])
                    }
                }
                return filterProduct
            }

            return alumnos
        })
        .catch(function (err) {
            return []
        })
}

async function saveAlumnos(alumnos) {
    return writeFile('./data/alumnos.json', JSON.stringify(alumnos))
}

async function getAlumnoByLegajo(legajo) {
    return getAlumnos()
    .then(function (alumnos) {
        let alumno = null

        for (let i = 0; i < alumnos.length; i++) {
            if (alumnos[i].legajo == legajo) {
                alumno = alumnos[i]
                break
            }
        }

        return alumno
    })
}

async function createAlumno(alumno){
    const alumnos = await getAlumnos()

    let nuevoAlumno = {
        ...alumno,
        legajo: alumnos.length + 1
    }

    alumnos.push(nuevoAlumno)
    await saveAlumnos(alumnos)
    return nuevoAlumno
}

async function editAlumno(legajo,alumno){
    let isFound = false
    const alumnos = await getAlumnos()

    let editedAlumno = {
        ...alumno,
        legajo: legajo
    }

    for (let i = 0; i < alumnos.length; i++) {
        if(alumnos[i].legajo === legajo) {
            alumnos[i] = editedAlumno
            isFound = true
        }
    }

    if (isFound) {
        await saveAlumnos(alumnos)
        return editedAlumno
    }
    else {
        return null
    }
}

async function deleteAlumno(legajo) {
    const alumnos = await getAlumnos()
    let deleteAlumno = null

    for (let i = 0; i < alumnos.length; i++) {
        if (alumnos[i].legajo === legajo) {
            alumnos[i].deleted = true
            deleteAlumno = alumnos[i]
        }
    }

    await saveAlumnos(alumnos)

    return deleteAlumno
}

export {
    getAlumnos,
    getAlumnoByLegajo,
    createAlumno,
    editAlumno,
    deleteAlumno
}