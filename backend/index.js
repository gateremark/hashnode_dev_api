import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import axios from "axios";

// GraphQL schema
const typeDefs = `#graphql
    type Query {
        publication(host: String): Publication
    }

    type Publication {
        isTeam: Boolean
        title: String
        about: About
        posts(first: Int): Edge
    }

    type About {
        markdown: String
    }

    type Edge {
        edges: [Node]
    }

    type Node {
        node: Post
    }

    type Post {
        title: String
        coverImage: ImageURL
        brief: String
        url: String
        views: String
    }

    type ImageURL {
        url: String
    }
`;

// resolvers
const resolvers = {
    Query: {
        publication: async (_, args) => {
            // console.log("args", args);
            try {
                const response = await axios({
                    url: "https://gql.hashnode.com/",
                    method: "post",
                    data: {
                        query: `
                            query Publication {
                                publication(host: "${args.host}") {
                                    isTeam
                                    title
                                    about {
                                        markdown
                                    }
                                    posts(first: 10) {
                                        edges {
                                            node {
                                                title
                                                coverImage {
                                                    url
                                                }
                                                brief
                                                url
                                                views
                                            }
                                        }
                                    }
                                }
                            }
                        `,
                    },
                });
                return response.data.data.publication;
            } catch (error) {
                throw new Error(error);
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
