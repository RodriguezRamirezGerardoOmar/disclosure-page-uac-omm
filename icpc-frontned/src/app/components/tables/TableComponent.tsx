'use client'
import TagListComponent from '../tags/TagListComponent'
import { PaginationComponent } from '../paginations/PaginationComponent'
import InputSelectorComponent from '../dropdowns/InputSelectorComponent'
import TagSelectorComponent from '../forms/TagSelectorComponent'
import { Exercise, Tags } from '@/constants/types'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import useUtilsStore from '@/store/useUtilsStore'
import useExcerciseStore from '@/store/useExcerciseStore'

/*
Input: a list of strings that define CSS classes
Output: a single string of Tailwind CSS
Return value: a string with the CSS classes
Function: joins multiple strings into a single string
Variables: classes
Date: 21 - 03 - 2024
Author: Gerardo Omar Rodriguez Ramirez
*/

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

/*
Input: a list of exercises with id, name, dificult, category and tags
Output: a table of exercises to see the items and enter to their pages
Return value: a table component with the exercises
Function: creates a table of exercises as a component
Variables: exercises, id, name, dificult, categorie, tag
Date: 11 - 04 - 2024
Author: Gerardo Omar Rodriguez Ramirez
*/

export default function TableComponent() {
  const tags = useUtilsStore().tags
  const getTags = useUtilsStore.getState().getTags
  const categories = useUtilsStore().categories
  const getCategories = useUtilsStore.getState().getCategories
  const difficulties = useUtilsStore().difficulty
  const getDifficulties = useUtilsStore.getState().getDifficulties
  const methods = useForm<FieldValues>()
  const [tagOptions, setTagOptions] = useState<Tags[]>(tags)
  const [category, setCategory] = useState('')
  const [categoryOptions, setCategoryOptions] = useState(categories)
  const [selectedTags, setSelectedTags] = useState<Tags[]>([])
  const [difficultyOptions, setDifficultyOptions] = useState(difficulties)
  const [difficulty, setDifficulty] = useState('')
  const [exercises, setExercises] = useState<Exercise[]>([])
  const getExcerciseList = useExcerciseStore.getState().getExerciseList

  useEffect(() => {
    getCategories().then(response => {
      setCategoryOptions(response)
    })
    getDifficulties().then(response => {
      setDifficultyOptions(response)
    })
    getTags().then(response => {
      setTagOptions(response)
    })
    getExcerciseList(selectedTags, category, difficulty).then(response => {
      setExercises(response)
    })
  }, [getCategories, getDifficulties, selectedTags, category, difficulty, getExcerciseList, getTags])

  return (
    <div className='px-4 sm:px-6 lg:px-8 '>
      <form className='w-full grid grid-cols-3 gap-2'>
        <Controller
          defaultValue={[]}
          control={methods.control}
          render={({ field }) => (
            <InputSelectorComponent
              label='Categoría'
              id='category'
              onChange={val => {
                field.onChange(val)
                setCategory((val === null ? '' : val.label) as string)
              }}
              options={categoryOptions.map(item => {
                return { label: item.name, value: item.id }
              })}
              selectedOption={field.value}
              clearable={true}
            />
          )}
          name='category'
        />
        <Controller
          name='tags'
          defaultValue={[] as Tags[]}
          control={methods.control}
          render={({ field }) => (
            <TagSelectorComponent
              id='tagSelector2'
              options={tagOptions}
              selectedTags={field.value}
              onChange={val => {
                field.onChange(val)
                setSelectedTags(val)
              }}
            />
          )}
          rules={{ required: true }}
        />
        <Controller
          defaultValue={[]}
          control={methods.control}
          render={({ field }) => (
            <InputSelectorComponent
              label='Dificultad'
              id='difficulty'
              onChange={val => {
                field.onChange(val)
                setDifficulty((val === null ? '' : val.label) as string)
              }}
              options={difficultyOptions.map(item => {
                return { label: item.name, value: item.id }
              })}
              selectedOption={field.value}
              clearable={true}
            />
          )}
          name='difficulty'
        />
      </form>
      <div className='mt-8 flow-root'>
        <div className='-mx-4 -my-2 sm:-mx-6 lg:-mx-8'>
          <div
            className={`ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg inline-block 
          min-w-full align-middle  h-[70vh] overflow-y-scroll scroll-smooth`}>
            <table className='min-w-full border-separate border-spacing-0'>
              <thead>
                <tr>
                  <th
                    scope='col'
                    className='sticky top-0 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 
                    text-left text-sm font-semibold text-gray-500 backdrop-blur 
                    backdrop-filter sm:pl-6 lg:pl-8'>
                    NOMBRE
                  </th>
                  <th
                    scope='col'
                    className='sticky top-0 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm
                    font-semibold text-gray-500 backdrop-blur backdrop-filter'>
                    DIFICULTAD
                  </th>
                  <th
                    scope='col'
                    className='sticky top-0 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5
                    text-left text-sm font-semibold text-gray-500 backdrop-blur backdrop-filter lg:table-cell'>
                    CATEGORIA
                  </th>
                  <th
                    scope='col'
                    className='sticky top-0 border-b border-gray-300 bg-white bg-opacity-75 px-3 
                    py-3.5 text-left text-sm font-semibold text-gray-500 backdrop-blur backdrop-filter'>
                    ETIQUETAS
                  </th>
                  <th
                    scope='col'
                    className='sticky top-0 border-b border-gray-300 bg-white bg-opacity-75 
                    py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8'>
                    <span className='sr-only'>Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {exercises.map((exercise, id) => (
                  <tr
                    key={exercise.id}
                    className='cursor-pointer hover:bg-slate-200'>
                    <td
                      className={classNames(
                        id !== Object.keys(exercise).length - 1 ? 'border-b border-gray-200' : '',
                        'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-dark-accent sm:pl-6 lg:pl-8'
                      )}>
                      {exercise.title}
                    </td>
                    <td
                      className={classNames(
                        id !== Object.keys(exercise).length - 1 ? 'border-b border-gray-200' : '',
                        'whitespace-nowrap flex gap-1 px-3 py-4 text-sm text-gray-500'
                      )}>
                      {
                        //itera sobre el numero de dificultad y pinta tantas estrellas como sea el numero
                        Array.from(Array(exercise.difficulty.level), (_, i) => (
                          <img
                            alt=''
                            src='icons/estrellas.svg'
                            key={i}
                            className='h-5 w-5'
                          />
                        ))
                      }
                    </td>
                    <td
                      className={classNames(
                        id !== Object.keys(exercise).length - 1 ? 'border-b border-gray-200' : '',
                        'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 dark:text-dark-accent lg:table-cell'
                      )}>
                      {exercise.category.name}
                    </td>
                    <td
                      className={classNames(
                        id !== Object.keys(exercise).length - 1 ? 'border-b border-gray-200' : '',
                        'whitespace-nowrap text-sm text-gray-500'
                      )}>
                      <TagListComponent
                        tags={exercise.tags.map((tag) => ({ id: tag.id, name: tag.name, color: tag.color }))}
                        showIcon={false}
                      />
                    </td>
                    <td
                      className={classNames(
                        id !== Object.keys(exercise).length - 1 ? 'border-b border-gray-200' : '',
                        'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8'
                      )}>
                      <a
                        href={`/exercises/${exercise.id}`}
                        className='text-indigo-600 hover:text-indigo-900'>
                        Leer<span className='sr-only'>, {exercise.title}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <PaginationComponent />
        </div>
      </div>
    </div>
  )
}
