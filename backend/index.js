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
    name: String
    profilePicture: String
    bio: Bio
    socialMediaLinks: SocialMediaLinks
    badges: [Badge]
    followersCount: Int
    followingsCount: Int
    dateJoined: String
    isPro: Boolean
    }

    type Bio {
        markdown: String
        html: String
        text: String
    }

    type SocialMediaLinks {
        website: String
        github: String
        twitter: String
        instagram: String
        facebook: String
        stackoverflow: String
        linkedin: String
        youtube: String
    }

    type Badge {
        id: String
        name: String
        description: String
        image: String
        dateAssigned: String
        infoURL: String
        suppressed: Boolean
    }

`;

// GraphQL query
const USER_QUERY = `
    query User($username: String!) {
        user(username: $username) {
            username
            name
            profilePicture
            bio {
                markdown
                html
                text
            }
            socialMediaLinks {
                website
                github
                twitter
                instagram
                facebook
                stackoverflow
                linkedin
                youtube
            }
            badges {
                id
                name
                description
                image
                dateAssigned
                infoURL
                suppressed
            }
            followersCount
            followingsCount
            dateJoined
            isPro    
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
