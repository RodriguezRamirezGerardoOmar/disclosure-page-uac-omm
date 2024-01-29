'use client'
import React from 'react'
import { TextComponent } from '../components/text/TextComponent'
import { enumTextTags } from '@/constants/types'

export default function Home() {
  return (
    <div className='border-dashed border-2 border-dark-complementary'>
      <TextComponent tag={enumTextTags.h1}>Making the world a better place through construction alegant hieararchies</TextComponent>
    </div>
  )
}
