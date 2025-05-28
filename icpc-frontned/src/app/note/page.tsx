'use client'
import React, { useEffect } from 'react'
import NoteListComponent from '../components/NoteListComponent'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import { PaginationComponent } from '../components/paginations/PaginationComponent'
import { Categories, enumTextTags, Note, Tags } from '@/constants/types'
import useNoteStore from '@/store/useNoteStore'
import useUtilsStore from '@/store/useUtilsStore'
import InputSelectorComponent from '../components/dropdowns/InputSelectorComponent'
import TagSelectorComponent from '../components/forms/TagSelectorComponent'
import { TextComponent } from '../components/text/TextComponent'

/*
Input: none (static page, no props or parameters)
Output: a page displaying a list of notes with filtering by category and tags
Return value: a page component used to show and filter notes
Function: fetches categories and notes, manages filter state, renders a form for filtering and a list of notes
Variables: categories, tags, methods, options, category, selectedTags, data, getList, getCategories
Date: 28 - 05 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

export default function Home() {
  const categories = useUtilsStore.getState().categories
  const tags = useUtilsStore.getState().tags
  const methods = useForm<FieldValues>()
  const [options, setOptions] = React.useState<Categories[]>(categories)
  const [category, setCategory] = React.useState('')
  const [selectedTags, setSelectedTags] = React.useState<Tags[]>([])
  const [data, setData] = React.useState<Note[]>([])
  const getList = useNoteStore.getState().getList
  const getCategories = useUtilsStore.getState().getCategories
  useEffect(() => {
    getCategories().then(response => {
      setOptions(response)
    })
    getList(selectedTags, category).then(response => {
      setData(response)
    })
  }, [category, getCategories, getList, selectedTags])
  return (
    <main className='grid min-h-screen grid-cols-1 place-items-center px-4 justify-between py-24'>
      <form className='w-full'>
        <div>
          <div className='grid grid-cols-2 gap-2'>
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
                  options={options.map(item => {
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
                  options={tags}
                  selectedTags={field.value}
                  onChange={val => {
                    field.onChange(val)
                    setSelectedTags(val)
                  }}
                  label='Etiquetas'
                />
              )}
              rules={{ required: true }}
            />
          </div>
          <div className='overflow-hidden px-4 py-5 sm:px-0'>
            {data.length > 0 ? (
              <NoteListComponent notes={data} />
            ) : (
              <TextComponent
                className='text-center'
                tag={enumTextTags.h1}
                sizeFont='s20'>
                No hay notas
              </TextComponent>
            )}
          </div>
        </div>
      </form>
    </main>
  )
}
