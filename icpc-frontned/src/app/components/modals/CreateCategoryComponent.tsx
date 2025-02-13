'use client'
import React, { useEffect } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { BasicPanelComponent } from '../panels/BasicPanelComponent'
import LogoComponent from '../LogoComponent'
import TextFieldComponent from '../forms/TextFieldComponent'
import SubmitComponent from '../forms/SubmitComponent'
import useUtilsStore from '@/store/useUtilsStore'
import { toast } from 'sonner'

interface CreateCategoryComponentProps {
  onClose: () => void
  categoryId?: string
}

const CreateCategoryComponent: React.FC<CreateCategoryComponentProps> = ({ onClose, categoryId }) => {
  const methods = useForm<FieldValues>()
  const createCategory = useUtilsStore(state => state.createCategory)
  // Ensure updateCategory is defined in your useUtilsStore
  const updateCategory = useUtilsStore(state => state.updateCategory || (() => Promise.resolve({})))
  const getCategory = useUtilsStore(state => state.getCategory)

  useEffect(() => {
    if (categoryId) {
      const loadCategory = async () => {
        const category = await getCategory(categoryId)
        if (category) {
          methods.setValue('categoryName', category.name)
        }
      }
      loadCategory()
    }
  }, [categoryId, getCategory, methods])

  const clearForm = () => {
    methods.reset()
  }

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    let response
    if (categoryId) {
      response = await updateCategory(categoryId, { name: String(data.categoryName) })
    } else {
      response = await createCategory({ name: String(data.categoryName), commentId: String(data.categoryName) })
    }

    if ('statusCode' in response && (response.statusCode === 201 || response.statusCode === 200)) {
      toast.success(response.message, {
        duration: 5000,
        style: {
          backgroundColor: 'green',
          color: '#FFFFFF'
        }
      })
      onClose()
    } else if ('message' in response) {
      toast.error(response.message, { duration: 5000, style: { backgroundColor: 'red', color: '#FFFFFF' } })
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-dark-primary p-4 rounded-lg shadow-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          &times;
        </button>
        <BasicPanelComponent backgroundColor='bg-white dark:bg-dark-primary'>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className='space-y-4'>
            <div className='flex flex-col items-center'>
              <LogoComponent size={100} />
              <h2 className='text-center text-lg font-bold dark:text-dark-accent'>
                {categoryId ? 'Editar categoría' : 'Crear nueva categoría'}
              </h2>
              <TextFieldComponent
                labelText='Nombre de la categoría'
                register={methods.register}
                fieldName='categoryName'
                id='categoryName'
                necessary={true}
                type='text'
              />
              <SubmitComponent text={categoryId ? 'Actualizar' : 'Crear'} />
            </div>
            <div className='mt-4'>
              <button
                type='button'
                onClick={clearForm}
                className='inline-flex items-center gap-x-2 rounded-md bg-primary text-complementary px-3.5 py-2.5 
                font-medium shadow-sm hover:bg-secondary focus-visible:outline 
                focus-visible:outline-offset-2 focus-visible:outline-complementary'>
                Borrar formulario
              </button>
            </div>
          </form>
        </BasicPanelComponent>
      </div>
    </div>
  )
}

export default CreateCategoryComponent