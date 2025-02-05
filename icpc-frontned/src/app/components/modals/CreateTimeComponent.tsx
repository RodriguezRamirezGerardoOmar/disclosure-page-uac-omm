'use client';
import React from 'react';
import { UseFormReturn, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { BasicPanelComponent } from '../panels/BasicPanelComponent';
import LogoComponent from '../LogoComponent'
import TextFieldComponent from '../forms/TextFieldComponent';
import SubmitComponent from '../forms/SubmitComponent';
import useUtilsStore from '@/store/useUtilsStore'
import { toast } from 'sonner'

const CreateTimeLimitComponent = () => {
  const methods = useForm<FieldValues>()
  const createTimeLimit = useUtilsStore(state => state.createTimeLimit)
  const onSubmit: SubmitHandler<FieldValues> = async data => {
    const timeLimitValue = parseInt(data.TimeLimitName, 10);
    if (isNaN(timeLimitValue)) {
      toast.error('El valor del tiempo debe ser un número válido', { duration: 5000, style: { backgroundColor: 'red', color: '#FFFFFF' } });
      return;
    }

    const response = await createTimeLimit(timeLimitValue);
    if ('statusCode' in response && response.statusCode === 201) {
      toast.success(response.message, {
        duration: 5000,
        style: {
          backgroundColor: 'green',
          color: '#FFFFFF'
        }
      })
    } else if ('message' in response) {
      toast.error(response.message, { duration: 5000, style: { backgroundColor: 'red', color: '#FFFFFF' } })
    }
  }

  return (
    <div className={`margin-auto md:mx-auto max-w-2xl md:px-4 w-full h-full lg:px-8 lg:w-2/3 lg:h-auto 
    min-h-screen place-items-center justify-between py-24`}>
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
                fieldName="TimeLimitName"
                id="TimeLimitName"
                necessary={true}
                type="number"  // Cambiado a "number"
            />
            <SubmitComponent text="Crear" />
          </div>
          <div className='mt-4'>
          <button
            type='button'
            className='inline-flex items-center gap-x-2 rounded-md bg-primary text-complementary px-3.5 py-2.5 
              font-medium shadow-sm hover:bg-secondary focus-visible:outline 
              focus-visible:outline-offset-2 focus-visible:outline-complementary'
            >
            {}Borrar formulario
          </button>
        </div>
        </form>
      </BasicPanelComponent>
    </div>
  );
};

export default CreateTimeLimitComponent;