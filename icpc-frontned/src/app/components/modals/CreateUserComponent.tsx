'use client'
import React from 'react'
import { UseFormReturn, FieldValues, RegisterOptions, UseFormRegisterReturn } from 'react-hook-form'
import { BasicPanelComponent } from '../panels/BasicPanelComponent'
import { enumTextTags } from '@/constants/types'
import LogoComponent from '../LogoComponent'
import { TextComponent } from '../text/TextComponent'
import TextFieldComponent from '../forms/TextFieldComponent'
import CheckboxComponent from '../forms/CheckboxComponent'
import SubmitComponent from '../forms/SubmitComponent'
interface ICreateUserProps {
  methods: UseFormReturn<FieldValues>
}
const CreateUserComponent = ({ ...props }: Readonly<ICreateUserProps>) => {
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
            labelText='Nombre de usuario'
            register={props.methods.register}
            fieldName='username'
            id='username'
            necessary={true}
            type='username'
            auto='username'></TextFieldComponent>

          <TextFieldComponent
            labelText='Correo electrónico'
            register={props.methods.register}
            fieldName='email'
            id='email'
            necessary={true}
            type='email'
            auto='email'></TextFieldComponent>

          <TextFieldComponent
            labelText={'Contraseña'}
            register={props.methods.register}
            fieldName={'password'}
            id={'password'}
            necessary={true}
            type={'password'}></TextFieldComponent>

          <TextFieldComponent
            labelText='Verifique su contraseña'
            register={props.methods.register}
            fieldName='password-verify'
            id='password-verify'
            necessary={true}
            type='password'></TextFieldComponent>

          <CheckboxComponent
            labelText='Permisos de administrador'
            fieldName='isAdmin'
            register={props.methods.register}></CheckboxComponent>

          <SubmitComponent text='Crear cuenta' />
        </div>
      </BasicPanelComponent>
    </div>
  )
}

export default CreateUserComponent
