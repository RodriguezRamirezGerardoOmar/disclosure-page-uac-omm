'use client'
import React from 'react'
import { UseFormReturn, FieldValues, Controller } from 'react-hook-form'
import { BasicPanelComponent } from '../panels/BasicPanelComponent'
import { enumTextTags } from '@/constants/types'
import LogoComponent from '../LogoComponent'
import { TextComponent } from '../text/TextComponent'
import TextFieldComponent from '../forms/TextFieldComponent'
import SubmitComponent from '../forms/SubmitComponent'
import ImageInputComponent from '../forms/ImageInputComponent'
import MarkdownAreaComponent from '../forms/MarkdownAreaComponent'

interface ICreateUserProps {
  methods: UseFormReturn<FieldValues>
}
const CreateNewsComponent = ({ ...props }: Readonly<ICreateUserProps>) => {
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
            Crear noticia
          </TextComponent>

          <TextFieldComponent
            labelText='Título'
            fieldName='title'
            id='title'
            register={props.methods.register}
            necessary={true}
            auto='off'
            type='text'
            className='m-4'
          />
          <Controller
            name='image'
            defaultValue=''
            control={props.methods.control}
            render={({}) => (
              <ImageInputComponent
                register={props.methods.register}
                setValue={props.methods.setValue}
                fieldName='image'
              />
            )}
          />

          <Controller
            name='content'
            defaultValue=''
            control={props.methods.control}
            render={({ field }) => (
              <MarkdownAreaComponent
                value={field.value}
                onChange={newValue => field.onChange(newValue)}
                labelText='Cuerpo de la noticia'
                className='p-2'
              />
            )}
          />
          <SubmitComponent text='Crear noticia' />
        </div>
      </BasicPanelComponent>
    </div>
  )
}

export default CreateNewsComponent
