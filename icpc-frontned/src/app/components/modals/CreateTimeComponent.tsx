'use client';
import React from 'react';
import { UseFormReturn, FieldValues, SubmitHandler } from 'react-hook-form';
import { BasicPanelComponent } from '../panels/BasicPanelComponent';
import LogoComponent from '../LogoComponent'
import TextFieldComponent from '../forms/TextFieldComponent';
import SubmitComponent from '../forms/SubmitComponent';

/*  
Formulario para creación de categorías
Fecha: 12 - 11 - 2024  
*/

interface ICreateTimeProps {
  methods: UseFormReturn<FieldValues>;
  onCreateTime: (TimeName: string) => void;
}

const CreateTimeComponent = ({
  methods,
  onCreateTime,
}: Readonly<ICreateTimeProps>) => {
  const onSubmit: SubmitHandler<FieldValues> = data => {
    onCreateTime(String(data.TimeName));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <BasicPanelComponent backgroundColor="bg-white dark:bg-dark-primary">
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        <div className='flex flex-col items-center'>
            <LogoComponent size={100} />
            <h2 className="text-center text-lg font-bold dark:text-dark-accent">
                Crear nuevo limite de tiempo
            </h2>
            <TextFieldComponent
                labelText="Valor del tiempo"
                register={methods.register}
                fieldName="TimeName"
                id="TimeName"
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

export default CreateTimeComponent;
