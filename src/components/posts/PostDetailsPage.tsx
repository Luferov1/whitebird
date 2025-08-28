'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useAppContext } from '@/src/context/AppContext';
import { fetchComments } from '@/src/lib/api';
import { Post, User } from '@/src/lib/types';

import CommentForm from './CommentForm';
import CommentList from './CommentList';

export default function PostDetailsPage({ postId }: { postId: number }) {
  const { state, dispatch } = useAppContext();
  const router = useRouter();

  const [loadingComments, setLoadingComments] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const post: Post | undefined = state.posts.find(p => p.id === postId);
  const author: User | undefined = state.users.find(u => u.id === post?.userId);

  useEffect(() => {
    if (!postId || !post) return;

    if (post.isLocal) return;

    if (state.comments[postId] && state.comments[postId].length > 0) return;

    setLoadingComments(true);
    fetchComments(postId)
      .then(apiComments => {
        dispatch({ type: 'SET_COMMENTS', postId, payload: apiComments });
        setLoadingComments(false);
      })
      .catch(() => {
        setError('Failed to load comments');
        setLoadingComments(false);
      });
  }, [postId, post, state.comments, dispatch]);

  if (!post) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Post not found</h1>
        <p className="mt-2 text-gray-600">
          This post is not available. Go back to{' '}
          <button onClick={() => router.push('/posts')} className="text-blue-600 underline">
            posts
          </button>
          .
        </p>
      </div>
    );
  }

  const isLiked = state.likes.likes.has(post.id);
  const isDisliked = state.likes.dislikes.has(post.id);
  const isFav = state.favorites.favorites.has(post.id);

  const toggleLike = () => dispatch({ type: 'TOGGLE_LIKE', postId: post.id });
  const toggleDislike = () => dispatch({ type: 'TOGGLE_DISLIKE', postId: post.id });
  const toggleFav = () => dispatch({ type: 'TOGGLE_FAVORITE', postId: post.id });

  const localComments = state.comments[postId] || [];

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="bg-white border rounded p-6 shadow-sm">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">{post.title}</h1>
            <p className="text-gray-700">{post.body}</p>
            <div className="mt-3 text-sm text-gray-600">
              <span>Author: </span>
              {author ? (
                <span className="font-medium">
                  {author.name} ({author.email})
                </span>
              ) : (
                <span className="italic">Unknown</span>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="flex gap-2">
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
            <div className="text-xs text-gray-500">post id: {post.id}</div>
          </div>
        </div>
      </div>

      <section className="bg-white border rounded p-4 shadow-sm">
        <h2 className="text-lg font-semibold mb-3">Comments</h2>

        {loadingComments && <p className="text-gray-500">Loading comments...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <CommentList comments={localComments} apiComments={state.comments[postId] || []} />

        {localComments.length === 0 && !loadingComments && !error && (
          <p className="text-gray-500 italic">No comments yet</p>
        )}

        <div className="mt-4">
          <CommentForm
            postId={postId}
            onAdd={c => {
              dispatch({ type: 'ADD_COMMENT', postId, payload: c });
            }}
          />
        </div>
      </section>
    </div>
  );
}
