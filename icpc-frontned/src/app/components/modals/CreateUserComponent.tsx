'use client'
import React from 'react'
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
}
const CreateUserComponent = ({ ...props }: Readonly<ICreateUserProps>) => {
  const createUser = useStore(state => state.createUser)

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    const response = await createUser({
      name: String(data.name),
      lastName: String(data.lastName),
      userName: String(data.userName),
      email: String(data.email),
      password: String(data.password),
      passwordVerify: String(data.passwordVerify),
      isAdmin: data.isAdmin
    })

    if ('statusCode' in response && response.statusCode === 201) {
      toast.success(response.message, {
        duration: 5000,
        style: {
          backgroundColor: 'green',
          color: '#ffffff'
        }
      })
    } else {
      toast.error(response.message, {
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
        <form onSubmit={props.methods.handleSubmit(onSubmit)}>
          <div className='flex flex-col items-center'>
            <LogoComponent size={100} />
            <TextComponent
              tag={enumTextTags.h1}
              sizeFont='s16'
              className='dark:text-dark-accent'>
              Crear cuenta de usuario
            </TextComponent>
            <TextFieldComponent
              labelText='Nombre'
              register={props.methods.register}
              fieldName='name'
              id='name'
              necessary={true}
              type='text'
              auto='name'></TextFieldComponent>
            <TextFieldComponent
              labelText='Apellido'
              register={props.methods.register}
              fieldName='lastName'
              id='lastName'
              necessary={true}
              type='text'
              auto='last-name'></TextFieldComponent>

            <TextFieldComponent
              labelText='Nombre de usuario'
              register={props.methods.register}
              fieldName='userName'
              id='userName'
              necessary={true}
              type='text'
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
              fieldName='passwordVerify'
              id='passwordVerify'
              necessary={true}
              type='password'></TextFieldComponent>

            <CheckboxComponent
              labelText='Permisos de administrador'
              fieldName='isAdmin'
              register={props.methods.register}></CheckboxComponent>

            <SubmitComponent text='Crear cuenta' />
          </div>
        </form>
      </BasicPanelComponent>
    </div>
  )
}

export default CreateUserComponent
