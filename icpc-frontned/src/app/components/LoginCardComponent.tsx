'use client'
import React from 'react'
import TextFieldComponent from './TextFieldComponent'
import LogoComponent from './LogoComponent'
import { TextComponent } from './TextComponent'
import { enumTextSizes, enumTextTags } from '@/constants/types'
import CheckboxComponent from './CheckboxComponent'
import SubmitComponent from './SubmitComponent'

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
        <LogoComponent size={150} />
        <TextComponent
          tag={enumTextTags.h3}
          sizeFont={enumTextSizes.s36}>
          {label}
        </TextComponent>
      </div>
      {fields.map(field => {
        let component

        if (field.type === 'checkbox') {
          component = (
            <CheckboxComponent
              labelText={field.labelText}
              id={field.tagId}
              name={field.name}
              type={field.type}
              autocomplete={field.autocomplete}
              placeholder={field.placeholder}
              required={field.required}
              classes='px-4'
            />
          )
        } else if (field.type === 'submit') {
          component = (
            <SubmitComponent
              labelText={field.labelText}
              id={field.tagId}
              name={field.name}
              autocomplete=''
              placeholder=''
              required={field.required}
              classes='max-w-min bg-primary rounded-md py-2 px-4 text-complementary dark:bg-accent'
              type={field.type}
            />
          )
        } else {
          component = (
            <TextFieldComponent
              labelText={field.labelText}
              id={field.tagId}
              name={field.name}
              type={field.type}
              autocomplete={field.autocomplete}
              placeholder={field.placeholder}
              required={field.required}
              classes={classes}
            />
          )
        }

        return <div key={field.id}>{component}</div>
      })}
      <div className='flex justify-center'>
        <a
          href='#'
          className='hover:text-accent dark:text-accent dark:hover:text-complementary'>
          <TextComponent>Olvidé mi contraseña</TextComponent>
        </a>
      </div>
    </form>
  )
}

export default LoginCardComponent
