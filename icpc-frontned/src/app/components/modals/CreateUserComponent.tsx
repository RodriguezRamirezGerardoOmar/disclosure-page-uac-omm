'use client'
import React, { useEffect } from 'react'
import { UseFormReturn, FieldValues, SubmitHandler } from 'react-hook-form'
import { BasicPanelComponent } from '../panels/BasicPanelComponent'
import { enumTextTags } from '@/constants/types'
import LogoComponent from '../LogoComponent'
import { TextComponent } from '../text/TextComponent'
import TextFieldComponent from '../forms/TextFieldComponent'
import CheckboxComponent from '../forms/CheckboxComponent'
import SubmitComponent from '../forms/SubmitComponent'
import useStore from '@/store/useStore'
import { toast } from 'sonner'

interface ICreateUserProps {
  methods: UseFormReturn<FieldValues>
  onClose: () => void
}

/*
Input: a set of methods and a state to handle the form
Output: a modal form to create a user account
Return value: a modal form component used to create a user account
Function: creates a modal form component able to return the answers of a form
Variables: methods, response, createUser, onSubmit, toast, 
Date: 22 - 03 - 2024
Author: Gerardo Omar Rodriguez Ramirez
*/

const CreateUserComponent = ({ methods, onClose }: Readonly<ICreateUserProps>) => {
  const createUser = useStore(state => state.createUser)
  const updateUser = useStore(state => state.updateUser)

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    try {
      const response = methods.getValues('id') ? await updateUser(methods.getValues('id'), data) : await createUser(data)

      if ('id' in response) {
        toast.success('Operación exitosa', {
          duration: 5000,
          style: { backgroundColor: 'green', color: '#ffffff' }
        })
        onClose()
      } else if ('message' in response) {
        toast.error(response.message, {
          duration: 5000,
          style: { backgroundColor: '#ff0000', color: '#ffffff' }
        })
      } else {
        toast.error('Error inesperado', {
          duration: 5000,
          style: { backgroundColor: '#ff0000', color: '#ffffff' }
        })
      }
    } catch (error) {
      toast.error('Error al realizar la operación', {
        duration: 5000,
        style: { backgroundColor: '#ff0000', color: '#ffffff' }
      })
    }
  }

  return (
    <div
      className={`margin-auto md:mx-auto max-w-7xl md:px-4 w-full h-full lg:px-8 lg:w-2/3 lg:h-auto 
      min-h-screen place-items-center justify-between py-24`}>
      <BasicPanelComponent backgroundColor='bg-white dark:bg-dark-primary'>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className='flex flex-col items-center'>
            <LogoComponent size={100} />
            <TextComponent
              tag={enumTextTags.h1}
              sizeFont='s16'
              className='dark:text-dark-accent'>
              {methods.getValues('id') ? 'Editar cuenta de usuario' : 'Crear cuenta de usuario'}
            </TextComponent>
            <TextFieldComponent
              labelText='Nombre'
              register={methods.register}
              fieldName='name'
              id='name'
              necessary={true}
              type='text'
              auto='name'
            />
            <TextFieldComponent
              labelText='Apellido'
              register={methods.register}
              fieldName='lastName'
              id='lastName'
              necessary={true}
              type='text'
              auto='last-name'
            />
            <TextFieldComponent
              labelText='Nombre de usuario'
              register={methods.register}
              fieldName='userName'
              id='userName'
              necessary={true}
              type='text'
              auto='username'
            />
            <TextFieldComponent
              labelText='Correo electrónico'
              register={methods.register}
              fieldName='email'
              id='email'
              necessary={true}
              type='email'
              auto='email'
            />
            <TextFieldComponent
              labelText='Contraseña'
              register={methods.register}
              fieldName='password'
              id='password'
              necessary={true}
              type='password'
            />
            <TextFieldComponent
              labelText='Verifique su contraseña'
              register={methods.register}
              fieldName='passwordVerify'
              id='passwordVerify'
              necessary={true}
              type='password'
            />
            <CheckboxComponent
              labelText='Permisos de administrador'
              fieldName='isAdmin'
              register={methods.register}
            />
            <SubmitComponent text={methods.getValues('id') ? 'Actualizar cuenta' : 'Crear cuenta'} />
            <button
              type='button'
              onClick={onClose}
              className='mt-4 px-4 py-2 bg-red-500 text-white rounded-md'>
              Cerrar
            </button>
          </div>
        </form>
      </BasicPanelComponent>
    </div>
  )
}

export default CreateUserComponent
