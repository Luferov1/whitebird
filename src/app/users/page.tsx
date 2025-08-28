'use client';

import { useEffect, useState } from 'react';

import UsersList from '../../components/users/UsersList';
import { fetchUsers } from '../../lib/api';
import { User } from '../../lib/types';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers().then(res => {
      setUsers(res);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading users...</p>;

  return <UsersList initialUsers={users} />;
}
