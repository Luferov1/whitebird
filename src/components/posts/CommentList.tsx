'use client';

import React from 'react';

import { Comment as CommentType } from '../../lib/types';

export default function CommentList({
  apiComments,
  comments,
}: {
  apiComments: CommentType[];
  comments: CommentType[];
}) {
  const merged = [
    ...(apiComments || []),
    ...(comments || []).filter(c => !(apiComments || []).some(ac => ac.id === c.id)),
  ];

  return (
    <ul className="space-y-3">
      {merged.map(c => (
        <li key={c.id} className="p-3 border rounded">
          <div className="text-sm font-medium">
            {c.name} <span className="text-xs text-gray-500">({c.email})</span>
          </div>
          <div className="text-gray-700 mt-1">{c.body}</div>
        </li>
      ))}
    </ul>
  );
}
