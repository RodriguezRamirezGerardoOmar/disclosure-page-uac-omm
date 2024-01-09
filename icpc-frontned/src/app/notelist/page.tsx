'use client'
import React from 'react'
import { BasicPanelComponent } from '../components/panels/BasicPanelComponent'
import NoteListComponent from '../components/NoteListComponent'
import { SelectComponent } from '../components/dropdowns/SelectComponent'
import { Controller, useForm } from 'react-hook-form' // Added import statement for Controller
const data = require('../notelist/listaApuntes.json')

export default function Home() {
  const methods = useForm()
  const options = data.categories
  return (
    <main className='grid min-h-screen grid-cols-1 place-items-center justify-between py-24'>
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
      <BasicPanelComponent backgroundColor='bg-white dark:bg-dark-primary'>
        <NoteListComponent notes={data.notes} />
      </BasicPanelComponent>
    </main>
  )
}
