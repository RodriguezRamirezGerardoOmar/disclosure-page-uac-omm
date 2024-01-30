'use client'
import React from 'react'
import { UseFormReturn, FieldValues } from 'react-hook-form'
import { BasicPanelComponent } from '../panels/BasicPanelComponent'
import { enumTextTags } from '@/constants/types'
import LogoComponent from '../LogoComponent'
import { TextComponent } from '../text/TextComponent'
import TextFieldComponent from '../forms/TextFieldComponent'
import CheckboxComponent from '../forms/CheckboxComponent'
import SubmitComponent from '../forms/SubmitComponent'
import ImageInputComponent from '../forms/ImageInputComponent'

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
            Crear cuenta de usuario
          </TextComponent>

          <TextFieldComponent
            labelText='Título'
            fieldName='title'
            id='title'
            register={props.methods.register}
            necessary={true}
            auto='email'
            type='text'
          />
          <ImageInputComponent register={props.methods.register}/>
          <SubmitComponent text='Publicar noticia' />
        </div>
      </BasicPanelComponent>
    </div>
  )
}

export default CreateNewsComponent
