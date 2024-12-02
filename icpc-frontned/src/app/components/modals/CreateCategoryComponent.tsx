'use client'
import React from 'react'
import { UseFormReturn, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { BasicPanelComponent } from '../panels/BasicPanelComponent'
import LogoComponent from '../LogoComponent'
import TextFieldComponent from '../forms/TextFieldComponent'
import SubmitComponent from '../forms/SubmitComponent'
import useUtilsStore from '@/store/useUtilsStore'
import { toast } from 'sonner'

/*  
Formulario para creación de categorías
Fecha: 12 - 11 - 2024  
*/

const CreateCategoryComponent = () => {
  const methods = useForm<FieldValues>()
  const createCategory = useUtilsStore(state => state.createCategory)
  const onSubmit: SubmitHandler<FieldValues> = async data => {
    const response = await createCategory({ name: String(data.categoryName), commentId: String(data.categoryName) })
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
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <BasicPanelComponent backgroundColor='bg-white dark:bg-dark-primary'>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className='space-y-4'>
          <div className='flex flex-col items-center'>
            <LogoComponent size={100} />
            <h2 className='text-center text-lg font-bold dark:text-dark-accent'>Crear nueva categoría</h2>
            <TextFieldComponent
              labelText='Nombre de la categoría'
              register={methods.register}
              fieldName='categoryName'
              id='categoryName'
              necessary={true}
              type='text'
            />
            <SubmitComponent text='Crear' />
          </div>
        </form>
      </BasicPanelComponent>
    </div>
  )
}

export default CreateCategoryComponent
