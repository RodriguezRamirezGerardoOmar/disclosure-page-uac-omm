import React from 'react'
import { NewsCardComponent } from '../components/cards/NewsCardComponent'
const data = require('../news/noticia.json')

export default function Home() {
  return (
    <main className='grid min-h-screen grid-cols-1 place-items-center justify-between py-24'>
      <NewsCardComponent data={data} />
    </main>
  )
}
