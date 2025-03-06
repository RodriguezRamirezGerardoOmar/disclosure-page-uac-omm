import React from 'react'
import { BasicPanelComponent } from '../panels/BasicPanelComponent'
import LogoComponent from '../LogoComponent'
import { enumTextTags } from '@/constants/types'
import { TextComponent } from '../text/TextComponent'
import { Controller, FieldValues, UseFormReturn } from 'react-hook-form'
import TextFieldComponent from '../forms/TextFieldComponent'
import MarkdownAreaComponent from '../forms/MarkdownAreaComponent'
import SubmitComponent from '../forms/SubmitComponent'
import { toast } from 'sonner'
import useUtilsStore from '@/store/useUtilsStore'
import { ArrowUturnLeftIcon, XMarkIcon } from '@heroicons/react/20/solid'

interface IReportCardProps {
  methods: UseFormReturn<FieldValues>
  itemType: string
  itemId: string
  onSubmit: (data: any) => void
  onCancel: () => void
}

const ReportCardComponent = ({ itemType, itemId, onSubmit, onCancel, methods, ...props }: Readonly<IReportCardProps>) => {
  const { createReport } = useUtilsStore()

  const handleSubmit = async (data: FieldValues) => {
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
      if (response) {
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
        console.error('Error en la respuesta del servidor:', response)
        toast.error('Error al enviar el reporte')
      }
    } catch (error) {
      console.error('Error al enviar el reporte:', error)
      toast.error('Error al enviar el reporte')
    }
  }

  const clearForm = () => {
    methods.reset()
  }

  return (
    <div
      className={`margin-auto md:mx-auto max-w-7xl md:px-4 w-full h-full lg:px-8 lg:w-2/3 lg:h-auto 
  min-h-screen place-items-center justify-between py-24`}>
      <BasicPanelComponent backgroundColor='bg-white dark:bg-dark-primary'>
        <div className="relative">
          <div className="absolute top-0 right-0 flex gap-1 p-2">
            <div
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 rounded"
              title="Borrar formulario"
            >
              <button
                type="button"
                onClick={clearForm}
                className="text-inherit"
              >
                <ArrowUturnLeftIcon className="h-6 w-6" />
              </button>
            </div>
            <div
              className="p-2 hover:bg-gray-100 dark:hover:bg-red-700 transition-colors duration-200 rounded"
              title="Cerrar formulario"
            >
              <button
                onClick={onCancel}
                className="text-inherit"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <LogoComponent size={100} />
          <TextComponent
            tag={enumTextTags.h1}
            sizeFont='s16'
            className='dark:text-dark-accent'>
            ¿Encontraste un error?
          </TextComponent>
          <form onSubmit={methods.handleSubmit(handleSubmit)}>
            <TextFieldComponent
              labelText='Descripción del error'
              register={methods.register}
              fieldName='description'
              id='description'
              necessary={true}
              type='text'
              auto='off'
            />
            <Controller
              name='content'
              defaultValue=''
              control={methods.control}
              render={({ field }) => (
                <MarkdownAreaComponent
                  value={field.value}
                  onChange={newValue => field.onChange(newValue)}
                  labelText='Contenido'
                  className='p-2'
                />
              )}
            />
            <div className="flex justify-center">
              <SubmitComponent text='Reportar' />
            </div>
          </form>
        </div>
      </BasicPanelComponent>
    </div>
  )
}

export default ReportCardComponent