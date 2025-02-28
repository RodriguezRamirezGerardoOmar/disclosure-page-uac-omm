'use client'
import React from 'react'
import { TextComponent } from '../text/TextComponent'
import { enumTextTags } from '@/constants/types'
import MarkdownBodyComponent from '../panels/MarkdownBodyComponent'

interface ExerciseMarkdownComponentProps {
  description: string
  constraints: string
  solution?: string
}

const ExerciseMarkdownComponent: React.FC<ExerciseMarkdownComponentProps> = ({ description, constraints, solution }) => {
  return (
    <div className='mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-accent dark:text-dark-accent'>
      <div
        className='-mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 
          lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16'>
        <TextComponent tag={enumTextTags.h1}>Descripción del problema:</TextComponent>
        <MarkdownBodyComponent body={description} />
        <br />
        <TextComponent tag={enumTextTags.h1}>Restricciones:</TextComponent>
        <TextComponent>{constraints}</TextComponent>
        <br />
        <TextComponent tag={enumTextTags.h1}>Solución del problema:</TextComponent>
        <MarkdownBodyComponent body={solution ? solution : ''} />
      </div>
    </div>
  )
}

export default ExerciseMarkdownComponent
