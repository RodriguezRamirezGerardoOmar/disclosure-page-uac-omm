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

/*
Input: a text to be used as a label, a register function, a name for the form field, an autocomplete attribute,
an id for the text field, a boolean that indicates if the field is required, a type for the input,
a class name for the component, a placeholder for the input
Output: a text field with a label
Return value: a text field component to be used in a form
Function: creates a component to write a single line of text in a form
Variables: labelText, register, fieldName, auto, id, necessary, type, className, placeholder, style
Date: 22 - 03 - 2024
Author: Gerardo Omar Rodriguez Ramirez
*/

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
