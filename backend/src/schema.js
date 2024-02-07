import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    getHashnodeUser(username: String!): User # This is the query that will be used to get the user data from the Hashnode API
  }

  type User {
    username: String
    profilePicture: String
    badges: [Badge]
    followersCount: Int
    isPro: Boolean
    posts(page: Int, pageSize: Int): Posts
    tagsFollowing: [Tags]
    location: String
    socialMediaLinks: SocialMediaLinks
  }

  type Badge {
    id: String
    name: String
    image: String
  }

  type Posts {
    edges: [Edge]
  }

  type Edge {
    node: Post
  }

  type Post {
    title: String
    url: String
    publishedAt: String
  }

  type Tags {
    name: String
    logo: String
  }

  type SocialMediaLinks {
    github: String
    twitter: String
  }
`;
