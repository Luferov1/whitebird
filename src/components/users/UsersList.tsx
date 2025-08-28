'use client';

import { useEffect, useMemo, useState } from 'react';

import { useAppContext } from '../../context/AppContext';
import { User } from '../../lib/types';
import UserCard from './UserCard';

export default function UsersList({ initialUsers }: { initialUsers: User[] }) {
  const { state, dispatch } = useAppContext();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.toLowerCase();

    return initialUsers.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
  }, [query, initialUsers]);

  useEffect(() => {
    if (state.users.length === 0 && initialUsers.length > 0) {
      dispatch({ type: 'SET_USERS', payload: initialUsers });
    }
  }, [dispatch, initialUsers, state.users.length]);

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
