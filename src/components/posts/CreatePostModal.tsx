'use client';

import { useState } from 'react';

import { useAppContext } from '../../context/AppContext';
import { Post } from '../../lib/types';

export default function CreatePostModal({ onClose }: { onClose: () => void }) {
  const { state, dispatch } = useAppContext();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = () => {
    if (!state.currentUser) {
      alert('Select a user first!');

      return;
    }
    const newPost: Post = {
      id: Date.now(),
      userId: state.currentUser.id,
      title,
      body,
      isLocal: true,
      priority: 0,
    };

    dispatch({ type: 'ADD_POST', payload: newPost });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded p-6 w-full max-w-md space-y-4 shadow-lg">
        <h2 className="text-lg font-bold">Create Post</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full border rounded p-2"
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={e => setBody(e.target.value)}
          className="w-full border rounded p-2"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
