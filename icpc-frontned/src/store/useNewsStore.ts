import axios from 'axios'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { IApiResponse, TResponseBasicError, News } from '@/constants/types'
import useAuthStore from './useStore'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})

interface ICreateNews {
  title: string
  imageId: string
  body: string
}

interface NewsState {
  news: News[]
}

interface Actions {
  createNews: (news: ICreateNews) => Promise<IApiResponse | TResponseBasicError>
  getNews: () => Promise<News[]>
  getNewsArticle: (id: string) => Promise<News>
}

const useNewsStore = create<Actions & NewsState>()(
  devtools(
    persist(
      (set, get) => ({
        news: [],
        createNews: async (news: ICreateNews) => {
          try {
            const response = await api.post('/api/v1/news', news, {
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
        },
        getNews: async (): Promise<News[]> => {
          try {
            const response = await api.get('/api/v1/news')
            const newsResponse = response.data.map((news: News, index: number) => {
              return { ...news, index }
            })
            set(() => ({ news: newsResponse }))
            return newsResponse
          } catch (error: any) {
            return error.response.data
          }
        },
        getNewsArticle: async (id: string): Promise<News> => {
          try {
            const response = await api.get(`/api/v1/news/${id}`)
            return { ...response.data, index: 0 }
          } catch (error: any) {
            return error.response.data
          }
        }
      }),
      { name: 'news-store' }
    )
  )
)

export default useNewsStore
