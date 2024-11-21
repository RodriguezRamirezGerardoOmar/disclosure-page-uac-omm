'use client';
import React from 'react';
import { UseFormReturn, FieldValues, SubmitHandler } from 'react-hook-form';
import { BasicPanelComponent } from '../panels/BasicPanelComponent';
import LogoComponent from '../LogoComponent'
import TextFieldComponent from '../forms/TextFieldComponent';
import SubmitComponent from '../forms/SubmitComponent';

/*  
Formulario para creación de etiquetas
Fecha: 12 - 11 - 2024  
*/

interface ICreateTagProps {
  methods: UseFormReturn<FieldValues>;
  onCreateTag: (TagName: string) => void;
}

const CreateTagComponent = ({
  methods,
  onCreateTag,
}: Readonly<ICreateTagProps>) => {
  const onSubmit: SubmitHandler<FieldValues> = data => {
    onCreateTag(String(data.TagName));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <BasicPanelComponent backgroundColor="bg-white dark:bg-dark-primary">
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        <div className='flex flex-col items-center'>
            <LogoComponent size={100} />
            <h2 className="text-center text-lg font-bold dark:text-dark-accent">
                Crear nueva etiqueta
            </h2>
            <TextFieldComponent
                labelText="Nombre de la etiqueta"
                register={methods.register}
                fieldName="TagName"
                id="TagName"
                necessary={true}
                type="text"
            />
            <SubmitComponent text="Crear" />
          </div>
        </form>
      </BasicPanelComponent>
    </div>
  );
};

export default CreateTagComponent;
