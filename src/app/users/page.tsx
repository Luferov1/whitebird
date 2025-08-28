'use client';

import { useEffect, useState } from 'react';

import UsersList from '../../components/users/UsersList';
import { useAppContext } from '../../context/AppContext';
import { fetchUsers } from '../../lib/api';

export default function UsersPage() {
  const { state, dispatch } = useAppContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (state.users.length === 0) {
      fetchUsers().then(res => {
        dispatch({ type: 'SET_USERS', payload: res });
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [dispatch, state.users.length]);

  if (loading) return <p>Loading users...</p>;

  return <UsersList />;
}
