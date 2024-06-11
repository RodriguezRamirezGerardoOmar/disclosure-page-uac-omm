import axios from 'axios'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { IApiResponse, TResponseBasicError } from '@/constants/types'
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

}

interface Actions {
    createNews: (news: ICreateNews) => Promise<IApiResponse | TResponseBasicError>
}

const useNewsStore = create<Actions & NewsState>()(
    devtools(
        persist(
            () => ({
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
                }
            }),
            { name: 'news-store' }
        )
    )
)

export default useNewsStore