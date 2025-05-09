import React from 'react'
import { TextComponent } from '../text/TextComponent'
import { enumTextTags } from '@/constants/types'
import { FieldValues, UseFormRegister } from 'react-hook-form'

interface ITextAreaProps {
  labelText: string
  register: UseFormRegister<FieldValues>
  fieldName: string
  id: string
  necessary: boolean
}

const labelClassname = 'place-self-start dark:text-dark-accent my-2'
const textAreaClassname = `block w-full rounded-md p-2 text-dark-primary shadow-sm
ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-accent h-20 text-wrap overflow-y-auto`

/*
Input: a text to use as a label, a register function, a name for the form field,
an id for the text area, a boolean that indicates if the field is required
Output: a text area with a label 
Return value: a text area component to be used in a form
Function: creates a text area component to write a long paragraph in a form
Variables: labelText, register, fieldName, id, necessary
Date: 22 - 03 - 2024
Author: Gerardo Omar Rodriguez Ramirez
*/

const TextAreaComponent = ({ labelText, register, fieldName, id, necessary }: Readonly<ITextAreaProps>) => {
  return (
    <div className='w-full min-h-max'>
      <TextComponent
        htmlFor={id}
        className={labelClassname}
        tag={enumTextTags.label}>
        {labelText}
      </TextComponent>
      <textarea
        {...register(fieldName)}
        required={necessary}
        className={textAreaClassname}
        id={id}
      />
    </div>
  )
}

export default TextAreaComponent
