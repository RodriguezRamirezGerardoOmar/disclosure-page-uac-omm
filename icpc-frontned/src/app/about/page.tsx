import React from 'react'
import { TextComponent } from '../components/text/TextComponent'
import { enumTextTags } from '@/constants/types'
import About from '@/app/about/acercade.mdx'

/*
Input: none (static about page, no props or parameters)
Output: a card with a title ("Acerca de nosotros"), about comments, and styles
Return value: a card component used in the about page to display information about the project or team
Function: creates a card with a header and about information using a TextComponent and About MDX content
Variables: none (uses static content and imported components)
Date: 28 - 05 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

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
