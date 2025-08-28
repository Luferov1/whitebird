'use client';

import { ChangeEvent, useState } from 'react';

import { useAppContext } from '../../context/AppContext';
import { User } from '../../lib/types';

export default function ProfilePage() {
  const { state, dispatch } = useAppContext();
  const user = state.currentUser;

  const [form, setForm] = useState<User | null>(user);

  if (!user) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold mb-2">Profile</h1>
        <p className="text-gray-600">
          No user selected. Please go to <b>Users</b> and choose one.
        </p>
      </div>
    );
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>, field: string, nested?: string) => {
    if (!form) return;

    if (nested) {
      setForm({
        ...form,
        address: {
          ...form.address,
          [nested]: e.target.value,
        },
      });
    } else {
      setForm({
        ...form,
        [field]: e.target.value,
      });
    }
  };

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    if (!form) return;

    setForm({ ...form, isAdmin: e.target.checked });
  };

  const handleSave = () => {
    if (!form) return;

    dispatch({ type: 'UPDATE_USER', payload: form });
    dispatch({ type: 'SET_CURRENT_USER', payload: form });
    alert('Profile saved!');
  };

  return (
    <div className="space-y-4 max-w-lg">
      <h1 className="text-2xl font-bold">Profile</h1>

      <label className="block">
        <span className="text-sm">Name</span>
        <input
          type="text"
          value={form?.name || ''}
          onChange={e => handleChange(e, 'name')}
          className="w-full border rounded p-2"
        />
      </label>

      <label className="block">
        <span className="text-sm">Email</span>
        <input
          type="email"
          value={form?.email || ''}
          onChange={e => handleChange(e, 'email')}
          className="w-full border rounded p-2"
        />
      </label>

      <label className="block">
        <span className="text-sm">Phone</span>
        <input
          type="text"
          value={form?.phone || ''}
          onChange={e => handleChange(e, 'phone')}
          className="w-full border rounded p-2"
        />
      </label>

      <label className="block">
        <span className="text-sm">Website</span>
        <input
          type="text"
          value={form?.website || ''}
          onChange={e => handleChange(e, 'website')}
          className="w-full border rounded p-2"
        />
      </label>

      <fieldset className="border p-3 rounded">
        <legend className="text-sm font-semibold">Address</legend>
        <label className="block">
          <span className="text-sm">Street</span>
          <input
            type="text"
            value={form?.address.street || ''}
            onChange={e => handleChange(e, 'address', 'street')}
            className="w-full border rounded p-2"
          />
        </label>
        <label className="block">
          <span className="text-sm">Suite</span>
          <input
            type="text"
            value={form?.address.suite || ''}
            onChange={e => handleChange(e, 'address', 'suite')}
            className="w-full border rounded p-2"
          />
        </label>
        <label className="block">
          <span className="text-sm">City</span>
          <input
            type="text"
            value={form?.address.city || ''}
            onChange={e => handleChange(e, 'address', 'city')}
            className="w-full border rounded p-2"
          />
        </label>
        <label className="block">
          <span className="text-sm">Zipcode</span>
          <input
            type="text"
            value={form?.address.zipcode || ''}
            onChange={e => handleChange(e, 'address', 'zipcode')}
            className="w-full border rounded p-2"
          />
        </label>
      </fieldset>

      <label className="flex items-center gap-2">
        <input type="checkbox" checked={form?.isAdmin || false} onChange={handleCheckbox} />
        <span>This user is Admin</span>
      </label>

      <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Save
      </button>
    </div>
  );
}
