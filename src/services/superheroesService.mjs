// Implementa la lógica de negocio, utilizando los métodos del repositorio para recuperar, 
// filtrar y buscar datos de superheroes

import superHeroRepository from '../repositories/SuperHeroRepository.mjs';

export async function obtenerSuperheroePorId(id) {
  console.log("Dentro de la funcion obtenerSuperheroePorId de la CAPA SERVICIOS, con el siguiente id:", id);
  return await superHeroRepository.obtenerPorId(id);
}

export async function obtenerTodosLosSuperheroes() {
  return await superHeroRepository.obtenerTodos();
}

export async function buscarSuperheroesPorAtributo(atributo, valor) {
  return await superHeroRepository.buscarPorAtributo(atributo, valor);
}

export async function obtenerSuperheroesMayoresDe30() {
  return await superHeroRepository.obtenerMayoresDe30ConCriterios();
}