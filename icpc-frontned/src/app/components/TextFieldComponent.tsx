'use client'
import React from 'react'
import { TextComponent } from './TextComponent'
import { enumTextSizes, enumTextTags } from '@/constants/types'

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

const TextFieldComponent = ({ labelText, id, name, type, autocomplete, placeholder, classes, required }: Readonly<IInputProps>) => {
  if (labelText === '' && required) {
    return (
      <div className='m-4'>
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autocomplete}
          placeholder={placeholder}
          className={classes}
          required
        />
      </div>
    )
  } else if (labelText === '' && !required) {
    return (
      <div className='m-4'>
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autocomplete}
          placeholder={placeholder}
          className={classes}
        />
      </div>
    )
  } else if (labelText != '' && required) {
    return (
      <div className='m-4'>
        <TextComponent
          tag={enumTextTags.label}
          sizeFont={enumTextSizes.s12}>
          {labelText}
        </TextComponent>
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autocomplete}
          placeholder={placeholder}
          className={classes}
          required
        />
      </div>
    )
  } else {
    return (
      <div className='m-4'>
        <TextComponent
          tag={enumTextTags.label}
          sizeFont={enumTextSizes.s12}>
          {labelText}
        </TextComponent>
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autocomplete}
          placeholder={placeholder}
          className={classes}
        />
      </div>
    )
  }
}

export default TextFieldComponent
