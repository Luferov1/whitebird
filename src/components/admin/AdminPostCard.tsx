'use client';

import Link from 'next/link';

import { useAppContext } from '../../context/AppContext';
import { Post } from '../../lib/types';

export default function AdminPostCard({ post }: { post: Post }) {
  const { state, dispatch } = useAppContext();

  const priority = state.priorities[post.id] ?? post.priority ?? 0;

  const increasePriority = () => {
    dispatch({ type: 'SET_PRIORITY', postId: post.id, payload: priority + 1 });
  };

  const decreasePriority = () => {
    dispatch({ type: 'SET_PRIORITY', postId: post.id, payload: priority - 1 });
  };

  const setPriority = (val: number) => {
    dispatch({ type: 'SET_PRIORITY', postId: post.id, payload: val });
  };

  return (
    <div className="border rounded p-4 shadow">
      <Link href={`/posts/${post.id}`}>
        <h2 className="font-semibold text-lg">{post.title}</h2>
      </Link>
      <p className="text-gray-700">{post.body}</p>

      <div className="flex items-center gap-2 mt-3">
        <button onClick={increasePriority} className="px-3 py-1 rounded bg-green-500 text-white">
          ⬆
        </button>
        <button onClick={decreasePriority} className="px-3 py-1 rounded bg-red-500 text-white">
          ⬇
        </button>
        <input
          type="number"
          value={priority}
          onChange={e => setPriority(parseInt(e.target.value) || 0)}
          className="w-20 p-1 border rounded"
        />
      </div>
    </div>
  );
}
