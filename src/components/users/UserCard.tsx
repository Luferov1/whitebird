'use client';

import { useAppContext } from '../../context/AppContext';
import { User } from '../../lib/types';

export default function UserCard({ user }: { user: User }) {
  const { state, dispatch } = useAppContext();

  const isCurrent = state.currentUser?.id === user.id;

  const handleSelect = () => {
    dispatch({ type: 'SET_CURRENT_USER', payload: user });
  };

  return (
    <div className="border rounded-xl p-4 bg-white shadow-sm flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-semibold">{user.name}</h2>
        <p className="text-sm text-gray-600">@{user.username}</p>
        <p className="text-sm text-gray-600">{user.email}</p>
        <p className="text-sm text-gray-600">{user.phone}</p>
        <p className="text-sm text-gray-600">{user.website}</p>
      </div>

      <button
        onClick={handleSelect}
        disabled={isCurrent}
        className={`mt-4 px-3 py-1 rounded-lg text-sm font-medium transition ${
          isCurrent ? 'bg-green-500 text-white cursor-default' : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        {isCurrent ? 'Current User' : 'Select as Current'}
      </button>
    </div>
  );
}
