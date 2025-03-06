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

const CreateUserComponent = ({ methods, onClose, id }: Readonly<ICreateUserProps>) => {
  const createUser = useStore(state => state.createUser)
  const updateUser = useStore(state => state.updateUser)
  const getUser = useStore(state => state.getUser)

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const user = await getUser(id)
          if (user) {
            methods.reset({
              name: user.name,
              lastName: user.lastName,
              userName: user.userName,
              email: user.email,
              isAdmin: user.isAdmin
            })
          } else {
            toast.error('No se encontró el usuario con el ID proporcionado.', {
              duration: 5000,
              style: {
                backgroundColor: '#ff0000',
                color: '#ffffff'
              }
            })
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
    }
  }, [id, methods, getUser])

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    try {
      const userData = {
        name: String(data.name),
        lastName: String(data.lastName),
        userName: String(data.userName),
        email: String(data.email),
        password: String(data.password),
        passwordVerify: String(data.passwordVerify),
        isAdmin: data.isAdmin
      }

      let response
      if (id) {
        response = await updateUser(userData, id)
      } else {
        response = await createUser(userData)
      }

      if ('id' in response) {
        toast.success(id ? 'Usuario actualizado con éxito' : 'Creación de usuario exitosa', {
          duration: 5000,
          style: {
            backgroundColor: 'green',
            color: '#ffffff'
          }
        })
        onClose()
      } else if ('message' in response) {
        toast.error(response.message, {
          duration: 5000,
          style: {
            backgroundColor: '#ff0000',
            color: '#ffffff'
          }
        })
      } else {
        toast.error('Error inesperado al crear/actualizar el usuario', {
          duration: 5000,
          style: {
            backgroundColor: '#ff0000',
            color: '#ffffff'
          }
        })
      }
    } catch (error) {
      toast.error('Error al crear/actualizar el usuario', {
        duration: 5000,
        style: {
          backgroundColor: '#ff0000',
          color: '#ffffff'
        }
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
              {id ? 'Editar usuario' : 'Crear cuenta de usuario'}
            </TextComponent>
            <TextFieldComponent
              labelText='Nombre'
              register={methods.register}
              fieldName='name'
              id='name'
              necessary={true}
              type='text'
              auto='name'></TextFieldComponent>
            <TextFieldComponent
              labelText='Apellido'
              register={methods.register}
              fieldName='lastName'
              id='lastName'
              necessary={true}
              type='text'
              auto='last-name'></TextFieldComponent>

            <TextFieldComponent
              labelText='Nombre de usuario'
              register={methods.register}
              fieldName='userName'
              id='userName'
              necessary={true}
              type='text'
              auto='username'></TextFieldComponent>

            <TextFieldComponent
              labelText='Correo electrónico'
              register={methods.register}
              fieldName='email'
              id='email'
              necessary={true}
              type='email'
              auto='email'></TextFieldComponent>

            {!id && (
              <>
                <TextFieldComponent
                  labelText={'Contraseña'}
                  register={methods.register}
                  fieldName={'password'}
                  id={'password'}
                  necessary={true}
                  type={'password'}></TextFieldComponent>

                <TextFieldComponent
                  labelText='Verifique su contraseña'
                  register={methods.register}
                  fieldName='passwordVerify'
                  id='passwordVerify'
                  necessary={true}
                  type='password'></TextFieldComponent>
              </>
            )}

            <CheckboxComponent
              labelText='Permisos de administrador'
              fieldName='isAdmin'
              register={methods.register}></CheckboxComponent>

            <SubmitComponent text={id ? 'Actualizar usuario' : 'Crear cuenta'} />
            <button
              type="button"
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Cerrar
            </button>
          </div>
        </form>
      </BasicPanelComponent>
    </div>
  )
}

export default CreateUserComponent
