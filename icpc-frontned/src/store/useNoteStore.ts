import axios from 'axios'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { IApiResponse, TResponseBasicError } from '@/constants/types'
import { Tags } from '@/constants/types'
import useAuthStore from './useStore'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})

interface ICreateNote {
  title: string
  category: { name: string; id: string }
  tags: Tags[]
  description: string
  body: string
  isVisible: boolean
}

interface NoteState {}

interface Actions {
  createNote: (note: any) => Promise<IApiResponse | TResponseBasicError>
}

const useNoteStore = create<Actions & NoteState>()(
  devtools(
    persist(
      () => ({
        createNote: async (note: ICreateNote) => {
          try {
            const response = await api.post('/api/v1/notes', note, {
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
      { name: 'note-store' }
    )
  )
)

export default useNoteStore
