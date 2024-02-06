'use client'
import React from 'react'
import NoteListComponent from '../components/NoteListComponent'
import { SelectComponent } from '../components/dropdowns/SelectComponent'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import { PaginationComponent } from '../components/paginations/PaginationComponent'
import CreateNoteComponent from '../components/modals/CreateNoteComponent'
const data = require('../notelist/listaApuntes.json')



export default function Home() {
  const methods = useForm<FieldValues>()
  const options = data.categories
  return (
    <main className='grid min-h-screen grid-cols-1 place-items-center px-4 justify-between py-24'>
      <form>
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
                className='px-6 my-2 sm:px-0'
              />
            )}
          />
          <div className='overflow-hidden px-4 py-5 sm:px-0'>
            <NoteListComponent notes={data.notes} />
          </div>
          <PaginationComponent />
        </div>
      </form>
    </main>
  )
}
