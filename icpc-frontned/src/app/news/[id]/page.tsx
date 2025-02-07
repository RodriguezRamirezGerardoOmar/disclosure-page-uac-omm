import React from 'react'
import NewsCardComponent from '@/app/components/cards/NewsCardComponent'
import ReportButtonComponent from '@/app/components/buttons/ReportButtonComponent'

export default async function Page({ params }: Readonly<{ params: { id: string } }>) {
  if (params.id !== undefined && params.id !== '') {
    return (
      <main className='grid min-h-screen grid-cols-1 place-items-center justify-between py-24'>
        <div className='flex justify-end w-full px-4'>
          <ReportButtonComponent
            itemId={params.id}
            itemType='Noticias'
          />
        </div>
        <NewsCardComponent id={params.id} />
      </main>
    )
  } else {
    return (
      <main className='grid min-h-screen grid-cols-1 place-items-center justify-between py-24'>
        <h1>404</h1>
      </main>
    )
  }
}
