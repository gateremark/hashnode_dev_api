import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";
import { HashnodeUserDataSource } from "./datasources.js";

// server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => ({
    dataSources: {
      hashnodeAPI: new HashnodeUserDataSource(),
    },
  }),
  listen: { port: 4000 },
});

console.log("Server ready at port", url);
