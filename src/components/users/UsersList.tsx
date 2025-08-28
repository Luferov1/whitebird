'use client';

import { useMemo, useState } from 'react';

import { useAppContext } from '../../context/AppContext';
import UserCard from './UserCard';

export default function UsersList() {
  const { state } = useAppContext();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.toLowerCase();

    return state.users.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
  }, [query, state.users]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Users</h1>

      <input
        type="text"
        placeholder="Search by name or email..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="w-full p-2 border rounded-lg"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {filtered.length === 0 && <p className="text-gray-500">No users found.</p>}
    </div>
  );
}
