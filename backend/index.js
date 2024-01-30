import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import axios from "axios";

// GraphQL schema
const typeDefs = `#graphql
    type Query {
        user(username: String): User
    }

    # User Schema
    type User {
    username: String
    profilePicture: String
    badges: [Badge]
    followersCount: Int
    isPro: Boolean
    posts(page: Int, pageSize: Int): Posts
    }

    type Badge {
        id: String
        name: String
        image: String
    }

    type Posts {
        edges: [Edge]
        nodes: [Node]
    }

    type Edge {
        node: Post
    }

    type Post {
        title: String
        url: String
        publishedAt: String
    }

    type Node {
        views: Int
    }

`;

// GraphQL query
const USER_QUERY = `
    query User($username: String!) {
        user(username: $username) {
            username
            profilePicture
            badges {
                id
                name
                image
            }
            followersCount
            isPro
            posts(page: 1, pageSize:6) {
                edges {
                    node {
                        title
                        url
                        publishedAt
                    }
                }
                nodes {
                    views
                }
            }    
        }
    }
`;

// resolvers
const resolvers = {
    Query: {
        user: async (_, args) => {
            if (!args.username) {
                throw new Error("Username is required");
            }
            try {
                const response = await axios({
                    url: "https://gql.hashnode.com/",
                    method: "post",
                    data: {
                        query: USER_QUERY,
                        variables: {
                            username: args.username,
                        },
                    },
                });
                return response.data.data.user;
            } catch (error) {
                throw new Error("Server Error: ", error);
            }
        },
    },
};

// server setup
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log("Server ready at port", 4000);
