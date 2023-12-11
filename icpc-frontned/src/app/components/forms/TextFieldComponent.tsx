import React from 'react'
import { TextComponent } from '../text/TextComponent'
import { enumTextTags } from '@/constants/types'
import { FieldValues, UseFormRegister } from 'react-hook-form'

interface ITextFieldProps {
  labelText: string
  register: UseFormRegister<FieldValues>
  fieldName: string
  auto: 'email' | 'current-password' | 'new-password' | 'username'
  id: string
  necessary: boolean
  type: 'email' | 'password' | 'username' | 'text'
}

const labelClassname = 'place-self-start dark:text-dark-accent my-2'
const textFieldClassname =
  'block w-full rounded-md p-2 text-dark-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-accent'

const TextFieldComponent = ({ labelText, register, fieldName, auto, id, necessary, type }: Readonly<ITextFieldProps>) => {
  return (
    <div className='w-full p-2 m-2 min-h-max'>
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
    </div>
  )
}

export default TextFieldComponent
