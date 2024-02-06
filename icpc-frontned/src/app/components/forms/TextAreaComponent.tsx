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

const TextAreaComponent = ({ labelText, register, fieldName, id, necessary }: Readonly<ITextAreaProps>) => {
  return (
    <div className='w-full m-2 min-h-max'>
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
