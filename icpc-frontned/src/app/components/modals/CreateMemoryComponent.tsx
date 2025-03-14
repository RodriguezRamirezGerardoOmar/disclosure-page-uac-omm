'use client'
import React, { useState, useEffect } from 'react'
import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form'
import { BasicPanelComponent } from '../panels/BasicPanelComponent'
import LogoComponent from '../LogoComponent'
import TextFieldComponent from '../forms/TextFieldComponent'
import SubmitComponent from '../forms/SubmitComponent'
import { SelectComponent } from '@/app/components/dropdowns/SelectComponent'
import useUtilsStore from '@/store/useUtilsStore'
import { toast } from 'sonner'

interface CreateMemoryComponentProps {
  methods: UseFormReturn<FieldValues>
  onCreateMemory: (memoryName: string) => void
  memoryId?: string
  onClose: () => void
}

const CreateMemoryComponent: React.FC<CreateMemoryComponentProps> = ({ methods, memoryId, onClose }) => {
  const createMemory = useUtilsStore(state => state.createMemory)
  const updateMemory = useUtilsStore(state => state.updateMemory)
  const getMemory = useUtilsStore(state => state.getMemory)

  const MemorySelect = [
    { index: 0, id: 'KB', name: 'KB' },
    { index: 1, id: 'GB', name: 'GB' },
    { index: 2, id: 'MB', name: 'MB' }
  ]

  const [selectedMemoryUnit, setSelectedMemoryUnit] = useState<string>(MemorySelect[0].id)

  useEffect(() => {
    if (memoryId) {
      const loadMemory = async () => {
        const memory = await getMemory(memoryId)
        if (memory) {
          methods.setValue('MemoryName', memory.memoryLimit.toString())
          const memoryUnit = MemorySelect.find(unit => unit.id === memory.id)
          if (memoryUnit) {
            setSelectedMemoryUnit(memoryUnit.id)
          }
        }
      }
      loadMemory()
    }
  }, [memoryId, getMemory, methods])

  const clearForm = () => {
    methods.reset()
    setSelectedMemoryUnit(MemorySelect[0].id)
  }

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    const processResponse = async (response: any) => {
      const toastOptions = {
        duration: 5000,
        style: {
          backgroundColor: response.id ? 'green' : '#ff0000',
          color: '#ffffff'
        }
      }
      if (response.id) {
        toast.success(`Se ha creado el limite de memoria correctamente: ${response.memoryLimit}KB`, toastOptions)
      } else if ('message' in response) {
        toast.error(response.message, toastOptions)
      } else {
        toast.error('Error al procesar la solicitud.', toastOptions)
      }
    }

    const memoryData = {
      value: parseInt(data.MemoryName),
      id: selectedMemoryUnit
    }

    if (memoryId) {
      const response = await updateMemory(memoryId, memoryData)
      await processResponse(response)
    } else {
      const response = await createMemory(memoryData)
      await processResponse(response)
    }
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='relative bg-white dark:bg-dark-primary p-4 rounded-lg shadow-lg'>
        <button
          onClick={onClose}
          className='absolute top-2 right-2 text-gray-500 hover:text-red-700 text-4xl'>
          &times;
        </button>
        <BasicPanelComponent backgroundColor='bg-white dark:bg-dark-primary'>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className='space-y-4'>
            <div className='flex flex-col items-center'>
              <LogoComponent size={100} />
              <h2 className='text-center text-lg font-bold dark:text-dark-accent'>
                {memoryId ? 'Editar límite de memoria' : 'Crear nuevo límite de memoria'}
              </h2>
              <div className='flex items-end'>
                <div className='w-[70%]'>
                  <TextFieldComponent
                    labelText='Valor de la memoria'
                    register={methods.register}
                    fieldName='MemoryName'
                    id='MemoryName'
                    necessary={true}
                    type='text'
                  />
                </div>
                <div className='w-[30%]'>
                  <SelectComponent
                    options={MemorySelect}
                    fieldName={'magnitud'}
                    id={'magnitud'}
                    labelText={''}
                    selected={selectedMemoryUnit}
                    onChange={setSelectedMemoryUnit}
                  />
                </div>
              </div>
              <SubmitComponent
                text={memoryId ? 'Actualizar' : 'Crear'}
                action={() => {}}
              />
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

export default CreateMemoryComponent
