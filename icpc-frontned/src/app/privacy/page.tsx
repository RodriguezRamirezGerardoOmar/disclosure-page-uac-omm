import React from 'react'
import { TextComponent } from '../components/text/TextComponent'
import { enumTextTags } from '@/constants/types'
import Politica from '@/app/privacy/politica.mdx'

/*
Input: none (static page, no props or parameters)
Output: a page displaying the privacy terms using a title and MDX content
Return value: a page component used to show privacy policy information
Function: renders a main container with a title and the privacy policy content
Variables: none (uses static content and imported components)
Date: 28 - 05 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

export default function Page() {
  return (
    <main className='flex min-h-screen flex-col w-full items-center py-24'>
      <div className='w-4/5'>
        <TextComponent
          sizeFont='s28'
          tag={enumTextTags.h1}
          className='dark:text-dark-accent'>
          Términos de privacidad
        </TextComponent>
        <Politica />
      </div>
    </main>
  )
}
