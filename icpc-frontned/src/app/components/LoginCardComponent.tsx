'use client'
import React from 'react'
import TextFieldComponent from './TextFieldComponent'
import LogoComponent from './LogoComponent'
import { TextComponent } from './TextComponent'
import { enumTextSizes, enumTextTags } from '@/constants/types'

interface IFormCardProps {
  fields: {
    id: number
    labelText: string
    type: string
    tagId: string
    name: string
    autocomplete: string
    placeholder: string
    required: boolean
  }[]
  classes: string
  className: string
  label: string
}

const LoginCardComponent = ({ fields, classes, className, label }: Readonly<IFormCardProps>) => {
  return (
    <form className={className}>
      <div className='w-full grid grid-cols-1 place-items-center'>
        <LogoComponent
          size={150}
        />
        <TextComponent
          tag={enumTextTags.h3}
          sizeFont={enumTextSizes.s20}
          className='dark:text-accent'>
          {label}
        </TextComponent>
      </div>
      {fields.map(field => (
        <TextFieldComponent
          key={field.id}
          labelText={field.labelText}
          id={field.tagId}
          name={field.name}
          type={field.type}
          autocomplete={field.autocomplete}
          placeholder={field.placeholder}
          required={false}
          classes={classes}
        />
      ))}
    </form>
  )
}

export default LoginCardComponent
