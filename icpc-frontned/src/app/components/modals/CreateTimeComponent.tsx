'use client'
import React, { useState, useEffect } from 'react'
import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form'
import { BasicPanelComponent } from '../panels/BasicPanelComponent'
import LogoComponent from '../LogoComponent'
import TextFieldComponent from '../forms/TextFieldComponent'
import SubmitComponent from '../forms/SubmitComponent'
import useUtilsStore from '@/store/useUtilsStore'
import { toast } from 'sonner'
import { TimeLimit } from '@/constants/types'
import { ArrowUturnLeftIcon, XMarkIcon } from '@heroicons/react/20/solid'

interface CreateTimeLimitComponentProps {
  methods: UseFormReturn<FieldValues>
  onCreateTimeLimit: (time: number) => void
  timeId?: string
  onClose: () => void
}

const CreateTimeLimitComponent: React.FC<CreateTimeLimitComponentProps> = ({ methods, onCreateTimeLimit, timeId, onClose }) => {
  const createTimeLimit = useUtilsStore(state => state.createTimeLimit)
  const updateTimeLimit = useUtilsStore(state => state.updateTimeLimit)
  const getTimeLimit = useUtilsStore(state => state.getTimeLimit)
  const [currentTimeLimit, setCurrentTimeLimit] = useState<TimeLimit>({} as TimeLimit)

  useEffect(() => {
    const loadTimeLimit = async () => {
      if (timeId) {
        const timeLimits = await getTimeLimit()
        const timeLimit = timeLimits.find(t => t.id === timeId)
        if (timeLimit) {
          methods.setValue('TimeLimit', timeLimit.timeLimit.toString())
          setCurrentTimeLimit(timeLimit)
        }
      } else {
        methods.reset({
          TimeLimit: ''
        })
        setCurrentTimeLimit({} as TimeLimit)
      }
    }
    loadTimeLimit()
  }, [timeId, getTimeLimit, methods])

  const clearForm = () => {
    if (timeId) {
      methods.reset({
        TimeLimit: currentTimeLimit.timeLimit.toString()
      })
    } else methods.setValue('TimeLimit', '')
  }

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    const timeData = {
      timeLimit: parseInt(data.TimeLimit)
    }

    let response
    if (timeId) {
      response = await updateTimeLimit(timeId, { timeLimit: timeData.timeLimit })
    } else {
      response = await createTimeLimit(timeData.timeLimit)
    }

    if ('id' in response) {
      toast.success(`Límite de tiempo ${timeId ? 'editado' : 'creado'} con éxito.`, {
        duration: 5000,
        style: {
          backgroundColor: 'green',
          color: '#FFFFFF'
        }
      })
      onCreateTimeLimit(timeData.timeLimit)
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
              <h2 className='text-center text-lg font-bold dark:text-dark-accent'>
                {timeId ? 'Editar límite de tiempo' : 'Crear nuevo límite de tiempo'}
              </h2>
              <TextFieldComponent
                labelText='Valor del tiempo'
                register={methods.register}
                fieldName='TimeLimit'
                id='TimeLimit'
                necessary={true}
                type='text'
              />
              <SubmitComponent
                text={timeId ? 'Actualizar' : 'Crear'}
                action={() => {}}
              />
            </div>
          </form>
        </BasicPanelComponent>
      </div>
    </div>
  )
}

export default CreateTimeLimitComponent
