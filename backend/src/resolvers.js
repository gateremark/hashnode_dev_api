// resolvers.js
import { HashnodeUserDataSource } from './datasources.js';

const hashnodeAPI = new HashnodeUserDataSource();

export const resolvers = {
  Query: {
    getHashnodeUser: async (_, { username }) => { // Just a simple resolver function that calls the getUserByUsername method from the HashnodeUserDataSource class
      // name can be anything.
      try {
        return await hashnodeAPI.getUserByUsername(username); // Calling the getUserByUsername method from the HashnodeUserDataSource class
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
