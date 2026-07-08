export const typeDefs = `#graphql
  type Desarrollador {
    id: ID!
    nombre: String!
    pais: String!
    fundacionAnio: Int!
    videojuegos: [Videojuego!]!
  }

  type Videojuego {
    id: ID!
    titulo: String!
    genero: String!
    anioLanzamiento: Int!
    desarrolladorId: ID!
    desarrollador: Desarrollador!
  }

  type Query {
    videojuegos(genero: String, anioLanzamiento: Int): [Videojuego!]!
    videojuego(id: ID!): Videojuego
    desarrolladores(pais: String): [Desarrollador!]!
    desarrollador(id: ID!): Desarrollador
  }

  type Mutation {
    crearVideojuego(
      titulo: String!
      genero: String!
      anioLanzamiento: Int!
      desarrolladorId: ID!
    ): Videojuego!

    crearDesarrollador(
      nombre: String!
      pais: String!
      fundacionAnio: Int!
    ): Desarrollador!

    eliminarVideojuego(id: ID!): Boolean!
  }
`;
