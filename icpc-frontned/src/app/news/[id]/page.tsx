import React from 'react'
import { NewsCardComponent } from '@/app/components/cards/NewsCardComponent'
const data = require('@/app/news/noticia.json')

export default function Page({ params }: { params: { id: string } }) {
  {
    if (data.id.toString() === params.id) {
      return (
        <main className='grid min-h-screen grid-cols-1 place-items-center justify-between py-24'>
          <NewsCardComponent data={data} />
        </main>
      )
    }
    return (
      <main className='grid min-h-screen grid-cols-1 place-items-center justify-between py-24'>
        <h1>404</h1>
      </main>
    )
  }
}
