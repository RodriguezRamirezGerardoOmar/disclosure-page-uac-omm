'use client'
import React, { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { BasicPanelComponent } from '../panels/BasicPanelComponent'
import LogoComponent from '../LogoComponent'
import TextFieldComponent from '../forms/TextFieldComponent'
import SubmitComponent from '../forms/SubmitComponent'
import useUtilsStore from '@/store/useUtilsStore'
import { toast } from 'sonner'
import { Categories } from '@/constants/types'
import { ArrowUturnLeftIcon, XMarkIcon } from '@heroicons/react/20/solid'

interface CreateCategoryComponentProps {
  onClose: () => void
  categoryId?: string
}

const CreateCategoryComponent: React.FC<CreateCategoryComponentProps> = ({ onClose, categoryId }) => {
  const methods = useForm<FieldValues>()
  const createCategory = useUtilsStore(state => state.createCategory)
  const updateCategory = useUtilsStore(state => state.updateCategory || (() => Promise.resolve({})))
  const getCategory = useUtilsStore(state => state.getCategory)
  const [currentCategory, setCurrentCategory] = useState<Categories>({} as Categories)

  useEffect(() => {
    if (categoryId) {
      const loadCategory = async () => {
        const category = await getCategory(categoryId)
        if (category) {
          methods.setValue('categoryName', category.name)
          setCurrentCategory(category)
        }
      }
      loadCategory()
    }
  }, [categoryId, getCategory, methods])

  const clearForm = () => {
    if (categoryId) {
      methods.reset({
        categoryName: currentCategory.name
      })
    } else {
      methods.reset()
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    let response
    if (categoryId) {
      response = await updateCategory(categoryId, { name: String(data.categoryName) })
    } else {
      response = await createCategory({ name: String(data.categoryName), commentId: String(data.categoryName) })
    }

    if ('id' in response) {
      toast.success(`La categoría se ha ${categoryId ? 'editado' : 'creado'} con éxito.`, {
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
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white dark:bg-dark-primary p-4 rounded-lg shadow-lg relative w-1/3'>
        <div className='relative'>
          <div className='absolute top-0 right-0 flex gap-1 p-2'>
            <div
              className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 rounded'
              title='Restablecer formulario'>
              <button
                type='button'
                onClick={clearForm}
                className='text-inherit' // Color heredado del padre
              >
                <ArrowUturnLeftIcon className='h-6 w-6' />
              </button>
            </div>
            <div
              className='p-2 hover:bg-gray-100 dark:hover:bg-red-700 transition-colors duration-200 rounded'
              title='Cerrar formulario'>
              <button
                onClick={onClose}
                className='text-inherit' // Color heredado del padre
              >
                <XMarkIcon className='h-6 w-6' />
              </button>
            </div>
          </div>
        </div>
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
              <SubmitComponent
                text={categoryId ? 'Actualizar' : 'Crear'}
                action={() => {}}
              />
            </div>
          </form>
        </BasicPanelComponent>
      </div>
    </div>
  )
}

export default CreateCategoryComponent
