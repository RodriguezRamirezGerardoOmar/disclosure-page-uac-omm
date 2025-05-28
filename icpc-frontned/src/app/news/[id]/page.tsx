import React from 'react'
import NewsCardComponent from '@/app/components/cards/NewsCardComponent'

/*
Input: params (object with id from the route)
Output: a page displaying a news card if id is valid, or a 404 message if not
Return value: a page component used to show a single news article or a 404 error
Function: checks if the id param is valid, renders the news card if so, otherwise renders a 404 message
Variables: params
Date: 28 - 05 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

export default async function Page({ params }: Readonly<{ params: { id: string } }>) {
  if (params.id !== undefined && params.id !== '') {
    return (
      <main className='grid min-h-screen grid-cols-1 place-items-center justify-between py-24'>
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
