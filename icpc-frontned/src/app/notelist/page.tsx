'use client'
import React from 'react'
import NoteListComponent from '../components/NoteListComponent'
import { SelectComponent } from '../components/dropdowns/SelectComponent'
import { Controller, useForm } from 'react-hook-form'
import { PaginationComponent } from '../components/paginations/PaginationComponent'
const data = require('../notelist/listaApuntes.json')

export default function Home() {
  const methods = useForm()
  const options = data.categories
  return (
    <main className='grid min-h-screen grid-cols-1 place-items-center justify-between py-24'>
      <div>
        <Controller
          name='categories'
          control={methods.control}
          defaultValue={options[0].name}
          render={({ field }) => (
            <SelectComponent
              selected={field.value}
              onChange={newSelected => field.onChange(newSelected)}
              options={options}
              fieldName={field.name}
              id='select'
              labelText={'Categorías'}
            />
          )}
        />
        <div className='bg-white dark:bg-dark-primary overflow-hidden rounded-lg px-4 py-5 sm:p-6'>
          <NoteListComponent notes={data.notes} />
        </div>
        <PaginationComponent />
      </div>
    </main>
  )
}
