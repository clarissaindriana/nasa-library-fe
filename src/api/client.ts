import API_CONFIG from './config';

interface FetchOptions extends RequestInit {
  timeout?: number;
}

class ApiClient {
  private baseURL: string;
  private defaultTimeout: number;

  constructor(baseURL: string, timeout: number = API_CONFIG.TIMEOUT) {
    this.baseURL = baseURL;
    this.defaultTimeout = timeout;
  }

  private async fetchWithTimeout(
    url: string,
    options: FetchOptions = {}
  ): Promise<Response> {
    const timeout = options.timeout || this.defaultTimeout;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      return response;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async get<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const response = await this.fetchWithTimeout(url, {
      method: 'GET',
      headers: API_CONFIG.HEADERS,
      ...options,
    });

    return this.handleResponse<T>(response);
  }

  async post<T>(
    endpoint: string,
    data?: unknown,
    options?: FetchOptions
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const response = await this.fetchWithTimeout(url, {
      method: 'POST',
      headers: API_CONFIG.HEADERS,
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });

    return this.handleResponse<T>(response);
  }

  async put<T>(
    endpoint: string,
    data?: unknown,
    options?: FetchOptions
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const response = await this.fetchWithTimeout(url, {
      method: 'PUT',
      headers: API_CONFIG.HEADERS,
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });

    return this.handleResponse<T>(response);
  }

  async delete<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const response = await this.fetchWithTimeout(url, {
      method: 'DELETE',
      headers: API_CONFIG.HEADERS,
      ...options,
    });

    return this.handleResponse<T>(response);
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type');
    let data: unknown;

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      throw new ApiError(
        `API Error: ${response.statusText}`,
        response.status,
        data
      );
    }

    return data as T;
  }
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const apiClient = new ApiClient(API_CONFIG.BASE_URL);
export default ApiClient;
