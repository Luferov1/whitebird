'use client';

import { useAppContext } from '../../context/AppContext';
import { Post } from '../../lib/types';

export default function PostCard({ post }: { post: Post }) {
  const { state, dispatch } = useAppContext();
  const currentUser = state.currentUser;

  const isLiked = state.likes.likes.has(post.id);
  const isDisliked = state.likes.dislikes.has(post.id);
  const isFav = state.favorites.favorites.has(post.id);

  const priority = state.priorities[post.id] ?? post.priority ?? 0;

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

  const increasePriority = () => {
    dispatch({
      type: 'SET_PRIORITY',
      postId: post.id,
      payload: priority + 1,
    });
  };

  return (
    <div className="border rounded p-4 shadow">
      <h2 className="font-semibold text-lg">{post.title}</h2>
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
        <button onClick={increasePriority} className="px-3 py-1 rounded bg-purple-500 text-white">
          ⬆ Priority ({priority})
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
