"use client"
import React, { useRef } from 'react';
import { FieldValues, UseFormRegister, FieldPathValue } from 'react-hook-form';
import { TextComponent } from '../text/TextComponent';

interface IImageInputProps {
  register: UseFormRegister<FieldValues>;
setValue: (name: FieldPathValue<FieldValues, string>, value: any, options?: { shouldDirty?: boolean }) => void;
  fieldName: string;
}

const ImageInputComponent = ({ ...props }: Readonly<IImageInputProps>) => {
  const fileElem = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target?.files?.[0];

    if (selectedFile) {
      // Actualiza el valor del campo de archivo en el formulario
      props.setValue(props.fieldName, selectedFile, { shouldDirty: true });
    }
  };

  return (
    <button
      type='button'
      className={`relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center
       hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
      onClick={() => {
        fileElem.current?.click();
      }}
    >
      <img
        className='mx-auto h-6 w-6'
        src='/icons/image.svg'
        alt='ícono'
      />
      <TextComponent
        className='mt-2 block font-semibold text-gray-900'
        sizeFont='s12'
      >
        Sube una imagen de portada
      </TextComponent>
      <input
        type='file'
        ref={fileElem}
        accept='image/*'
        className='hidden'
        onChange={handleFileChange}
        name={props.fieldName}
      />
    </button>
  );
};

export default ImageInputComponent;

