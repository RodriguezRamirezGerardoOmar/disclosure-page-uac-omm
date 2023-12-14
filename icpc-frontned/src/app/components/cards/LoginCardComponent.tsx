'use client'
import { SubmitHandler, useForm } from 'react-hook-form'
import LogoComponent from '../LogoComponent'
import { enumTextTags } from '@/constants/types'
import Link from 'next/link'
import { TextComponent } from '../text/TextComponent'
import React, { ReactNode } from 'react'
import SubmitComponent from '../forms/SubmitComponent'

type FormData = {
  username: string
  password: string
  rememberMe: boolean
}

type FormProps = {
  children: ReactNode
  onSubmit: SubmitHandler<any>
  label: string
}

export default function LoginCardComponent({ children, onSubmit, ...props }: Readonly<FormProps>) {
  const methods = useForm<FormData>()
  const { handleSubmit } = methods

  return (
    <div className='md:mx-auto max-w-7xl md:px-4 w-full h-full lg:px-8 lg:w-2/3 lg:h-auto'>
      <div className='mx-auto max-w-xl bg-gray-300 dark:bg-dark-primary rounded-md px-4 py-4 shadow-lg'>
        <div className='w-full grid grid-cols-1 place-items-center'>
          <LogoComponent size={150} />
          <TextComponent
            tag={enumTextTags.h3}
            sizeFont='s36'
            className='dark:text-dark-accent'>
            {props.label}
          </TextComponent>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='m-2 flex flex-col columns-1 place-items-center'>
          {React.Children.map(children, child => {
            return child && React.isValidElement(child)
              ? React.cloneElement(child, {
                  ...{
                    ...child.props,
                    register: methods.register,
                    control: methods.control,
                    key: child.props.name
                  }
                })
              : child
          })}

          <SubmitComponent text='Iniciar sesión'/>
          <Link
            href='/forgot'
            className='underline self-center hover:text-secondary dark:text-dark-accent dark:hover:text-dark-complementary m-2'>
            <TextComponent
              tag={enumTextTags.p}
              sizeFont='s12'>
              Olvidé mi contraseña
            </TextComponent>
          </Link>
        </form>
      </div>
    </div>
  )
}
