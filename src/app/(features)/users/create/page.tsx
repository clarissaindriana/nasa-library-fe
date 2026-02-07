'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import { useForm } from '@/hooks/useForm';
import { CreateUserRequest } from '@/types/user.types';
import { UserForm } from '@/components/users';

export default function CreateUserPage() {
  const router = useRouter();
  const { createUser, loading } = useUser();
  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } =
    useForm<CreateUserRequest>(
    {
      nis: '',
      nama: '',
      jenisKelamin: '',
      kelas: '',
    },
    async (formValues) => {
      try {
        await createUser(formValues);
        router.push('/users');
      } catch (error) {
        console.error('Error creating user:', error);
      }
    }
  );

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmit(e);
  };

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
      title="Create New User"
      description="Add a new student to the system"
      submitLabel="Create User"
    />
  );
}
