import React from 'react'
import NewsListComponent from '../components/NewsListComponent'

/*
Input: none (static page, no props or parameters)
Output: a page displaying a list of news articles using NewsListComponent
Return value: a page component used to show all news articles
Function: renders a main container with a news list component
Variables: none (uses static content and imported components)
Date: 28 - 05 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

export default function Page() {
  return (
    <main className='grid min-h-screen grid-cols-1 place-items-center justify-between py-24'>
        <NewsListComponent className='lg:w-10/12'/>
    </main>
  )
}