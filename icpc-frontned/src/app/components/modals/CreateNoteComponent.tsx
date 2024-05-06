'use client'
import React from 'react'
import { BasicPanelComponent } from '../panels/BasicPanelComponent'
import LogoComponent from '../LogoComponent'
import { TextComponent } from '../text/TextComponent'
import { enumTextTags, Tags } from '@/constants/types'
import TextFieldComponent from '../forms/TextFieldComponent'
import { FieldValues, Controller, UseFormReturn } from 'react-hook-form'
import { SelectComponent } from '../dropdowns/SelectComponent'
import data from '@/app/notelist/listaApuntes.json'
import tags from '@/app/note/apunte.json'
import TextAreaComponent from '../forms/TextAreaComponent'
import MarkdownAreaComponent from '../forms/MarkdownAreaComponent'
import SubmitComponent from '../forms/SubmitComponent'
import TagSelectorComponent from '../forms/TagSelectorComponent'

interface ICreateNoteProps {
  methods: UseFormReturn<FieldValues>
}

/*
Input: a set of methods and a state to handle the form
Output: a form to create a note article
Return value: a modal form component to create a note article
Function: creates a modal form to write a note article into a database
Variables: methods, data, tags
Date: 22 - 03 - 2024
Author: Gerardo Omar Rodriguez Ramirez
*/

const CreateNoteComponent = ({ ...props }: Readonly<ICreateNoteProps>) => {
  const allTags: Tags[] = tags.tags
    return (
    <div      
      className={`margin-auto md:mx-auto max-w-7xl md:px-4 w-full h-full lg:px-8 lg:w-2/3 lg:h-auto 
    min-h-screen place-items-center justify-between py-24`}>
      <BasicPanelComponent backgroundColor='bg-white dark:bg-dark-primary'>
        <div className='flex flex-col items-center'>
          <LogoComponent size={100} />
          <TextComponent
            tag={enumTextTags.h1}
            sizeFont='s16'
            className='dark:text-dark-accent'>
            Crear apunte
          </TextComponent>
          <TextFieldComponent
            labelText='Título del apunte'
            register={props.methods.register}
            fieldName='title'
            auto='off'
            id='title'
            necessary={true}
            type='text'
          />
          <Controller
            defaultValue={data.categories[0].name}
            control={props.methods.control}
            render={({ field }) => (
              <SelectComponent
                options={data.categories}
                selected={field.value}
                fieldName='category'
                id='category'
                labelText='Categoría'
                onChange={newSelected => field.onChange(newSelected)}
                className=''
              />
            )}
            name='category'
          />
          <Controller
          name='tags'
          defaultValue={[] as Tags[]}
          control={props.methods.control}
          render={({ field }) => (
            <TagSelectorComponent
              id='tagSelector2'
              options={allTags}
              selectedTags={field.value}
              onChange={val => field.onChange(val)}
            />
          )}
          rules={{ required: true }}
        />
          <TextAreaComponent
            labelText={'Descripción'}
            register={props.methods.register}
            fieldName={'description'}
            id={'description'}
            necessary={true}
          />
          <Controller
            name='content'
            defaultValue=''
            control={props.methods.control}
            render={({ field }) => (
              <MarkdownAreaComponent
                value={field.value}
                onChange={newValue => field.onChange(newValue)}
                labelText='Contenido'
                className='p-2'
              />
            )}
          />
          <SubmitComponent text='Crear apunte' />
        </div>
      </BasicPanelComponent>
    </div>
  )
}

export default CreateNoteComponent