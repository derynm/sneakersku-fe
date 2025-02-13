// service/index.ts
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export interface ApiMethods {
  get: <T>(url: string, config?: AxiosRequestConfig) => Promise<T>
  post: <T>(url: string, config?: AxiosRequestConfig) => Promise<T>
  put: <T>(url: string, config?: AxiosRequestConfig) => Promise<T>
  delete: <T>(url: string, config?: AxiosRequestConfig) => Promise<T>
  patch: <T>(url: string, config?: AxiosRequestConfig) => Promise<T>
}

export const service = (axios: AxiosInstance) => {
  const createMethod = (method: ApiMethod) => {
    return async <R>(url: string, config?: AxiosRequestConfig): Promise<R> => {
      const response = await axios({
        url,
        method,
        ...config,
      })
      return response.data
    }
  }

  const api: ApiMethods = {
    get: createMethod('GET'),
    post: createMethod('POST'),
    put: createMethod('PUT'),
    delete: createMethod('DELETE'),
    patch: createMethod('PATCH'),
  }

  const apiResource = {
    postLogin: (opt: AxiosRequestConfig) => api.post('/auth/login', opt),
    postRegister: (opt: AxiosRequestConfig) => api.post('/auth/register', opt),
    getCurrentUser: () => api.get('/auth/me'),

    // products
    getProducts: () => api.get('/shoes'),
    getProduct: (id: string) => api.get(`/shoes/${id}`),
  }

  return apiResource
}
