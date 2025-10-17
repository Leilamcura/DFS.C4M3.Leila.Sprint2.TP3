// Controlador:gestiona las solicitudes hhtp, llamando a los servicios 
// correspondientes y utilizando las vistas para presentar los datos

import { obtenerSuperheroePorId, obtenerTodosLosSuperheroes, buscarSuperheroesPorAtributo, obtenerSuperheroesMayoresDe30 } from "../services/superheroesService.mjs";

import { renderizarSuperheroe, renderizarListasSuperheroes } from "../views/responseView.mjs";

export async function obtenerSuperheroePorIdController(req, res) { 
    try {
        const { id } = req.params;
        console.log("Estoy en la funcion obtenerSuperheroePorIdController CAPA CONTROLADOR, el id consultado es el siguiente:", id);
        const superheroe = await obtenerSuperheroePorId(id);
        console.log("El id buscado corresponde al siguiente superheroe:", superheroe);
        if (!superheroe) {
            return res.status(404).send({ mensaje:'Superheroe no encontrado' });
        }

    const superheroeFormateado = renderizarSuperheroe(superheroe);
    console.log("Dentro de la funcion obtenerSuperheroePorIdController la CAPA CONTROLADOR llama a la vista y renderiza los datos así ->:", superheroeFormateado);
    res.status(200).json(superheroeFormateado);
} catch (error) {
    res.status(500).send({ mensaje: 'Error al obtener el superheroe', error: error.message});
}
}

export async function obtenerTodosLosSuperheroesController(req, res) {
    try {
        const superheroes = await obtenerTodosLosSuperheroes();
        const superheroesFormateados = renderizarListasSuperheroes(superheroes);
        console.log("Estoy en la funcion obtenerTodosLosSuperheroesController CAPA CONTROLADOR, el listado de superheroes es el siguiente:", superheroesFormateados);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener los superheroes', error: error.message});
    }
}

export async function buscarSuperheroesPorAtributoController(req, res) {
    try {
        const { atributo, valor } = req.params;
        //console.log("Estoy en la funcion buscarSuperheroesPorAtributoController CAPA CONTROLADOR, atributo/valor:", atributo, valor);
        console.log(`Estoy en la funcion buscarSuperheroesPorAtributoController CAPA CONTROLADOR, atributo: ${atributo}, valor: ${valor}`);
        const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);
        if (superheroes.length === 0) {
            return res.status(404).send({ mensaje: 'No se encontraron superheroes con ese atributo' });
        }

        const superheroesFormateados = renderizarListasSuperheroes(superheroes);
        console.log(`Los superheros encontrados con atributo: ${atributo} y valor: ${valor} son los siguientes: ${superheroes}`);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al buscar superheroes', error: error.message});
    }
}

export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
    try {
        const superheroes = await obtenerSuperheroesMayoresDe30();
        if (superheroes.length === 0) {
            return res.status(404).send({ mensaje: 'No se encontraron superheroes mayores de 30 años' });
        }
        const superheroesFormateados = renderizarListasSuperheroes(superheroes);
        console.log("Estoy en la funcion obtenerSuperheroesMayoresDe30 CAPA CONTROLADOR, los >30 son los siguientes:", superheroesFormateados);
    res.status(200).json(superheroesFormateados);
} catch (error) {
    res.status(500).send({ mensaje: 'Error al obtener superheroes mayores de 30', error: error.message});
}
}