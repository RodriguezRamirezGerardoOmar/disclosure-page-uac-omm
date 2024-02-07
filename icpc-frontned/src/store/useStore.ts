import { create } from 'zustand';
import axios from 'axios';

// Define user and auth response types
interface IUser {
  id: string; // Asumir estructura básica del usuario
  name: string;
  email: string;
}

interface AuthState {
  token: string | null;
  user: IUser | null;
  login(email: string, password: string): Promise<void>;
  logout(): void;
  setError: (error: string | null) => void;
  error: string | null;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  error: null,
  login: async (email, password) => {
    try {
      const response = await api.post('api/v1/auth/login', { email, password });
      if (response.status === 201) {
        set({ token: response.data.token, user: response.data.user });
      } else {
        throw new Error('Error en la autenticación');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Error desconocido al intentar iniciar sesión');
      } else {
        throw new Error('Error al conectarse al servicio de autenticación');
      }
    }
  },
  logout: () => set({ token: null, user: null, error: null }),
  setError: (error) => set({ error })
}));

export default useAuthStore;
