'use client'
import React, { useRef, useState } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import { TextComponent } from '../text/TextComponent'

interface IImageInputProps {
  register: UseFormRegister<FieldValues>
  onChange: (newValue: any) => void
  fieldName: string
  value: any
}

/*
Input: a register function, a setValue function and a field name
Output: a form input to upload an image
Return value: a form input to upload an image to a form
Function: creates a form input component
Variables: register, setValue, fieldName, fileElem, selectedFile, handleFileChange
Date: 21 - 03 - 2024
Author: Gerardo Omar Rodriguez Ramirez
*/

const ImageInputComponent = ({ ...props }: Readonly<IImageInputProps>) => {
  const fileElem = useRef<HTMLInputElement>(null)
  const [image, setImage] = useState('')
  const [selectedFile, setSelectedFile] = useState(false)
  const iconURL = '/icons/image.svg'

  return (
    <button
      type='button'
      className={`relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center
       hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
      onClick={() => {
        fileElem.current?.click()
      }}>
      <img
        className={selectedFile ? 'mx-auto' : 'mx-auto h-6 w-6'}
        src={selectedFile ? image : iconURL}
        alt='ícono'
      />
      <TextComponent
        className='mt-2 block font-semibold text-gray-900'
        sizeFont='s12'>
        {selectedFile ? 'Imagen seleccionada' : 'Sube una imagen de portada'}
      </TextComponent>
      <input
        {...props.register(props.fieldName)}
        type='file'
        ref={fileElem}
        accept='image/*'
        className='hidden'
        onChange={e => {
          if (e.target.files) {
            setImage(URL.createObjectURL(e.target.files[0]))
            props.onChange(e.target.files[0])
            setSelectedFile(true)
          }
        }}
      />
    </button>
  )
}

export default ImageInputComponent
