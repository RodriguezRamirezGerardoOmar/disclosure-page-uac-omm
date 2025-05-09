'use client'
import { UserCircleIcon, ClockIcon, CpuChipIcon } from '@heroicons/react/20/solid'
import React from 'react'
import { enumTextTags, Exercise } from '@/constants/types'
import TagListComponent from '../tags/TagListComponent'
import { TextComponent } from '../text/TextComponent'
import ExerciseHeaderComponent from '../ui/ExerciseHeaderComponent'
import ExerciseMarkdownComponent from '../ui/ExerciseMarkdownComponent'

interface ExerciseCardComponentProps {
  exercise: Exercise
  description: string
  solution?: string
  itemId?: string
  clue?: string
}

const ExerciseCardComponent = ({ ...props }: Readonly<ExerciseCardComponentProps>) => {
  return (
    <main className='w-full'>
      <ExerciseHeaderComponent
        category={props.exercise.category.name}
        title={props.exercise.title}
        itemId={props.itemId!}
      />

      <div className='mx-auto w-full px-4 py-8 sm:px-6 lg:px-8'>
        {' '}
        {/* Contenido principal */}
        <div className='mx-auto grid w-full max-w-full grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:grid-cols-3'>
          {/* Resumen del ejercicio */}
          <div className='lg:col-start-3 lg:row-end-1'>
            <div className='rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5'>
              <dl className='flex flex-wrap p-4'>
                <div className='flex-auto pl-6'>
                  <dt className='text-sm font-semibold leading-6 text-accent'>Dificultad</dt>
                  <dd className='mt-1 text-base font-semibold leading-6 text-gray-900'>{props.exercise.difficulty.name}</dd>
                </div>
                <div className='flex-none self-end px-6 pt-4'></div>
                <div className='mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6'>
                  <dt className='flex-none'>
                    <UserCircleIcon
                      className='h-6 w-5 text-gray-400'
                      aria-hidden='true'
                    />
                  </dt>
                  <dd className='text-sm font-medium leading-6 text-accent'>{props.exercise.author}</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Detalles del ejercicio */}
          <div
            className='-mx-4 w-full px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 
            lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16'>
            <TagListComponent
              tags={props.exercise.tags}
              showIcon={false}
            />
          </div>
        </div>
      </div>
      <ExerciseMarkdownComponent
        description={props.description}
        clue={props.clue}
        constraints={props.exercise.constraints}
        solution={props.solution}
      />
    </main>
  )
}

export default ExerciseCardComponent
