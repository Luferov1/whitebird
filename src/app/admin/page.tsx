'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';

import { useAppContext } from '../../context/AppContext';
import { User } from '../../lib/types';

export default function AdminPage() {
  const { state, dispatch } = useAppContext();
  const router = useRouter();
  const currentUser = state.currentUser;

  const [editingUsers, setEditingUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!currentUser) {
      router.push('/profile');
    } else if (!currentUser.isAdmin) {
      router.push('/profile');
    }
  }, [currentUser, router]);

  useEffect(() => {
    setEditingUsers(state.users);
  }, [state.users]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, id: number, field: keyof User, nested?: string) => {
    setEditingUsers(prev =>
      prev.map(u => {
        if (u.id !== id) return u;

        if (nested && typeof u.address === 'object') {
          return {
            ...u,
            address: {
              ...u.address,
              [nested]: e.target.value,
            },
          };
        }

        return {
          ...u,
          [field]: e.target.value,
        };
      })
    );
  };

  const handleSave = (user: User) => {
    dispatch({ type: 'UPDATE_USER', payload: user });
    alert(`User ${user.name} saved!`);
  };

  if (!currentUser?.isAdmin) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <p className="text-red-600 mt-2">Access denied. Admins only.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Panel</h1>

      <button
        onClick={() => router.push('/admin/posts')}
        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
      >
        Edit Posts
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Website</th>
              <th className="p-2 border">Street</th>
              <th className="p-2 border">Suite</th>
              <th className="p-2 border">City</th>
              <th className="p-2 border">Zipcode</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {editingUsers.map(user => (
              <tr key={user.id} className="odd:bg-white even:bg-gray-50">
                <td className="p-2 border">
                  <input
                    value={user.name}
                    onChange={e => handleChange(e, user.id, 'name')}
                    className="w-full border rounded px-2 py-1"
                  />
                </td>
                <td className="p-2 border">
                  <input
                    value={user.email}
                    onChange={e => handleChange(e, user.id, 'email')}
                    className="w-full border rounded px-2 py-1"
                  />
                </td>
                <td className="p-2 border">
                  <input
                    value={user.phone}
                    onChange={e => handleChange(e, user.id, 'phone')}
                    className="w-full border rounded px-2 py-1"
                  />
                </td>
                <td className="p-2 border">
                  <input
                    value={user.website}
                    onChange={e => handleChange(e, user.id, 'website')}
                    className="w-full border rounded px-2 py-1"
                  />
                </td>
                <td className="p-2 border">
                  <input
                    value={user.address.street}
                    onChange={e => handleChange(e, user.id, 'address', 'street')}
                    className="w-full border rounded px-2 py-1"
                  />
                </td>
                <td className="p-2 border">
                  <input
                    value={user.address.suite}
                    onChange={e => handleChange(e, user.id, 'address', 'suite')}
                    className="w-full border rounded px-2 py-1"
                  />
                </td>
                <td className="p-2 border">
                  <input
                    value={user.address.city}
                    onChange={e => handleChange(e, user.id, 'address', 'city')}
                    className="w-full border rounded px-2 py-1"
                  />
                </td>
                <td className="p-2 border">
                  <input
                    value={user.address.zipcode}
                    onChange={e => handleChange(e, user.id, 'address', 'zipcode')}
                    className="w-full border rounded px-2 py-1"
                  />
                </td>
                <td className="p-2 border text-center">
                  <button
                    onClick={() => handleSave(user)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
