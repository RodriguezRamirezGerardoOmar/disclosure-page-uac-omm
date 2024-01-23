'use client'
import React from 'react'
import { BasicPanelComponent } from '../panels/BasicPanelComponent'
import LogoComponent from '../LogoComponent'
import { TextComponent } from '../text/TextComponent'
import { enumTextTags } from '@/constants/types'
import TextFieldComponent from '../forms/TextFieldComponent'
import { UseFormRegister, FieldValues, Controller, useForm } from 'react-hook-form'
import { SelectComponent } from '../dropdowns/SelectComponent'
import data from '@/app/notelist/listaApuntes.json'
import tags from '@/app/note/apunte.json'
import TagListComponent from '../tags/TagListComponent'
import TextAreaComponent from '../forms/TextAreaComponent'
import MarkdownAreaComponent from '../forms/MarkdownAreaComponent'

interface ICreateNoteProps {
  register: UseFormRegister<FieldValues>
}

const CreateNoteComponent = ({ ...props }: Readonly<ICreateNoteProps>) => {
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
            register={props.register}
            fieldName='title'
            auto='off'
            id='title'
            necessary={true}
            type='text'
          />
          <Controller
            defaultValue={data.categories[0].name}
            control={useForm().control}
            render={({ field }) => (
              <SelectComponent
                options={data.categories}
                selected={field.value}
                fieldName='category'
                id='category'
                labelText='Categoría'
                onChange={newSelected => field.onChange(newSelected)}
                className='p-2'
              />
            )}
            name='category'
          />
          <TextFieldComponent
            labelText='Etiquetas'
            register={props.register}
            fieldName='tags'
            auto='off'
            id='tags'
            necessary={true}
            type='text'
          />
          <div className='w-full items-start'>
            <TagListComponent
              tags={tags.tags}
              showIcon={true}
            />
          </div>
          <TextAreaComponent
            labelText={'Descripción'}
            register={props.register}
            fieldName={'description'}
            id={'description'}
            necessary={true}
          />
          <Controller
            name='content'
            defaultValue=''
            control={useForm().control}
            render={({ field }) => (
              <MarkdownAreaComponent
                value={field.value}
                onChange={newValue => field.onChange(newValue)}
                labelText='Contenido'
                className='p-2'
              />
            )}
          />
        </div>
      </BasicPanelComponent>
    </div>
  )
}

export default CreateNoteComponent