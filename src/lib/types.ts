export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: Address;
  company: Company;
  isAdmin?: boolean;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
  isLocal?: boolean;
  priority?: number;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
  isLocal?: boolean;
}

export type Priority = number;

export interface LikeState {
  likes: Set<number>;
  dislikes: Set<number>;
}

export interface FavoriteState {
  favorites: Set<number>;
}
