import { Comment, Post, User } from './types';

const API_BASE = 'https://jsonplaceholder.typicode.com';

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${API_BASE}/users`);

  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch(`${API_BASE}/posts`);

  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export async function fetchComments(postId: number): Promise<Comment[]> {
  const res = await fetch(`${API_BASE}/comments?postId=${postId}`);

  if (!res.ok) throw new Error('Failed to fetch comments');
  return res.json();
}
