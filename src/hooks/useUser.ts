import { useState, useCallback } from 'react';
import { useNotification } from './useNotification';
import { userService } from '@/api/services/user.service';
import {
  User,
  CreateUserRequest,
  UpdateUserRequest,
} from '@/types/user.types';
import { ApiError } from '@/api/client';

export interface UseUserReturn {
  users: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  getAllUsers: (isDeleted?: boolean, search?: string) => Promise<void>;
  getUserByNis: (nis: string) => Promise<void>;
  createUser: (userData: CreateUserRequest) => Promise<void>;
  updateUser: (userData: UpdateUserRequest) => Promise<void>;
  deleteUser: (nis: string) => Promise<void>;
  activateUser: (nis: string) => Promise<void>;
  searchUsersByNama: (nama: string) => Promise<void>;
  searchUsersByKelas: (kelas: string) => Promise<void>;
  clearError: () => void;
  clearCurrentUser: () => void;
}

export const useUser = (): UseUserReturn => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showNotification } = useNotification();

  const handleError = useCallback(
    (err: unknown, defaultMessage: string) => {
      const message =
        err instanceof ApiError ? err.message : defaultMessage;
      setError(message);
      showNotification(message, 'error');
    },
    [showNotification]
  );

  const getAllUsers = useCallback(
    async (isDeleted?: boolean, search?: string) => {
      try {
        setLoading(true);
        setError(null);
        const response = await userService.getAllUsers(isDeleted, search);
        setUsers(response.data || []);
        showNotification('Users loaded successfully', 'success');
      } catch (err) {
        handleError(err, 'Failed to load users');
      } finally {
        setLoading(false);
      }
    },
    [showNotification, handleError]
  );

  const getUserByNis = useCallback(
    async (nis: string) => {
      try {
        setLoading(true);
        setError(null);
        const response = await userService.getUserByNis(nis);
        setCurrentUser(response.data);
      } catch (err) {
        handleError(err, 'Failed to load user');
      } finally {
        setLoading(false);
      }
    },
    [handleError]
  );

  const createUser = useCallback(
    async (userData: CreateUserRequest) => {
      try {
        setLoading(true);
        setError(null);
        const response = await userService.createUser(userData);
        setCurrentUser(response.data);
        showNotification('User created successfully', 'success');
      } catch (err) {
        handleError(err, 'Failed to create user');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [showNotification, handleError]
  );

  const updateUser = useCallback(
    async (userData: UpdateUserRequest) => {
      try {
        setLoading(true);
        setError(null);
        const response = await userService.updateUser(userData);
        setCurrentUser(response.data);
        setUsers(
          users.map((u) => (u.nis === userData.nis ? response.data : u))
        );
        showNotification('User updated successfully', 'success');
      } catch (err) {
        handleError(err, 'Failed to update user');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [users, showNotification, handleError]
  );

  const deleteUser = useCallback(
    async (nis: string) => {
      try {
        setLoading(true);
        setError(null);
        await userService.deleteUser(nis);
        setUsers(users.filter((u) => u.nis !== nis));
        showNotification('User deleted successfully', 'success');
      } catch (err) {
        handleError(err, 'Failed to delete user');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [users, showNotification, handleError]
  );

  const activateUser = useCallback(
    async (nis: string) => {
      try {
        setLoading(true);
        setError(null);
        const response = await userService.activateUser(nis);
        setUsers(
          users.map((u) => (u.nis === nis ? response.data : u))
        );
        showNotification('User activated successfully', 'success');
      } catch (err) {
        handleError(err, 'Failed to activate user');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [users, showNotification, handleError]
  );

  const searchUsersByNama = useCallback(
    async (nama: string) => {
      try {
        setLoading(true);
        setError(null);
        const response = await userService.searchUsersByNama(nama);
        setUsers(response.data || []);
      } catch (err) {
        handleError(err, 'Failed to search users by name');
      } finally {
        setLoading(false);
      }
    },
    [handleError]
  );

  const searchUsersByKelas = useCallback(
    async (kelas: string) => {
      try {
        setLoading(true);
        setError(null);
        const response = await userService.searchUsersByKelas(kelas);
        setUsers(response.data || []);
      } catch (err) {
        handleError(err, 'Failed to search users by class');
      } finally {
        setLoading(false);
      }
    },
    [handleError]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearCurrentUser = useCallback(() => {
    setCurrentUser(null);
  }, []);

  return {
    users,
    currentUser,
    loading,
    error,
    getAllUsers,
    getUserByNis,
    createUser,
    updateUser,
    deleteUser,
    activateUser,
    searchUsersByNama,
    searchUsersByKelas,
    clearError,
    clearCurrentUser,
  };
};

export default useUser;
