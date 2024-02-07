export interface Badge {
  id: string;
  name: string;
  image: string;
}

export interface Post {
  title: string;
  url: string;
  publishedAt: string;
}

export interface Edge {
  node: Post;
}

export interface Posts {
  edges: Edge[];
}

export interface Tags {
  name: string;
  logo: string;
}

export interface SocialMediaLinks {
  github: string;
  twitter: string;
}

export interface User {
  username: string;
  profilePicture: string;
  badges: Badge[];
  followersCount: number;
  isPro: boolean;
  posts: Posts;
  tagsFollowing: Tags[];
  location: string;
  socialMediaLinks: SocialMediaLinks;
}

export interface UserQueryResponse {
  user: User;
}
