'use client';

import { useEffect, useState } from 'react';

import CreatePostModal from '../../components/posts/CreatePostModal';
import PostCard from '../../components/posts/PostCard';
import { useAppContext } from '../../context/AppContext';
import { fetchPosts } from '../../lib/api';
import { User } from '../../lib/types';

export default function PostsPage() {
  const { state, dispatch } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterUser, setFilterUser] = useState<number | 'all'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (state.posts.length === 0) {
      fetchPosts().then(apiPosts => {
        dispatch({ type: 'SET_POSTS', payload: apiPosts });
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [dispatch, state.posts.length]);

  if (loading) return <p>Loading posts...</p>;

  let posts = [...state.posts];

  if (filterUser !== 'all') {
    posts = posts.filter(p => p.userId === filterUser);
  }

  if (search.trim()) {
    posts = posts.filter(
      p => p.title.toLowerCase().includes(search.toLowerCase()) || p.body.toLowerCase().includes(search.toLowerCase())
    );
  }

  posts.sort((a, b) => (state.priorities[b.id] ?? b.priority ?? 0) - (state.priorities[a.id] ?? a.priority ?? 0));

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Posts</h1>

      {/* фильтры */}
      <div className="flex flex-col md:flex-row gap-2 items-center">
        <input
          type="text"
          placeholder="Search by title or body..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border rounded p-2 w-full md:w-1/2"
        />

        <select
          value={filterUser}
          onChange={e => setFilterUser(e.target.value === 'all' ? 'all' : Number(e.target.value))}
          className="border rounded p-2"
        >
          <option value="all">All Users</option>
          {state.users.map((u: User) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>

        {state.currentUser && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Create Post
          </button>
        )}
      </div>

      <div className="grid gap-4">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {isModalOpen && <CreatePostModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
