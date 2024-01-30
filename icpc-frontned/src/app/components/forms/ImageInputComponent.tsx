import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

interface IImageInputProps {
    register: UseFormRegister<FieldValues>
}

const ImageInputComponent = ({...props}: Readonly<IImageInputProps>) => {
  return (
    <input type='file' {...props.register} accept='image/*'></input>
  )
}

export default ImageInputComponent