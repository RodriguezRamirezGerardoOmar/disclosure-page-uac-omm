import { SubmitHandler, useForm } from 'react-hook-form'
import LogoComponent from '../LogoComponent'
import { TextComponent } from '../text/TextComponent'
import { enumTextTags } from '@/constants/types'
import React, { ReactNode } from 'react'
import SubmitComponent from '../forms/SubmitComponent'

type FormData = {
  newPassword: string
  confirmation: string
}

type FormProps = {
  defaultValues?: Record<string, any>
  children: ReactNode
  onSubmit: SubmitHandler<any>
  label: string
}

export default function PasswordCardComponent({defaultValues, label, children, onSubmit}: Readonly<FormProps>) {
  const { formState: { errors } } = useForm<FormData>()
  const methods = useForm({ defaultValues })
  const { handleSubmit } = methods

  return (
    <div className='md:mx-auto max-w-7xl md:px-4 w-full h-full lg:px-8 lg:w-2/3 lg:h-auto'>
      {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
      <div className='mx-auto max-w-3xl bg-gray-300 dark:bg-dark-primary rounded-md p-2 shadow-lg'>
        <div className='w-full grid grid-cols-1 place-items-center'>
          <LogoComponent size={150} />
          <TextComponent
            tag={enumTextTags.h3}
            sizeFont='s36'
            className='dark:text-dark-accent'>
            Nueva contraseña
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
                    key: child.props.name
                  }
                })
              : child
          })}
          <SubmitComponent />
        </form>
      </div>
    </div>
  )
}
