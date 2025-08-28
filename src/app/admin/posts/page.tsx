'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useAppContext } from '@/src/context/AppContext';
import { fetchPosts } from '@/src/lib/api';

import AdminPostCard from '../../../components/admin/AdminPostCard';

export default function AdminPostsPage() {
  const { state, dispatch } = useAppContext();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const currentUser = state.currentUser;

  useEffect(() => {
    if (!currentUser) {
      router.push('/profile');
    } else if (!currentUser.isAdmin) {
      router.push('/profile');
    }
  }, [currentUser, router]);

  useEffect(() => {
    fetchPosts().then(apiPosts => {
      const merged = [...apiPosts, ...state.posts.filter(p => p.isLocal)];

      dispatch({ type: 'SET_POSTS', payload: merged });
      setLoading(false);
    });
  }, [dispatch, state.posts]);

  if (loading) return <p>Loading posts...</p>;

  const sorted = [...state.posts].sort((a, b) => {
    const pa = state.priorities[a.id] ?? a.priority ?? 0;
    const pb = state.priorities[b.id] ?? b.priority ?? 0;

    return pb - pa;
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Admin: Manage Posts</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map(post => (
          <AdminPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
