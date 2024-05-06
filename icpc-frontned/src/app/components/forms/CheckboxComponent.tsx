import React from 'react'
import { TextComponent } from '../text/TextComponent'
import { enumTextTags } from '@/constants/types'
import { FieldValues, UseFormRegister } from 'react-hook-form'

interface ICheckboxProps {
    labelText: string
    fieldName: string
    register: UseFormRegister<FieldValues>
}

/*
Input: a label, a field name and a register function
Output: a checkbox with a label
Return value: a checkbox component to be used in a form
Function: creates a checkbox component to be used in a form
Variables: labelText, fieldName, register
Date: 21 - 03 - 2024
Author: Gerardo Omar Rodriguez Ramirez
*/

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