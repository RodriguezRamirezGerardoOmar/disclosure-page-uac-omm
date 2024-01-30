'use client'
import React from 'react'
import NewsListComponent from '../components/NewsListComponent'
import CreateNewsComponent from '@/app/components/cards/CreateNewsComponent'
import { useForm, FieldValues } from 'react-hook-form'

export default function Page() {
  const methods = useForm<FieldValues>()
  return (
    <main className='grid min-h-screen grid-cols-1 place-items-center justify-between py-24'>
        <NewsListComponent className='lg:w-10/12'/>
        <CreateNewsComponent methods={methods}/>
    </main>
  )
}