'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import { UserDetail } from '@/components/users';

export default function UserDetailPage() {
  const params = useParams();
  const nis = params.nis as string;
  const { currentUser, loading, getUserByNis } = useUser();

  useEffect(() => {
    if (nis) {
      getUserByNis(nis);
    }
  }, [nis, getUserByNis]);

  return <UserDetail user={currentUser} isLoading={loading} />;

}
