'use client';

import React, { useState } from 'react';

import { Comment as CommentType } from '../../lib/types';

export default function CommentForm({ postId, onAdd }: { postId: number; onAdd: (c: CommentType) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !body.trim()) {
      alert('Please fill name, email and comment');

      return;
    }

    const newComment: CommentType = {
      id: Date.now(),
      postId,
      name,
      email,
      body,
      isLocal: true,
    };

    onAdd(newComment);

    setName('');
    setEmail('');
    setBody('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <input
          className="border rounded p-2"
          placeholder="Your name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          className="border rounded p-2"
          placeholder="Your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <textarea
        className="border rounded p-2 w-full"
        placeholder="Comment..."
        rows={4}
        value={body}
        onChange={e => setBody(e.target.value)}
      />
      <div className="flex justify-end">
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Add comment
        </button>
      </div>
    </form>
  );
}
