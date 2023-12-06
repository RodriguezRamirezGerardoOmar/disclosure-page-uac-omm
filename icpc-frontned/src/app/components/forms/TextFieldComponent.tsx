import React from 'react'
import { TextComponent } from '../text/TextComponent'
import { enumTextTags } from '@/constants/types'
import { FieldValues, UseFormRegister, useForm } from 'react-hook-form'

interface ITextFieldProps {
  labelText: string
  register: UseFormRegister<FieldValues>
  fieldName: string
  auto: 'email' | 'current-password' | 'new-password' | 'username'
  id: string
  necessary: boolean
  type: 'email' | 'password' | 'username' | 'text'
}

const labelClassname = 'place-self-start dark:text-dark-accent m-1'
const textFieldClassname =
  'block w-full rounded-md m-2 p-2 text-dark-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-accent'

const TextFieldComponent = ({ labelText, register, fieldName, auto, id, necessary, type }: Readonly<ITextFieldProps>) => {
  const {
    formState: { errors }
  } = useForm<Record<string, FieldValues>>()

  return (
    <div className='w-full'>
      <TextComponent
        htmlFor={id}
        className={labelClassname}
        tag={enumTextTags.label}>
        {labelText}
      </TextComponent>
      <input
        {...register(fieldName)}
        required={necessary}
        className={textFieldClassname}
        type={type}
        id={id}
        autoComplete={auto}
      />
      {errors[fieldName] && (
          <TextComponent
            tag={enumTextTags.span}
            className='text-error'>
            Es necesario llenar este campo
          </TextComponent>
        )}
    </div>
  )
}

export default TextFieldComponent
