'use client'
import React, { useRef, useState, useImperativeHandle, forwardRef, useEffect } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import { TextComponent } from '../text/TextComponent'

interface IImageInputProps {
  register: UseFormRegister<FieldValues>
  onChange: (newValue: File | null) => void
  fieldName: string
  value: File | null
  cover?: string
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

const ImageInputComponent = forwardRef(({ cover, ...props }: IImageInputProps, ref) => {
  const fileElem = useRef<HTMLInputElement>(null)
  const [image, setImage] = useState<string | null>(cover ?? null)
  const [selectedFile, setSelectedFile] = useState(!!cover)
  const iconURL = '/icons/image.svg'

  useImperativeHandle(ref, () => ({
    resetImageInput: (newCover: string | null = null) => {
      if (newCover) {
        setImage(`${process.env.NEXT_PUBLIC_API_URL}api/v1/image/${newCover}`)
        setSelectedFile(true)
        props.onChange(null)
      } else {
        setImage(null)
        setSelectedFile(false)
        props.onChange(null)
      }
      if (fileElem.current) {
        fileElem.current.value = ''
      }
    }
  }))

  useEffect(() => {
    if (cover) {
      setImage(`${process.env.NEXT_PUBLIC_API_URL}api/v1/image/${cover}`)
      setSelectedFile(true)
    } else {
      setImage(null)
      setSelectedFile(false)
    }
  }, [cover])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    if (file) {
      setImage(URL.createObjectURL(file))
      props.onChange(file)
      setSelectedFile(true)
    } else {
      setImage(null)
      props.onChange(null)
      setSelectedFile(false)
    }
  }

  return (
    <button
      type='button'
      className='relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center
       hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 overflow-hidden'
      onClick={() => fileElem.current?.click()}>
      <div className='flex items-center justify-center w-full h-40 max-h-40'>
        <img
          className='max-w-96 max-h-full object-contain'
          src={selectedFile && image ? image : iconURL}
          alt='Ícono de subida'
        />
      </div>
      <TextComponent
        className='mt-2 block font-semibold text-gray-900 dark:text-dark-accent'
        sizeFont='s12'>
        {selectedFile ? 'Imagen seleccionada' : 'Sube una imagen de portada'}
      </TextComponent>
      <input
        {...props.register(props.fieldName)}
        type='file'
        ref={fileElem}
        accept='image/*'
        className='hidden'
        onChange={handleFileChange}
      />
    </button>
  )
})

ImageInputComponent.displayName = 'ImageInputComponent'

export default ImageInputComponent
