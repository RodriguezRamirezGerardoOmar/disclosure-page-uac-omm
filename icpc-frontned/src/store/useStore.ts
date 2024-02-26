import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import axios from 'axios'
import { IApiResponse, TResponseBasicError } from '@/constants/types'

// Define user and auth response types
interface IUser {
  id: string
  name: string
  lastName: string
  userName: string
  email: string
  rol: string
}

interface ICreateUser {
  name: string
  lastName: string
  userName: string
  email: string
  password: string
  passwordVerify: string
  isAdmin: boolean
}

interface AuthState {
  token: string | null
  user: IUser | null
  isLogged: boolean
}

interface Actions {
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  setError: (error: string | null) => void
  createUser: (user: ICreateUser) => Promise<IApiResponse> | TResponseBasicError
  getProfile: () => Promise<IUser>
}

const api = axios.create({
  baseURL: 'http://localhost:3001/'
})

const useAuthStore = create<AuthState & Actions>()(
  devtools(
    persist(
      (set, get) => ({
        token: null,
        user: null,

        login: async (email, password) => {
          const response = await api.post('/api/v1/auth/login', { email, password })
          set(() => ({ token: response.data.token }))
          if (get().token !== null) {
            set(() => ({ isLogged: true }))
          }
        },

        logout: () => set(() => ({ isLogged: false, token: null, user: null })),

        setError: (error: string | null) => {}, // Add setError property

        createUser: async (user: ICreateUser) => {
          try {
          const response = await api.post('/api/v1/auth/register', user)
          if (response.status === 201) {
            set(() => ({ user: response.data }))
            return response.data
          }
        } catch (error: any) {
          return error.response.data
        }
        },

        isLogged: false,

        getProfile: async (): Promise<IUser> => {
          const response = await api.get('/api/v1/auth/profile', {
            headers: {
              Authorization: `Bearer ${get().token}`
            }
          })
          set(() => ({ user: response.data }))
          return response.data
        }
      }),
      {
        name: 'auth-storage'
      }
    )
  )
)

export default useAuthStore
