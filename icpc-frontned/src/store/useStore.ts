import { create } from 'zustand'
import axios from 'axios'

interface AuthState {
  token: string | null
  user: any
  login(email: string, password: string): Promise<void>
  logout(): void
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})

const useStore = create<AuthState>(set => ({
  token: null,
  user: null,
  login: async (email, password) => {
    try {
      const { data } = await api.post('api/v1/auth/login', { email, password })
      set({ token: data.token, user: data.user })
    } catch (error) {
      console.error('Error en el inicio de sesión:', error)
    }
  },
  logout: () => set({ token: null, user: null })
}))

export default useStore
