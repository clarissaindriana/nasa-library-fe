'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import { useForm } from '@/hooks/useForm';
import { UpdateUserRequest } from '@/types/user.types';
import { UserForm } from '@/components/users';
import { Loading } from '@/components/common/LoadingSpinner';

export default function EditUserPage() {
  const params = useParams();
  const router = useRouter();
  const nis = params.nis as string;
  const { currentUser, loading, getUserByNis, updateUser } = useUser();

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
  } = useForm<UpdateUserRequest>(
    {
      nis: '',
      nama: '',
      jenisKelamin: '',
      kelas: '',
    },
    async (formValues) => {
      try {
        await updateUser(formValues);
        router.push(`/users/${nis}`);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  );

  useEffect(() => {
    if (nis) {
      getUserByNis(nis);
    }
  }, [nis, getUserByNis]);

  useEffect(() => {
    if (currentUser) {
      setValues({
        nis: currentUser.nis,
        nama: currentUser.nama,
        jenisKelamin: currentUser.jenisKelamin,
        kelas: currentUser.kelas,
      });
    }
  }, [currentUser, setValues]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmit(e);
  };

  if (loading && !currentUser) {
    return <Loading message="Loading user..." fullScreen />;
  }

  if (!currentUser && !loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">User not found</div>
      </div>
    );
  }

  return (
    <UserForm
      values={values}
      errors={errors}
      touched={touched}
      handleChange={handleChange}
      handleBlur={handleBlur}
      onSubmit={handleFormSubmit}
      isSubmitting={isSubmitting}
      isLoading={loading}
      disableNis={true}
      title="Edit User"
      description="Update user information"
      submitLabel="Update User"
    />
  );
}
