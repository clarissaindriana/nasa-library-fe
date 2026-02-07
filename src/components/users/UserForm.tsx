import React from 'react';
import { InputField, SelectField } from '@/components/common';
import { Button } from '@/components/common/Button';
import Link from 'next/link';

type UserFormValues = {
  nis: string;
  nama: string;
  jenisKelamin: string;
  kelas: string;
};

interface UserFormProps {
  values: UserFormValues;
  errors: Partial<Record<keyof UserFormValues, string>>;
  touched: Partial<Record<keyof UserFormValues, boolean>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isSubmitting: boolean;
  isLoading: boolean;
  disableNis?: boolean;
  submitLabel?: string;
  title: string;
  description?: string;
}

export const UserForm: React.FC<UserFormProps> = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  onSubmit,
  isSubmitting,
  isLoading,
  disableNis = false,
  submitLabel = 'Submit',
  title,
  description,
}) => {
  const genderOptions = [
    { value: 'L', label: 'L (Male)' },
    { value: 'P', label: 'P (Female)' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          {description && (
            <p className="mt-2 text-gray-600">{description}</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={onSubmit} className="space-y-6">
            <InputField
              label="NIS (Student ID)"
              name="nis"
              value={values.nis}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.nis}
              touched={touched.nis}
              disabled={disableNis}
              placeholder="Enter student NIS"
              required
            />
            {disableNis && (
              <p className="text-xs text-gray-500">Student ID cannot be changed</p>
            )}

            <InputField
              label="Full Name"
              name="nama"
              value={values.nama}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.nama}
              touched={touched.nama}
              placeholder="Enter full name"
              required
            />

            <SelectField
              label="Gender"
              name="jenisKelamin"
              value={values.jenisKelamin}
              onChange={handleChange}
              onBlur={handleBlur}
              options={genderOptions}
              error={errors.jenisKelamin}
              touched={touched.jenisKelamin}
              placeholder="Select gender"
              required
            />

            <InputField
              label="Class"
              name="kelas"
              value={values.kelas}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.kelas}
              touched={touched.kelas}
              placeholder="Enter class (e.g., 10-A)"
              required
            />

            <div className="flex gap-4">
              <div className="flex-1">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={isSubmitting || isLoading}
                  loading={isSubmitting || isLoading}
                  className="w-full"
                >
                  {submitLabel}
                </Button>
              </div>
              <Link
                href="/users"
                className="flex-1 bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
