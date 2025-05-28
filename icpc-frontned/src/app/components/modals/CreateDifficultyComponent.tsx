'use client'
import React, { useEffect, useState } from 'react'
import { UseFormReturn, FieldValues, SubmitHandler } from 'react-hook-form'
import { BasicPanelComponent } from '../panels/BasicPanelComponent'
import LogoComponent from '../LogoComponent'
import TextFieldComponent from '../forms/TextFieldComponent'
import SubmitComponent from '../forms/SubmitComponent'
import useUtilsStore from '@/store/useUtilsStore'
import { toast } from 'sonner'
import { Difficulties } from '@/constants/types'
import { ArrowUturnLeftIcon, XMarkIcon } from '@heroicons/react/20/solid'

interface CreateDifficultyComponentProps {
  methods: UseFormReturn<FieldValues>
  onCreateDifficulty: (DifficultyName: string) => void
  difficultyId?: string
  onClose: () => void
}

/*
Input: methods (react-hook-form methods), onCreateDifficulty (callback after creating a difficulty), difficultyId (optional, id of the difficulty to edit), onClose (callback to close the modal)
Output: a modal form to create or edit a difficulty, with fields, validation, and feedback
Return value: a modal component used to create a new difficulty or edit an existing one
Function: fetches difficulty data if editing, handles form state and submission, shows success/error toasts, and allows resetting or closing the form
Variables: methods, onCreateDifficulty, difficultyId, onClose, createDifficulty, updateDifficulty, getDifficulty, currentDifficulty, clearForm, onSubmit
Date: 28 - 05 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

const CreateDifficultyComponent: React.FC<CreateDifficultyComponentProps> = ({ methods, onCreateDifficulty, difficultyId, onClose }) => {
  const createDifficulty = useUtilsStore(state => state.createDifficulty)
  const updateDifficulty = useUtilsStore(state => state.updateDifficulty)
  const getDifficulty = useUtilsStore(state => state.getDifficulty)
  const [currentDifficulty, setCurrentDifficulty] = useState<Difficulties>({} as Difficulties)

  useEffect(() => {
    const loadDifficulty = async () => {
      // Condition: If editing, fetch and set difficulty data; otherwise, reset form fields
      if (difficultyId) {
        const difficulty = await getDifficulty(difficultyId)
        if (difficulty) {
          methods.setValue('DifficultyName', difficulty.name)
          methods.setValue('Level', difficulty.level)
          setCurrentDifficulty(difficulty)
        }
      } else {
        methods.setValue('DifficultyName', '')
        methods.setValue('Level', null)
        setCurrentDifficulty({} as Difficulties)
      }
    }
    loadDifficulty()
  }, [difficultyId, getDifficulty, methods])

  const clearForm = () => {
    // Condition: If editing, reset to current difficulty values; otherwise, clear form fields
    if (difficultyId) {
      methods.reset({
        DifficultyName: currentDifficulty.name,
        Level: currentDifficulty.level
      })
    } else {
      methods.setValue('DifficultyName', '')
      methods.setValue('Level', null)
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    let response
    // Condition: If editing, update difficulty; otherwise, create new difficulty
    if (difficultyId) {
      response = await updateDifficulty(difficultyId, { level: Number(data.Level), name: String(data.DifficultyName) })
    } else {
      response = await createDifficulty({ level: Number(data.Level), name: String(data.DifficultyName) })
    }

    // Condition: If response has 'id', show success toast, reset form, and close; if 'message', show error toast
    if ('id' in response) {
      toast.success(`La dificultad se ha ${difficultyId ? 'editado' : 'creado'} con éxito.`, {
        duration: 5000,
        style: {
          backgroundColor: 'green',
          color: '#FFFFFF'
        }
      })
      onCreateDifficulty(data.DifficultyName)
      methods.setValue('DifficultyName', '')
      methods.setValue('Level', null)
      onClose()
    } else if ('message' in response) {
      toast.error(response.message, { duration: 5000, style: { backgroundColor: 'red', color: '#FFFFFF' } })
    }
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white dark:bg-dark-primary p-4 rounded-lg shadow-lg relative'>
        <div className='relative'>
          <div className='absolute top-0 right-0 flex gap-1 p-2'>
            <div
              className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 rounded'
              title='Restablecer formulario'>
              <button
                type='button'
                onClick={clearForm}
                className='text-inherit' 
              >
                <ArrowUturnLeftIcon className='h-6 w-6' />
              </button>
            </div>
            <div
              className='p-2 hover:bg-gray-100 dark:hover:bg-red-700 transition-colors duration-200 rounded'
              title='Cerrar formulario'>
              <button
                onClick={() => {
                  clearForm()
                  onClose()
                }}
                className='text-inherit' 
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
                {difficultyId ? 'Editar nivel de dificultad' : 'Crear nuevo nivel de dificultad'}
              </h2>
              <TextFieldComponent
                labelText='Nombre de la dificultad'
                register={methods.register}
                fieldName='DifficultyName'
                id='DifficultyName'
                necessary={true}
                type='text'
              />
              <TextFieldComponent
                labelText='Nivel de la dificultad'
                register={methods.register}
                fieldName='Level'
                id='Level'
                necessary={true}
                type='number'
              />
              <SubmitComponent
                text={difficultyId ? 'Actualizar' : 'Crear'}
                action={() => {}}
              />
            </div>
          </form>
        </BasicPanelComponent>
      </div>
    </div>
  )
}

export default CreateDifficultyComponent
