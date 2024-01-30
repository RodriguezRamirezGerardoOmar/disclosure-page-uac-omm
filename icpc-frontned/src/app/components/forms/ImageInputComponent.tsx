import React, { useRef } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import { TextComponent } from '../text/TextComponent'

interface IImageInputProps {
  register: UseFormRegister<FieldValues>
}

const ImageInputComponent = ({ ...props }: Readonly<IImageInputProps>) => {
    const fileElem = useRef(null);
  return (
    <button
      type='button'
      className={`relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center
       hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
       onClick={() => {
        (fileElem.current as unknown as HTMLInputElement)?.click();
      }}>
      <img
        className='mx-auto h-6 w-6'
        src='/icons/image.svg'
        alt='ícono'
      />
      <TextComponent
        className='mt-2 block font-semibold text-gray-900'
        sizeFont='s12'>
        Sube una imagen de portada
      </TextComponent>
      <input
        type='file'
        ref={fileElem}
        {...props.register}
        accept='image/*'
        className='hidden'></input>
    </button>
  )
}

export default ImageInputComponent
