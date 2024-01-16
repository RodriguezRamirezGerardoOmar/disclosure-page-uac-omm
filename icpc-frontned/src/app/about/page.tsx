import React from 'react'
import { TextComponent } from '../components/text/TextComponent'
import { enumTextTags } from '@/constants/types'
import { MDXRemote } from 'next-mdx-remote/rsc'
const data = require('@/app/about/acercade.json')

export default function Page() {
  return (
    <main className='flex min-h-screen flex-col w-full items-center py-24'>
      <div className='w-4/5'>
        <TextComponent
          sizeFont='s28'
          tag={enumTextTags.h1}
          className=''>
          Acerca de nosotros
        </TextComponent>
        <MDXRemote source={data.texto}></MDXRemote>
      </div>
    </main>
  )
}
