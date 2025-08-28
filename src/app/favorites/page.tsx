'use client';

import { useMemo } from 'react';

import PostCard from '../../components/posts/PostCard';
import { useAppContext } from '../../context/AppContext';

export default function FavoritesPage() {
  const { state } = useAppContext();
  const currentUser = state.currentUser;

  const favIds = state.favorites.favorites ? Array.from(state.favorites.favorites) : [];

  const favoritesPosts = useMemo(() => {
    return state.posts
      .filter(p => favIds.includes(p.id))
      .sort((a, b) => (state.priorities[b.id] ?? b.priority ?? 0) - (state.priorities[a.id] ?? a.priority ?? 0));
  }, [state.posts, state.priorities, favIds]);

  if (!currentUser) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Favorites</h1>
        <p className="text-gray-600 mt-2">
          Select a user first in <b>Users</b> to see personalized favorites.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Favorites</h1>

      {favoritesPosts.length === 0 ? (
        <div className="text-gray-500">You don&#39;t have favorite posts yet.</div>
      ) : (
        <div className="grid gap-4">
          {favoritesPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
