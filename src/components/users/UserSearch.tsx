'use client';

import React from 'react';

export interface UserFilters {
  nama: string;
  nis: string;
  kelas: string;
  jenisKelamin: string;
}

interface UserSearchProps {
  filters: UserFilters;
  onFiltersChange: (filters: UserFilters) => void;
  resultCount: number;
  totalCount: number;
  availableClasses: string[];
}

export const UserSearch: React.FC<UserSearchProps> = ({
  filters,
  onFiltersChange,
  resultCount,
  totalCount,
  availableClasses,
}) => {
  const handleFilterChange = (key: keyof UserFilters, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleReset = () => {
    onFiltersChange({ nama: '', nis: '', kelas: '', jenisKelamin: '' });
  };

  const hasActiveFilters = Object.values(filters).some((v) => v !== '');

  return (
    <div className="mb-6 space-y-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Name Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Filter by name..."
              value={filters.nama}
              onChange={(e) => handleFilterChange('nama', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* NIS Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              NIS
            </label>
            <input
              type="text"
              placeholder="Filter by NIS..."
              value={filters.nis}
              onChange={(e) => handleFilterChange('nis', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Class Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Class
            </label>
            <select
              value={filters.kelas}
              onChange={(e) => handleFilterChange('kelas', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="">All Classes</option>
              {availableClasses.map((kelas) => (
                <option key={kelas} value={kelas}>
                  {kelas}
                </option>
              ))}
            </select>
          </div>

          {/* Gender Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              value={filters.jenisKelamin}
              onChange={(e) => handleFilterChange('jenisKelamin', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="">All Genders</option>
              <option value="L">L (Male)</option>
              <option value="P">P (Female)</option>
            </select>
          </div>
        </div>

        {/* Reset Button */}
        {hasActiveFilters && (
          <div className="mt-4">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition text-sm font-medium"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      <div className="text-sm text-gray-600">
        Showing {resultCount} of {totalCount} users
      </div>
    </div>
  );
};

export default UserSearch;
