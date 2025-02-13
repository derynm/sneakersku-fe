import axios, { InternalAxiosRequestConfig } from 'axios'
import { useCookies } from 'react-cookie'
import { service } from './index.ts'
import { useNavigate } from 'react-router-dom'

type ApiService = ReturnType<typeof service>

export const useApi = (): ApiService => {
  const navigate = useNavigate()
  const [cookies] = useCookies(['token'])

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  })

  axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (cookies.token && !config.url?.includes('login')) {
      config.headers.Authorization = `Bearer ${cookies.token}`
    }
    return config
  })

  axiosInstance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response?.status === 401) {
        navigate('/login')
      }
      return Promise.reject(error)
    }
  )

  return service(axiosInstance)
}