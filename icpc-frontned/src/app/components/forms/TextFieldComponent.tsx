import React from 'react'
import { TextComponent } from '../text/TextComponent'
import { enumTextTags } from '@/constants/types'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import cn from 'classnames'

interface ITextFieldProps {
  labelText: string
  register: UseFormRegister<FieldValues>
  fieldName: string
  auto?: 'email' | 'current-password' | 'new-password' | 'username' | 'off' | 'name' | 'last-name'
  id: string
  necessary: boolean
  type: 'email' | 'password' | 'username' | 'text'
  className?: string
  placeholder?: string
}

const labelClassname = 'place-self-start dark:text-dark-accent my-2'
const textFieldClassname =
  'block w-full rounded-md p-2 text-dark-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-accent'

const TextFieldComponent = ({ labelText, placeholder, register, fieldName, auto, id, necessary, type, className }: Readonly<ITextFieldProps>) => {
  const style = cn(className, 'w-full min-h-max')
  return (
    <div className={style}>
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
        placeholder={placeholder}
      />
    </div>
  )
}

export default TextFieldComponent
