'use client';

import React from 'react';
import { User } from '@/types/user.types';
import Link from 'next/link';
import { Loading } from '@/components/common/LoadingSpinner';

interface UserTableProps {
  users: User[];
  onDelete: (nis: string) => Promise<void>;
  deletingNis: string | null;
  isLoading: boolean;
  groupByClass?: boolean;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  onDelete,
  deletingNis,
  isLoading,
  groupByClass = true,
}) => {
  if (isLoading) {
    return <Loading message="Loading users..." />;
  }

  if (users.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-gray-500">No users found</p>
      </div>
    );
  }

  // Group users by class
  const groupedUsers = groupByClass
    ? users.reduce(
        (acc, user) => {
          if (!acc[user.kelas]) {
            acc[user.kelas] = [];
          }
          acc[user.kelas].push(user);
          return acc;
        },
        {} as Record<string, User[]>
      )
    : { All: users };

  // Sort classes naturally (X 1, X 2, etc.)
  const sortedClasses = Object.keys(groupedUsers).sort((a, b) => {
    const aNum = parseInt(a.match(/\d+/)?.[0] || '0');
    const bNum = parseInt(b.match(/\d+/)?.[0] || '0');
    const aPrefix = a.replace(/\d+/g, '').trim();
    const bPrefix = b.replace(/\d+/g, '').trim();
    
    if (aPrefix !== bPrefix) {
      return aPrefix.localeCompare(bPrefix);
    }
    return aNum - bNum;
  });

  return (
    <div className="space-y-6">
      {sortedClasses.map((kelas) => (
        <div key={kelas} className="bg-white rounded-lg shadow overflow-hidden">
          {/* Class Header */}
          {groupByClass && (
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-white bg-opacity-20 rounded-full mr-3">
                  {groupedUsers[kelas].length}
                </span>
                Class {kelas}
              </h3>
            </div>
          )}

          {/* Table */}
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  NIS
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Gender
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Class
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {groupedUsers[kelas].map((user) => (
                <tr key={user.nis} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.nis}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.nama}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.jenisKelamin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.kelas}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <Link
                      href={`/users/${user.nis}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </Link>
                    <Link
                      href={`/users/${user.nis}/edit`}
                      className="text-green-600 hover:text-green-900"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => onDelete(user.nis)}
                      disabled={deletingNis === user.nis}
                      className="text-red-600 hover:text-red-900 disabled:opacity-50"
                    >
                      {deletingNis === user.nis ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default UserTable;
