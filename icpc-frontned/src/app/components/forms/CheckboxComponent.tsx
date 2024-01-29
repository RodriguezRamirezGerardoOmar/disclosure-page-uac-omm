import React from 'react'
import { TextComponent } from '../text/TextComponent'
import { enumTextTags } from '@/constants/types'
import { FieldValues, UseFormRegister } from 'react-hook-form'

interface ICheckboxProps {
    labelText: string
    fieldName: string
    register: UseFormRegister<FieldValues>
}

const CheckboxComponent = ({labelText, register, fieldName }: Readonly<ICheckboxProps>) => {
  return (
    <div className='place-self-start flex flex-row m-2 items-center'>
            <input
              type='checkbox'
              {...register(fieldName)}
            />
            <TextComponent
              tag={enumTextTags.p}
              className='mx-2 dark:text-dark-accent'>
              {labelText}
            </TextComponent>
          </div>
  )
}

export default CheckboxComponent