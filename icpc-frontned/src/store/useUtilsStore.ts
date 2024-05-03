import axios from 'axios'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { Tags, Categories, Difficulties, TimeLimit, MemoryLimit } from '@/constants/types'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})

interface UtilsState {
  tags: Tags[]
  categories: Categories[]
  difficulty: Difficulties[]
  timeLimit: TimeLimit[]
  memoryLimit: MemoryLimit[]
}

interface Actions {
  getTags: () => Promise<Tags[]>
  getCategories: () => Promise<Categories[]>
  getDifficulties: () => Promise<Difficulties[]>
  getTimeLimit: () => Promise<TimeLimit[]>
  getMemoryLimit: () => Promise<MemoryLimit[]>
}

const useUtilsStore = create<Actions & UtilsState>()(
  devtools(
    persist(
      (set) => ({
        tags: [] as Tags[],
        categories: [] as Categories[],
        difficulty: [] as Difficulties[],
        timeLimit: [] as TimeLimit[],
        memoryLimit: [] as MemoryLimit[],


        getTags: async (): Promise<Tags[]> => {
          try {
            const response = await api.get('/api/v1/tags')
            set(() => ({tags: response.data}))
            return response.data
          } catch (error: any) {
            return error.response.data
          }
        },

        getCategories: async (): Promise<Categories[]> => {
            try {
                const response = await api.get('/api/v1/categories')
                set(() => ({categories: response.data}))
                return response.data
            } catch (error: any) {
                return error.response.data
            }
        },

        getDifficulties: async (): Promise<Difficulties[]> => {
            try {
                const response = await api.get('/api/v1/difficulty')
                set(() => ({difficulty: response.data}))
                return response.data
            } catch (error: any) {
                return error.response.data
            }
        },

        getTimeLimit: async (): Promise<TimeLimit[]> => {
            try {
                const response = await api.get('/api/v1/time')
                set(() => ({timeLimit: response.data}))
                return response.data
            } catch (error: any) {
                return error.response.data
            }
        },

        getMemoryLimit: async (): Promise<MemoryLimit[]> => {
            try{
                const response = await api.get('/api/v1/memory')
                set(() => ({memoryLimit: response.data}))
                return response.data
            } catch (error: any) {
                return error.response.data
            }
        }

      }),
      {
        name: 'utils-store'
      }
    )
  )
)

export default useUtilsStore
