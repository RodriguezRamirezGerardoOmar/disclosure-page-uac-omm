import axios from 'axios'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { IApiResponse, TResponseBasicError } from '@/constants/types'
import { Tags } from '@/constants/types'
import useAuthStore from './useStore'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})

interface ICreateExcercise {
  title: string
  category: { name: string, id: string }
  difficulty: { name: string, id: string }
  time: { value: number, id: string}
  memoryId: string
  input: string
  output: string
  constraints: string
  clue: string
  tags: Tags[]
  author: string
  description: string
  example_input: string
  example_output: string
  solution: string
  isVisible: boolean
  userAuthor: string
  role: string
}

interface Actions {
  createExcercise: (exercise: ICreateExcercise) => Promise<IApiResponse | TResponseBasicError>
}

const useExcerciseStore = create<Actions>()(
  devtools(
    persist(
      () => ({
        createExcercise: async (exercise: ICreateExcercise) => {
          try {
            const response = await api.post('/api/v1/excercises', exercise, {
              headers: {
                Authorization: `Bearer ${useAuthStore.getState().token}`
              }
            })
            if (response.status === 201) {
              return response.data
            }
          } catch (error: any) {
            return error.response.data
          }
        }
      }),
      { name: 'exercise-store' }
    )
  )
)

export default useExcerciseStore