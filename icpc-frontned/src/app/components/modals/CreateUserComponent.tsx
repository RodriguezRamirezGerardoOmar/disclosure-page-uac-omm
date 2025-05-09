'use client'
import React, { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { BasicPanelComponent } from '../panels/BasicPanelComponent'
import { enumTextTags } from '@/constants/types'
import LogoComponent from '../LogoComponent'
import { TextComponent } from '../text/TextComponent'
import TextFieldComponent from '../forms/TextFieldComponent'
import CheckboxComponent from '../forms/CheckboxComponent'
import SubmitComponent from '../forms/SubmitComponent'
import useStore, { IUser } from '@/store/useStore'
import { toast } from 'sonner'
import { ArrowUturnLeftIcon, XMarkIcon } from '@heroicons/react/20/solid'
import ConfirmDenyComponent from '../buttons/Confirm&DenyComponent'

interface ICreateUserProps {
  onClose: () => void
  id?: string
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

const CreateUserComponent = (props: ICreateUserProps) => {
  const methods = useForm<FieldValues>()
  const createUser = useStore(state => state.createUser)
  const updateUser = useStore(state => state.updateUser)
  const getUser = useStore(state => state.getUser)
  const user = useStore(state => state.user)
  const [currentUser, setCurrentUser] = useState<IUser>({} as IUser)
  const [showConfirm, setShowConfirm] = React.useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (props.id) {
          const user = await getUser(props.id)
          if (user) {
            methods.reset({
              name: user.name,
              lastName: user.lastName,
              userName: user.userName,
              email: user.email,
              isAdmin: user.isAdmin
            })
            setCurrentUser(user)
          } else {
            toast.error('No se encontró el usuario con el ID proporcionado.', {
              duration: 5000,
              style: {
                backgroundColor: '#ff0000',
                color: '#ffffff'
              }
            })
          }
        }
      } catch (error) {
        toast.error('Error al cargar los datos del usuario.', {
          duration: 5000,
          style: {
            backgroundColor: '#ff0000',
            color: '#ffffff'
          }
        })
      }
    }

    fetchUser()
  }, [props.id, methods, getUser])

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    const userData = {
      name: String(data.name),
      lastName: String(data.lastName),
      userName: String(data.userName),
      email: String(data.email),
      password: String(data.password),
      passwordVerify: String(data.passwordVerify),
      isAdmin: Boolean(data.isAdmin)
    }

    const response = props.id
      ? await updateUser(props.id, { ...userData, role: user!.role, editorId: user!.id })
      : await createUser(userData)
    if ('id' in response) {
      toast.success(`La cuenta de usuario se ha ${props.id ? 'actualizado' : 'creado'} con éxito.`, {
        duration: 5000,
        style: {
          backgroundColor: 'green',
          color: '#FFFFFF'
        }
      })
      props.onClose()
    } else if ('message' in response) {
      toast.error(response.message, {
        duration: 5000,
        style: {
          backgroundColor: 'red',
          color: '#FFFFFF'
        }
      })
    }
  }

  const clearForm = () => {
    if (props.id) {
      methods.reset({
        name: currentUser.name,
        lastName: currentUser.lastName,
        userName: currentUser.userName,
        email: currentUser.email,
        isAdmin: currentUser.isAdmin
      })
      methods.setValue('password', '')
      methods.setValue('passwordVerify', '')
    } else {
      methods.reset()
    }
  }

  return (
    <>
      {showConfirm && (
        <ConfirmDenyComponent
          onConfirm={() => {
            setShowConfirm(false)
            methods.handleSubmit(onSubmit)()
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
      <form
        onSubmit={e => {
          e.preventDefault()
          setShowConfirm(true)
        }}
        className={`margin-auto md:mx-auto max-w-14xl md:px-4 w-full h-full lg:px-10 lg:w-2/3 lg:h-auto 
      min-h-screen place-items-center justify-between py-24`}>
        <BasicPanelComponent backgroundColor='bg-white dark:bg-dark-primary w-full lg:w-2/3'>
          <div className='relative'>
            <div className='absolute top-0 right-0 flex gap-1 p-2'>
              <div
                className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 rounded'
                title='Restablecer formulario'>
                <button
                  type='button'
                  onClick={clearForm}
                  className='text-inherit'>
                  <ArrowUturnLeftIcon className='h-6 w-6' />
                </button>
              </div>
              <div
                className='p-2 hover:bg-gray-100 dark:hover:bg-red-700 transition-colors duration-200 rounded'
                title='Cerrar formulario'>
                <button
                  onClick={props.onClose}
                  className='text-inherit'>
                  <XMarkIcon className='h-6 w-6' />
                </button>
              </div>
            </div>
          </div>
          <div className='flex flex-col items-center'>
            <LogoComponent size={100} />
            <TextComponent
              tag={enumTextTags.h1}
              sizeFont='s16'
              className='dark:text-dark-accent'>
              {props.id ? 'Editar usuario' : 'Crear cuenta de usuario'}
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
              necessary={false}
              type='password'
            />
            <TextFieldComponent
              labelText='Verifique su contraseña'
              register={methods.register}
              fieldName='passwordVerify'
              id='passwordVerify'
              necessary={false}
              type='password'
            />
            <CheckboxComponent
              labelText='Permisos de administrador'
              fieldName='isAdmin'
              register={methods.register}
            />
            <SubmitComponent
              text={props.id ? 'Actualizar cuenta' : 'Crear cuenta'}
              action={() => {}}
            />
          </div>
        </BasicPanelComponent>
      </form>
    </>
  )
}

export default CreateUserComponent
