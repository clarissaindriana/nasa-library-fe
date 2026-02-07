import React from 'react';
import { User } from '@/types/user.types';
import Link from 'next/link';
import { Loading } from '@/components/common/LoadingSpinner';

interface UserDetailProps {
  user: User | null;
  isLoading: boolean;
}

export const UserDetail: React.FC<UserDetailProps> = ({
  user,
  isLoading,
}) => {
  if (isLoading) {
    return <Loading message="Loading user..." fullScreen />;
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">User not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link
            href="/users"
            className="text-blue-600 hover:text-blue-900 mb-4 inline-block"
          >
            ← Back to Users
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">User Details</h1>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DetailField label="Student ID" value={user.nis} />
            <DetailField label="Full Name" value={user.nama} />
            <DetailField label="Gender" value={user.jenisKelamin} />
            <DetailField label="Class" value={user.kelas} />
            <DetailField
              label="Created At"
              value={new Date(user.createdAt).toLocaleDateString()}
            />
            <DetailField
              label="Updated At"
              value={new Date(user.updatedAt).toLocaleDateString()}
            />

            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Status
              </h3>
              <p className="mt-1 text-lg font-medium">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    user.isDeleted
                      ? 'bg-red-100 text-red-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {user.isDeleted ? 'Inactive' : 'Active'}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <Link
              href={`/users/${user.nis}/edit`}
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Edit User
            </Link>
            <Link
              href="/users"
              className="inline-block bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Back to List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

interface DetailFieldProps {
  label: string;
  value: string;
}

const DetailField: React.FC<DetailFieldProps> = ({ label, value }) => (
  <div>
    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
      {label}
    </h3>
    <p className="mt-1 text-lg font-medium text-gray-900">{value}</p>
  </div>
);

export default UserDetail;
