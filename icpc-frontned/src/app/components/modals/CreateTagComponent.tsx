'use client'
import React, { useEffect, useState } from 'react'
import { UseFormReturn, FieldValues, SubmitHandler } from 'react-hook-form'
import { BasicPanelComponent } from '../panels/BasicPanelComponent'
import LogoComponent from '../LogoComponent'
import TextFieldComponent from '../forms/TextFieldComponent'
import SubmitComponent from '../forms/SubmitComponent'
import ColorPickerComponent from '@/app/components/forms/ColorPickerComponent'
import useUtilsStore from '@/store/useUtilsStore'
import { toast } from 'sonner'
import { Tags } from '@/constants/types'
import { ArrowUturnLeftIcon, XMarkIcon } from '@heroicons/react/20/solid'

interface CreateTagComponentProps {
  methods: UseFormReturn<FieldValues>
  onCreateTag: (tagName: string) => void
  tagId?: string
  onClose: () => void
}

const CreateTagComponent: React.FC<CreateTagComponentProps> = ({ methods, onCreateTag, tagId, onClose }) => {
  const createTag = useUtilsStore(state => state.createTag)
  const updateTag = useUtilsStore(state => state.updateTag)
  const getTags = useUtilsStore(state => state.getTags)
  const [currentTag, setCurrentTag] = useState({} as Tags)

  useEffect(() => {
    const loadTag = async () => {
      if (tagId) {
        const tags = await getTags()
        const tag = tags.find(t => t.id === tagId)
        if (tag) {
          methods.setValue('name', tag.name)
          methods.setValue('color', `#${tag.color}`)
          setCurrentTag(tag)
        }
      } else {
        methods.reset({
          name: '',
          color: ''
        })
        setCurrentTag({} as Tags)
      }
    }
    loadTag()
  }, [tagId, getTags, methods])

  const clearForm = () => {
    if (tagId) {
      methods.reset({
        name: currentTag.name,
        color: `#${currentTag.color}`
      })
    } else methods.reset()
  }

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    const color = String(data.color).replace('#', '')
    let response
    if (tagId) {
      response = await updateTag(tagId, { name: String(data.name), color })
    } else {
      response = await createTag({ name: String(data.name), color })
    }

    if ('id' in response) {
      toast.success(`La etiqueta se ha ${tagId ? 'editado' : 'creado'} con éxito.`, {
        duration: 5000,
        style: {
          backgroundColor: 'green',
          color: '#FFFFFF'
        }
      })
      onCreateTag(data.name)
      onClose()
    } else if ('message' in response) {
      toast.error(response.message, { duration: 5000, style: { backgroundColor: 'red', color: '#FFFFFF' } })
    }
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='relative bg-white dark:bg-dark-primary p-4 rounded-lg shadow-lg'>
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
              <h2 className='text-center text-lg font-bold dark:text-dark-accent'>{tagId ? 'Editar etiqueta' : 'Crear nueva etiqueta'}</h2>
              <div className='flex items-end'>
                <div>
                  <TextFieldComponent
                    labelText='Nombre de la etiqueta'
                    register={methods.register}
                    fieldName='name'
                    id='TagName'
                    necessary={true}
                    type='text'
                  />
                </div>
                <div className='w-1/4'>
                  <ColorPickerComponent
                    register={methods.register}
                    fieldName='color'
                    id='TagColor'
                  />
                </div>
              </div>
              <SubmitComponent
                text={tagId ? 'Actualizar' : 'Crear'}
                action={() => {}}
              />
            </div>
          </form>
        </BasicPanelComponent>
      </div>
    </div>
  )
}

export default CreateTagComponent
