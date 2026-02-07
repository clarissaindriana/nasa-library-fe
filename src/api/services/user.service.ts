import { apiClient } from '../client';
import {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  UserListResponse,
  UserDetailResponse,
  ApiResponse,
} from '@/types/user.types';

const ENDPOINTS = {
  USERS: '/user',
  USER_ALL: '/user/all',
  USER_BY_NIS: (nis: string) => `/user/${nis}`,
  USER_CREATE: '/user/create',
  USER_UPDATE: '/user/update',
  USER_DELETE: (nis: string) => `/user/${nis}/delete`,
  USER_ACTIVATE: (nis: string) => `/user/${nis}/activate`,
  USER_SEARCH_NAMA: '/user/search/nama',
  USER_SEARCH_KELAS: '/user/search/kelas',
};

export const userService = {
  /**
   * Get all users with optional filtering
   */
  getAllUsers: async (
    isDeleted?: boolean,
    search?: string
  ): Promise<ApiResponse<User[]>> => {
    const params = new URLSearchParams();
    if (isDeleted !== undefined) {
      params.append('isDeleted', String(isDeleted));
    }
    if (search) {
      params.append('search', search);
    }

    const queryString = params.toString();
    const endpoint = queryString
      ? `${ENDPOINTS.USER_ALL}?${queryString}`
      : ENDPOINTS.USER_ALL;

    return apiClient.get<ApiResponse<User[]>>(endpoint);
  },

  /**
   * Get a specific user by NIS
   */
  getUserByNis: async (nis: string): Promise<ApiResponse<User>> => {
    return apiClient.get<ApiResponse<User>>(ENDPOINTS.USER_BY_NIS(nis));
  },

  /**
   * Create a new user
   */
  createUser: async (
    userData: CreateUserRequest
  ): Promise<ApiResponse<User>> => {
    return apiClient.post<ApiResponse<User>>(
      ENDPOINTS.USER_CREATE,
      userData
    );
  },

  /**
   * Update a user
   */
  updateUser: async (
    userData: UpdateUserRequest
  ): Promise<ApiResponse<User>> => {
    return apiClient.put<ApiResponse<User>>(
      ENDPOINTS.USER_UPDATE,
      userData
    );
  },

  /**
   * Delete a user (soft delete)
   */
  deleteUser: async (nis: string): Promise<ApiResponse<User>> => {
    return apiClient.delete<ApiResponse<User>>(
      ENDPOINTS.USER_DELETE(nis)
    );
  },

  /**
   * Activate a deleted user
   */
  activateUser: async (nis: string): Promise<ApiResponse<User>> => {
    return apiClient.put<ApiResponse<User>>(
      ENDPOINTS.USER_ACTIVATE(nis)
    );
  },

  /**
   * Search users by name
   */
  searchUsersByNama: async (nama: string): Promise<ApiResponse<User[]>> => {
    return apiClient.get<ApiResponse<User[]>>(
      `${ENDPOINTS.USER_SEARCH_NAMA}?nama=${encodeURIComponent(nama)}`
    );
  },

  /**
   * Search users by class
   */
  searchUsersByKelas: async (kelas: string): Promise<ApiResponse<User[]>> => {
    return apiClient.get<ApiResponse<User[]>>(
      `${ENDPOINTS.USER_SEARCH_KELAS}?kelas=${encodeURIComponent(kelas)}`
    );
  },
};

export default userService;
