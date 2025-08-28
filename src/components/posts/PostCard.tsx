'use client';

import Link from 'next/link';

import { useAppContext } from '../../context/AppContext';
import { Post } from '../../lib/types';

export default function PostCard({ post }: { post: Post }) {
  const { state, dispatch } = useAppContext();
  const currentUser = state.currentUser;

  const isLiked = state.likes.likes.has(post.id);
  const isDisliked = state.likes.dislikes.has(post.id);
  const isFav = state.favorites.favorites.has(post.id);

  const toggleLike = () => {
    dispatch({ type: 'TOGGLE_LIKE', postId: post.id });
  };

  const toggleDislike = () => {
    dispatch({ type: 'TOGGLE_DISLIKE', postId: post.id });
  };

  const toggleFav = () => {
    dispatch({ type: 'TOGGLE_FAVORITE', postId: post.id });
  };

  const deletePost = () => {
    dispatch({ type: 'REMOVE_POST', payload: post.id });
  };

  return (
    <div className="border rounded p-4 shadow">
      <Link href={`/posts/${post.id}`}>
        <h2 className="font-semibold text-lg">{post.title}</h2>
      </Link>
      <p className="text-gray-700">{post.body}</p>

      <div className="flex gap-2 mt-3">
        <button
          onClick={toggleLike}
          className={`px-3 py-1 rounded ${isLiked ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
        >
          👍
        </button>
        <button
          onClick={toggleDislike}
          className={`px-3 py-1 rounded ${isDisliked ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
        >
          👎
        </button>
        <button onClick={toggleFav} className={`px-3 py-1 rounded ${isFav ? 'bg-yellow-400' : 'bg-gray-200'}`}>
          ⭐
        </button>
      </div>

      {post.userId === currentUser?.id && post.isLocal && (
        <button onClick={deletePost} className="mt-2 px-3 py-1 rounded bg-red-500 text-white">
          Delete
        </button>
      )}
    </div>
  );
}
