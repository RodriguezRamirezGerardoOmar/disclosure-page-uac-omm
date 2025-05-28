import React from 'react'
import { BasicPanelComponent } from '../panels/BasicPanelComponent'
import LogoComponent from '../LogoComponent'
import { enumTextTags } from '@/constants/types'
import { TextComponent } from '../text/TextComponent'
import { FieldValues, UseFormReturn } from 'react-hook-form'
import TextFieldComponent from '../forms/TextFieldComponent'
import SubmitComponent from '../forms/SubmitComponent'
import { toast } from 'sonner'
import useUtilsStore from '@/store/useUtilsStore'
import { ArrowUturnLeftIcon, XMarkIcon } from '@heroicons/react/20/solid'
import TextAreaComponent from '../forms/TextAreaComponent'

interface IReportCardProps {
  methods: UseFormReturn<FieldValues>
  itemType: string
  itemId: string
  onSubmit: (data: any) => void
  onCancel: () => void
}

/*
Input: methods (react-hook-form methods), itemType (type of item being reported), itemId (id of the item), onSubmit (callback after successful report), onCancel (callback to close the modal)
Output: a modal form to create and submit a report, with fields for description and content, plus validation and feedback
Return value: a modal component used to report an error or issue for a specific item
Function: handles form state and submission, sends report data to the backend, shows success/error toasts, and allows resetting or closing the form
Variables: methods, itemType, itemId, onSubmit, onCancel, createReport, handleSubmit, clearForm
Date: 28 - 05 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

const ReportCardComponent = ({ itemType, itemId, onSubmit, onCancel, methods }: Readonly<IReportCardProps>) => {
  const { createReport } = useUtilsStore()

  const handleSubmit = async (data: FieldValues) => {
    // Condition: If required fields are missing, show error toast and do not submit
    if (!data.description || !data.content) {
      toast.error('Favor de rellenar el reporte', {
        duration: 5000,
        style: {
          backgroundColor: 'red',
          color: '#ffffff'
        }
      })
      return
    }
    try {
      const response = await createReport({
        summary: data.description,
        report: data.content,
        itemType,
        itemId: itemId
      })
      // Condition: If report is created, show success toast, call onSubmit and onCancel; otherwise, show error toast
      if ('id' in response) {
        toast.success('Reporte Enviado', {
          duration: 5000,
          style: {
            backgroundColor: 'green',
            color: '#ffffff'
          }
        })
        onSubmit(data)
        onCancel()
      } else {
        const errorMessage = 'message' in response ? response.message : 'Error desconocido';
        toast.error(`Error al enviar el reporte: ${errorMessage}`, {
          duration: 5000,
          style: {
            backgroundColor: '#ff0000',
            color: '#ffffff'
          }
        })
      }
    } catch (error) {
      toast.error(`Error al enviar el reporte: ${error}`, {
        duration: 5000,
        style: {
          backgroundColor: '#ff0000',
          color: '#ffffff'
        }
      })
    }
  }

  const clearForm = () => {
    methods.reset()
  }

  return (
    <div
      className={`margin-auto md:mx-auto max-w-7xl md:px-4 w-full h-full lg:px-8 lg:w-2/3 lg:h-auto 
  min-h-screen place-items-center justify-between py-24`}>
      <BasicPanelComponent backgroundColor='bg-white dark:bg-dark-primary w-full lg:w-2/3'>
        <div className='relative'>
          <div className='absolute top-0 right-0 flex gap-1 p-2'>
            <div
              className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 rounded'
              title='Borrar formulario'>
              <button
                type='button'
                onClick={clearForm}
                className='text-inherit'>
                <ArrowUturnLeftIcon className='h-6 w-6' />
              </button>
            </div>
            <div
              className='p-2 hover:bg-gray-100 dark:hover:bg-red-700 transition-colors duration-200 rounded'
              title='Cerrar formulario'>
              <button
                onClick={onCancel}
                className='text-inherit'>
                <XMarkIcon className='h-6 w-6' />
              </button>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-center w-full'>
          <LogoComponent size={100} />
          <TextComponent
            tag={enumTextTags.h1}
            sizeFont='s16'
            className='dark:text-dark-accent'>
            ¿Encontraste un error?
          </TextComponent>
          <form onSubmit={methods.handleSubmit(handleSubmit)} className='w-full'>
            <TextFieldComponent
              labelText='Descripción del error'
              register={methods.register}
              fieldName='description'
              id='description'
              necessary={true}
              type='text'
              auto='off'
            />
            <TextAreaComponent
              labelText='Contenido'
              fieldName='content'
              register={methods.register}
              id={'content'}
              necessary={false}
            />

            <div className='flex justify-center'>
              <SubmitComponent text='Reportar' action={() => {}}/>
            </div>
          </form>
        </div>
      </BasicPanelComponent>
    </div>
  )
}

export default ReportCardComponent
