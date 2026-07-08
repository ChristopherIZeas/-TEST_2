import { videojuegos, desarrolladores } from "./data.js";

export const resolvers = {
  Query: {
    videojuegos: (_, { genero, anioLanzamiento }) => {
      let result = videojuegos;
      if (genero) {
        result = result.filter(v => v.genero.toLowerCase() === genero.toLowerCase());
      }
      if (anioLanzamiento) {
        result = result.filter(v => v.anioLanzamiento === anioLanzamiento);
      }
      return result;
    },
    videojuego: (_, { id }) => videojuegos.find(v => v.id === id),
    desarrolladores: (_, { pais }) => {
      let result = desarrolladores;
      if (pais) {
        result = result.filter(d => d.pais.toLowerCase() === pais.toLowerCase());
      }
      return result;
    },
    desarrollador: (_, { id }) => desarrolladores.find(d => d.id === id)
  },
  Videojuego: {
    desarrollador: (parent) => {
      return desarrolladores.find(d => d.id === parent.desarrolladorId);
    }
  },
  Desarrollador: {
    videojuegos: (parent) => {
      return videojuegos.filter(v => v.desarrolladorId === parent.id);
    }
  },
  Mutation: {
    crearVideojuego: (_, { titulo, genero, anioLanzamiento, desarrolladorId }) => {
      // Validar si el desarrollador existe
      const devExists = desarrolladores.some(d => d.id === desarrolladorId);
      if (!devExists) {
        throw new Error(`El desarrollador con ID ${desarrolladorId} no existe.`);
      }
      
      const nuevoVideojuego = {
        id: `v${videojuegos.length + 1}`,
        titulo,
        genero,
        anioLanzamiento,
        desarrolladorId
      };
      videojuegos.push(nuevoVideojuego);
      return nuevoVideojuego;
    },
    crearDesarrollador: (_, { nombre, pais, fundacionAnio }) => {
      const nuevoDesarrollador = {
        id: `d${desarrolladores.length + 1}`,
        nombre,
        pais,
        fundacionAnio
      };
      desarrolladores.push(nuevoDesarrollador);
      return nuevoDesarrollador;
    },
    eliminarVideojuego: (_, { id }) => {
      const index = videojuegos.findIndex(v => v.id === id);
      if (index === -1) {
        return false;
      }
      videojuegos.splice(index, 1);
      return true;
    }
  }
};
