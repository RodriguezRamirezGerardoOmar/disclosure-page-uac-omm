'use client';
import React from 'react';
import { UseFormReturn, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { BasicPanelComponent } from '../panels/BasicPanelComponent';
import LogoComponent from '../LogoComponent'
import TextFieldComponent from '../forms/TextFieldComponent';
import SubmitComponent from '../forms/SubmitComponent';
import { SelectComponent } from '@/app/components/dropdowns/SelectComponent';
import useUtilsStore from '@/store/useUtilsStore'
import { toast } from 'sonner'

/*  
Formulario para creación de categorías
Fecha: 12 - 11 - 2024  
*/

const CreateMemoryComponent = () => {
  const methods = useForm<FieldValues>()
  const createMemory = useUtilsStore(state => state.createMemory)
  const onSubmit: SubmitHandler<FieldValues> = async data => {
    const response = await createMemory(parseInt(data.MemoryName))
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

const MemorySelect = [{  
  index: 0, 
  id: "KB", 
  name: "KB"
},{
  index: 1, 
  id: "GB", 
  name: "GB"
},{
  index: 2, 
  id: "MB", 
  name: "MB"
}]

  return (
    <div className={`margin-auto md:mx-auto max-w-2xl md:px-4 w-full h-full lg:px-8 lg:w-2/3 lg:h-auto 
    min-h-screen place-items-center justify-between py-24`}>
      <BasicPanelComponent backgroundColor="bg-white dark:bg-dark-primary">
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        <div className='flex flex-col items-center'>
            <LogoComponent size={100} />
            <h2 className="text-center text-lg font-bold dark:text-dark-accent">
                Crear nuevo limite de memoria
            </h2>
            <div className='flex items-end'>
              <div className='w-[70%]'>
                <TextFieldComponent
                  labelText="Valor de la memoria en GB"
                  register={methods.register}
                  fieldName="MemoryName"
                  id="MemoryName"
                  necessary={true}
                  type="text"
                />
              </div>
              <div className='w-[30%]' >
                <SelectComponent options={MemorySelect} fieldName={'magnitud'} id={'magnitud'} labelText={''} onChange={function (value: string): void {
                  throw new Error('Function not implemented.');
                } }/>
              </div>
            </div>
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

export default CreateMemoryComponent;