'use client';

import React, { createContext, ReactNode, useContext, useEffect, useReducer } from 'react';

import { loadFromStorage, saveToStorage } from '../lib/storage';
import { Comment, FavoriteState, LikeState, Post, Priority, User } from '../lib/types';

interface AppState {
  currentUser: User | null;
  users: User[];
  posts: Post[];
  comments: Record<number, Comment[]>;
  likes: LikeState;
  favorites: FavoriteState;
  priorities: Record<number, Priority>;
}

type Action =
  | { type: 'SET_USERS'; payload: User[] }
  | { type: 'SET_CURRENT_USER'; payload: User | null }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'SET_POSTS'; payload: Post[] }
  | { type: 'ADD_POST'; payload: Post }
  | { type: 'REMOVE_POST'; payload: number } // id
  | { type: 'SET_COMMENTS'; postId: number; payload: Comment[] }
  | { type: 'ADD_COMMENT'; postId: number; payload: Comment }
  | { type: 'TOGGLE_LIKE'; postId: number }
  | { type: 'TOGGLE_DISLIKE'; postId: number }
  | { type: 'TOGGLE_FAVORITE'; postId: number }
  | { type: 'SET_PRIORITY'; postId: number; payload: Priority };

const initialState: AppState = {
  currentUser: null,
  users: [],
  posts: [],
  comments: {},
  likes: { likes: new Set(), dislikes: new Set() },
  favorites: { favorites: new Set() },
  priorities: {},
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.payload };

    case 'SET_CURRENT_USER':
      return { ...state, currentUser: action.payload };

    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map(u => (u.id === action.payload.id ? action.payload : u)),
        currentUser: state.currentUser?.id === action.payload.id ? action.payload : state.currentUser,
      };

    case 'SET_POSTS':
      return { ...state, posts: action.payload };

    case 'ADD_POST':
      return { ...state, posts: [action.payload, ...state.posts] };

    case 'REMOVE_POST':
      return {
        ...state,
        posts: state.posts.filter(p => p.id !== action.payload),
      };

    case 'SET_COMMENTS':
      return {
        ...state,
        comments: { ...state.comments, [action.postId]: action.payload },
      };

    case 'ADD_COMMENT':
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.postId]: [...(state.comments[action.postId] || []), action.payload],
        },
      };

    case 'TOGGLE_LIKE': {
      const likes = new Set(state.likes.likes);
      const dislikes = new Set(state.likes.dislikes);

      if (likes.has(action.postId)) {
        likes.delete(action.postId);
      } else {
        likes.add(action.postId);
        dislikes.delete(action.postId);
      }
      return { ...state, likes: { likes, dislikes } };
    }

    case 'TOGGLE_DISLIKE': {
      const likes = new Set(state.likes.likes);
      const dislikes = new Set(state.likes.dislikes);

      if (dislikes.has(action.postId)) {
        dislikes.delete(action.postId);
      } else {
        dislikes.add(action.postId);
        likes.delete(action.postId);
      }
      return { ...state, likes: { likes, dislikes } };
    }

    case 'TOGGLE_FAVORITE': {
      const favorites = new Set(state.favorites.favorites);

      if (favorites.has(action.postId)) {
        favorites.delete(action.postId);
      } else {
        favorites.add(action.postId);
      }
      return { ...state, favorites: { favorites } };
    }

    case 'SET_PRIORITY':
      return {
        ...state,
        priorities: {
          ...state.priorities,
          [action.postId]: action.payload,
        },
      };

    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => {},
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState, init => {
    return {
      ...init,
      currentUser: loadFromStorage<User | null>('currentUser', null),
      users: loadFromStorage<User[]>('users', []),
      posts: loadFromStorage<Post[]>('posts', []),
      comments: loadFromStorage<Record<number, Comment[]>>('comments', {}),
      likes: loadFromStorage<LikeState>('likes', {
        likes: new Set(),
        dislikes: new Set(),
      }),
      favorites: loadFromStorage<FavoriteState>('favorites', {
        favorites: new Set(),
      }),
      priorities: loadFromStorage<Record<number, Priority>>('priorities', {}),
    };
  });

  useEffect(() => {
    saveToStorage('currentUser', state.currentUser);
    saveToStorage('users', state.users);
    saveToStorage('posts', state.posts);
    saveToStorage('comments', state.comments);
    saveToStorage('likes', {
      likes: Array.from(state.likes.likes),
      dislikes: Array.from(state.likes.dislikes),
    });
    saveToStorage('favorites', {
      favorites: Array.from(state.favorites.favorites),
    });
    saveToStorage('priorities', state.priorities);
  }, [state]);

  const fixedState: AppState = {
    ...state,
    likes: {
      likes: state.likes.likes instanceof Set ? state.likes.likes : new Set((state.likes.likes as any) || []),
      dislikes:
        state.likes.dislikes instanceof Set ? state.likes.dislikes : new Set((state.likes.dislikes as any) || []),
    },
    favorites: {
      favorites:
        state.favorites.favorites instanceof Set
          ? state.favorites.favorites
          : new Set((state.favorites.favorites as any) || []),
    },
  };

  return <AppContext.Provider value={{ state: fixedState, dispatch }}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
