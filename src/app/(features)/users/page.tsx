'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useUser } from '@/hooks/useUser';
import { User } from '@/types/user.types';
import { UserTable, UserSearch } from '@/components/users';
import { UserFilters } from '@/components/users/UserSearch';
import { ErrorMessage } from '@/components/common';
import { Loading } from '@/components/common/LoadingSpinner';
import Link from 'next/link';

export default function UserListPage() {
  const { users, loading, error, getAllUsers, deleteUser, clearError } = useUser();
  const [filters, setFilters] = useState<UserFilters>({
    nama: '',
    nis: '',
    kelas: '',
    jenisKelamin: '',
  });
  const [deletingNis, setDeletingNis] = useState<string | null>(null);

  useEffect(() => {
    getAllUsers(false);
  }, [getAllUsers]);

  // Get unique classes from users
  const availableClasses = useMemo(() => {
    const classes = Array.from(new Set(users.map((u) => u.kelas)));
    return classes.sort((a, b) => {
      const aNum = parseInt(a.match(/\d+/)?.[0] || '0');
      const bNum = parseInt(b.match(/\d+/)?.[0] || '0');
      const aPrefix = a.replace(/\d+/g, '').trim();
      const bPrefix = b.replace(/\d+/g, '').trim();
      
      if (aPrefix !== bPrefix) {
        return aPrefix.localeCompare(bPrefix);
      }
      return aNum - bNum;
    });
  }, [users]);

  // Apply all filters
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesName = user.nama
        .toLowerCase()
        .includes(filters.nama.toLowerCase());
      const matchesNis = user.nis.includes(filters.nis);
      const matchesKelas =
        filters.kelas === '' || user.kelas === filters.kelas;
      const matchesGender =
        filters.jenisKelamin === '' || user.jenisKelamin === filters.jenisKelamin;

      return matchesName && matchesNis && matchesKelas && matchesGender;
    });
  }, [users, filters]);

  const handleDelete = async (nis: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setDeletingNis(nis);
      try {
        await deleteUser(nis);
      } finally {
        setDeletingNis(null);
      }
    }
  };

  if (loading && users.length === 0) {
    return <Loading message="Loading users..." fullScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
          <Link
            href="/users/create"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add New User
          </Link>
        </div>

        {error && <ErrorMessage message={error} onDismiss={clearError} />}

        <UserSearch
          filters={filters}
          onFiltersChange={setFilters}
          resultCount={filteredUsers.length}
          totalCount={users.length}
          availableClasses={availableClasses}
        />

        <UserTable
          users={filteredUsers}
          onDelete={handleDelete}
          deletingNis={deletingNis}
          isLoading={loading}
          groupByClass={true}
        />
      </div>
    </div>
  );
}
