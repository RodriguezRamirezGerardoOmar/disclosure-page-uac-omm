'use client'

import React, { useEffect, useState } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

interface IColorPickerProps {
  register: UseFormRegister<FieldValues>
  fieldName: string
  id: string
  className?: string
}

/*
Input: register (react-hook-form register function), fieldName (name of the form field), 
id (unique identifier for the input), className (optional custom styles)
Output: a color picker input field integrated with react-hook-form
Return value: a component used in forms to select a color value
Function: renders a color input field, manages its state, and integrates with form validation and submission
Variables: register, fieldName, id, className, color, setColor
Date: 28 - 05 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

const ColorPickerComponent = ({ register, fieldName, id }: Readonly<IColorPickerProps>) => {
  const [color, setColor] = useState('#000000')
  useEffect(() => {
  }, [color])
  return (
    <input
      type='color' {...register(fieldName)} id={id}
      onChange={(e) => setColor(e.target.value)} className='h-8 rounded-md mx-4 my-1'></input>
  )
}

export default ColorPickerComponent
