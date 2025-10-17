// Implementa los metodos definidos en la interfaz
// interactúa directa# con MongoDB a traves de Mongoose para realizar operaciones de datos

import SuperHero from "../models/SuperHero.mjs";
import IRepository from "./IRepository.mjs";

class SuperHeroRepository extends IRepository {
  async obtenerPorId(id) {
    console.log(
      "Dentro de la funcion obtenerPorId de la CAPA REPOSITORY, con el siguiente id:",
      id
    );
    return await SuperHero.findById(id);
  }
  async obtenerTodos() {
    return await SuperHero.find({});
  }

  // Resueltos: 
  // - Buscar por atributo, 
  // - Obtener mayores de 30 del planeta tierra con 2+ poderes
  
  async buscarPorAtributo(atributo, valor) {
    return await SuperHero.find({ [atributo]: valor });
  }

  // async obtenerMayoresDe30ConCriterios() {
  //   return await SuperHero.find({
  //     edad: { $gt: 30 },
  //     planetaOrigen: "Tierra",
  //     $expr: { $gte: [{ $size: "$poderes" }, 2] },
  //   });
  // }
  async obtenerMayoresDe30ConCriterios() {
  return await SuperHero.find({
    edad: { $gt: 30 },
    planetaOrigen: "Tierra",
    $expr: {
      $gte: [
        { $size: { $ifNull: ["$poderes", []] } },
        2
      ]
    }
  });
}
}

export default new SuperHeroRepository();
