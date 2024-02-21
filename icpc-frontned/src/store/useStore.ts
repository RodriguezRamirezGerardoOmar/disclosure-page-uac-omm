import { create } from 'zustand'
import axios from 'axios'

// Define user and auth response types
interface IUser {
  id: string // Asumir estructura básica del usuario
  name: string
  email: string
}

interface ICreateUser {
  username: string
  email: string
  password: string
  passwordVerify: string
  isAdmin: boolean
}

interface AuthState {
  token: string | null
  user: IUser | null
  login(email: string, password: string): Promise<void>
  logout(): void
  setError: (error: string | null) => void
  error: string | null
  createUser(user: ICreateUser): Promise<void>
}

const api = axios.create({
  baseURL: 'http://localhost:3001/'
})

const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  user: null,
  error: null,
  login: async (email, password) => {
    try {
      const response = await api.post('api/v1/auth/login', { email, password })
      const {token, user} = response.data.data
      set({ token: token, user: user, error: null })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Error desconocido al intentar iniciar sesión')
      } else {
        throw new Error('Error al conectarse al servicio de autenticación')
      }
    }
  },
  logout: () => set({ token: null, user: null, error: null }),
  setError: error => set({ error }),

  createUser: async (user: ICreateUser) => {
    try {
      const token = get().token
      const response = await api.post('api/v1/users/user', user, { headers: { Authorization: `Bearer ${token}` } })
      if (response.status === 201) {
        set({ error: null })
      } else {
        throw new Error('Error en la creación de usuario')
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Error desconocido al intentar crear usuario')
      } else {
        throw new Error('Error al conectarse al servicio de autenticación')
      }
    }
  }
}))

export default useAuthStore
