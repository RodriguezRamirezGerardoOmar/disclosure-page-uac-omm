import React from 'react'
import NewsListComponent from '../components/NewsListComponent'

export default function Page() {
  return (
    <main className='grid min-h-screen grid-cols-1 place-items-center justify-between py-24'>
        <NewsListComponent />
    </main>
  )
}