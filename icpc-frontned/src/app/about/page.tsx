import React from 'react'
import { TextComponent } from '../components/text/TextComponent'
import { enumTextTags } from '@/constants/types'
import About from '@/app/about/acercade.mdx'

export default function Page() {
  return (
    <main className='flex min-h-screen flex-col w-full items-center py-24'>
      <div className='w-4/5 dark:text-dark-accent text-justify'>
        <TextComponent
          sizeFont='s28'
          tag={enumTextTags.h1}
          className='dark:text-dark-accent'>
          Acerca de nosotros
        </TextComponent>
        <About />
      </div>
    </main>
  )
}
