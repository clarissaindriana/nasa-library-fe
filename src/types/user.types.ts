export interface User {
  nis: string;
  nama: string;
  jenisKelamin: string;
  kelas: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

export interface CreateUserRequest {
  nis: string;
  nama: string;
  jenisKelamin: string;
  kelas: string;
}

export interface UpdateUserRequest {
  nis: string;
  nama: string;
  jenisKelamin: string;
  kelas: string;
}

export interface UserListResponse {
  data: User[];
  message?: string;
  status?: string;
}

export interface UserDetailResponse {
  data: User;
  message?: string;
  status?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: string;
}
