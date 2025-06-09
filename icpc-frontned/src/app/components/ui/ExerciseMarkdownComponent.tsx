'use client'
import React from 'react'
import { TextComponent } from '../text/TextComponent'
import { enumTextTags } from '@/constants/types'
import MarkdownBodyComponent from '../panels/MarkdownBodyComponent'
import CollapsibleCardComponent from '../cards/CollapsibleCardComponent'
import SimpleCollapsibleCardComponent from '../cards/SimpleCollapsibleCardComponent'

interface ExerciseMarkdownComponentProps {
  description: string
  constraints: string
  solution?: string
  clue?: string
}

/*
Input: description (problem description), constraints (problem constraints), solution (optional solution to the problem), clue 
(optional clue for the problem)
Output: Section with markdown-rendered problem description, constraints, clue, and solution, each in a styled card or collapsible card
Return value: Component that displays the exercise's description, constraints, clue, and solution in a formatted layout
Function: Shows the markdown content for an exercise, including description, constraints, clue, and solution, using styled and collapsible cards
Variables: description, constraints, solution, clue
Date: 28 - 05 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/
const ExerciseMarkdownComponent: React.FC<ExerciseMarkdownComponentProps> = ({ description, constraints, solution, clue }) => {
  return (
    <div className='mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-accent dark:text-dark-accent'>
      <div
        className='-mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 
          lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16'>
        <div className='w-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm ring-1 ring-gray-900/5'>
          <TextComponent
            tag={enumTextTags.h2}
            sizeFont='s18'
            className='font-bold'>
            Descripción del problema:
          </TextComponent>
          <MarkdownBodyComponent body={description} />
        </div>
        <br />
        {constraints && (
          <div className='w-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm ring-1 ring-gray-900/5'>
            <TextComponent
              tag={enumTextTags.h2}
              sizeFont='s18'
              className='font-bold'>
              Restricciones del problema:
            </TextComponent>
            <TextComponent className={'whitespace-pre-wrap'}>{constraints}</TextComponent>
          </div>
        )}
        <br />
        {clue && (
          <SimpleCollapsibleCardComponent
            title={'Una pista:'}
            body={clue}
          />
        )}
        <br />
        {/* This is absolute engineering */}
        {solution && solution.length != 772 && (
          <CollapsibleCardComponent
            title={'Solución del problema:'}
            body={solution}
          />
        )}
      </div>
    </div>
  )
}

export default ExerciseMarkdownComponent
