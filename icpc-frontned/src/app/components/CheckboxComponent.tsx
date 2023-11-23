'use client'

import React from 'react'
import { TextComponent } from './TextComponent'

interface IInputProps {
  labelText: string
  id: string
  name: string
  type: string
  autocomplete: string
  placeholder: string
  required: boolean
  classes: string
}

const CheckboxComponent = ({ labelText, id, name, type, classes, required }: Readonly<IInputProps>) => {
  return (
    <div className='flex flex-row m-4 gap-2'>
      <input
        id={id}
        name={name}
        type={type}
        className={classes}
        required={required}
      />
      <TextComponent>{labelText}</TextComponent>
    </div>
  )
}

export default CheckboxComponent
