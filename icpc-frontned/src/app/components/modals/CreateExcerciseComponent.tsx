'use client'
import React, { useEffect, useState, useRef } from 'react'
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { BasicPanelComponent } from '../panels/BasicPanelComponent'
import LogoComponent from '../LogoComponent'
import { TextComponent } from '../text/TextComponent'
import { Categories, enumTextTags, Tags, Difficulties, Option } from '@/constants/types'
import TextFieldComponent from '../forms/TextFieldComponent'
import TagSelectorComponent from '../forms/TagSelectorComponent'
import MarkdownAreaComponent from '../forms/MarkdownAreaComponent'
import SubmitComponent from '../forms/SubmitComponent'
import useExcerciseStore from '@/store/useExcerciseStore'
import useUtilsStore from '@/store/useUtilsStore'
import { toast } from 'sonner'
import InputSelectorComponent from '../dropdowns/InputSelectorComponent'
import InputSelectorCreateComponent from '../dropdowns/InputSelectorCreateComponent'
import useAuthStore from '@/store/useStore'
import TextAreaComponent from '../forms/TextAreaComponent'
import { ArrowUturnLeftIcon, XMarkIcon } from '@heroicons/react/20/solid'
import ConfirmDenyComponent from '../buttons/Confirm&DenyComponent'

/*
Input: None
Output: a form to create an exercise
Return value: a modal form component to create an exercise
Function: creates a form to write exercises, handles sending the data to the database
Variables: methods, tags, categories, difficulty, timeLimits, memoryLimits
Date: 21 - 03 - 2024
Author: Gerardo Omar Rodriguez Ramirez
*/

interface CreateExerciseComponentProps {
  id?: string
  onClose: () => void
}

const CreateExcerciseComponent = (props: CreateExerciseComponentProps) => {
  const methods = useForm<FieldValues>()
  const createExcercise = useExcerciseStore(state => state.createExcercise)
  const updateExcercise = useExcerciseStore(state => state.updateExcercise)
  const getTags = useUtilsStore(state => state.getTags)
  const tagList = useUtilsStore(state => state.tags)
  const getCategories = useUtilsStore(state => state.getCategories)
  const categoriesList = useUtilsStore(state => state.categories)
  const getDifficulties = useUtilsStore(state => state.getDifficulties)
  const difficultiesList = useUtilsStore(state => state.difficulty)
  const createCategory = useUtilsStore(state => state.createCategory)

  const selectRef = useRef<{ clear: () => void }>(null)
  const [selectedTags, setSelectedTags] = useState<Tags[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Option | null>(null)
  const getExercise = useExcerciseStore(state => state.getExercise)
  const [showConfirm, setShowConfirm] = React.useState(false)

  let [tags, setTags] = useState<Tags[]>(tagList)
  let [categories, setCategories] = useState<Categories[]>(categoriesList)
  let [difficulty, setDifficulty] = useState<Difficulties[]>(difficultiesList)
  let [update, setUpdate] = useState<boolean>(false)

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        getTags().then(response => {
          setTags(response)
        })
        getCategories().then(response => {
          setCategories(response)
        })
        getDifficulties().then(response => {
          setDifficulty(response)
        })

        if (props.id) {
          const exercise = await getExercise(props.id)
          if (exercise) {
            methods.reset({
              name: exercise.title,
              category: { label: exercise.category.name, value: exercise.category.id },
              difficulty: { label: exercise.difficulty.name, value: exercise.difficulty.id },
              constraints: exercise.constraints,
              clue: exercise.clue,
              tags: exercise.tags,
              author: exercise.author,
              description: exercise.description,
              solution: exercise.solution
            })
            setSelectedCategory({ label: exercise.category.name, value: exercise.category.id })
            setSelectedTags(exercise.tags)
          } else {
            toast.error('No se encontró el ejercicio con el ID proporcionado.', {
              duration: 5000,
              style: {
                backgroundColor: '#ff0000',
                color: '#ffffff'
              }
            })
          }
        }
      } catch (error) {
        toast.error('Error al cargar los datos iniciales.', {
          duration: 5000,
          style: {
            backgroundColor: '#ff0000',
            color: '#ffffff'
          }
        })
      }
    }

    fetchExercise()
  }, [props.id, methods, getExercise, getCategories, getDifficulties, getTags, update])

  const onSubmit: SubmitHandler<FieldValues> = async formData => {
    const processResponse = async (response: any) => {
      const toastOptions = {
        duration: 5000,
        style: {
          backgroundColor: response.id ? 'green' : '#ff0000',
          color: '#ffffff'
        }
      }
      if (response.id) {
        toast.success(props.id ? 'Ejercicio Actualizado' : 'Ejercicio creado con éxito.', toastOptions)
        props.onClose()
      } else if ('message' in response) {
        toast.error(response.message, toastOptions)
      } else {
        toast.error('Unexpected response format', toastOptions)
      }
    }

    const exerciseData = {
      name: String(formData.name),
      category: { name: formData.category.label, id: formData.category.value },
      difficulty: { name: formData.difficulty.label, id: formData.difficulty.value },
      constraints: formData.constraints ? String(formData.constraints) : '',
      clue: formData.clue ? String(formData.clue) : '',
      tags: formData.tags,
      author: String(formData.author),
      description: String(formData.description),
      solution: formData.solution ? String(formData.solution) : '',
      isVisible: false,
      userAuthor: String(useAuthStore.getState().user?.userName),
      role: String(useAuthStore.getState().user?.role)
    }

    if (props.id) {
      const response = await updateExcercise(exerciseData, props.id)
      await processResponse(response)
    } else {
      const response = await createExcercise(exerciseData)
      await processResponse(response)
    }
  }

  const handleCreateCategory = async (newValue: Option) => {
    const category = newValue.label
    const response = await createCategory({ name: category, commentId: category })
    if ('statusCode' in response && response.statusCode === 201) {
      setCategories([...categories, { id: response.data.id, name: category }])
    } else if ('message' in response) {
      toast.error(response.message, {
        duration: 5000,
        style: {
          backgroundColor: '#ff0000',
          color: '#ffffff'
        }
      })
    }
    setUpdate(!update)
  }

  // ...existing code...

  const clearForm = () => {
    if (props.id) {
      const fetchExercise = async () => {
        const exercise = await getExercise(props.id!)
        if (exercise) {
          methods.reset({
            name: exercise.title,
            category: { label: exercise.category.name, value: exercise.category.id },
            difficulty: { label: exercise.difficulty.name, value: exercise.difficulty.id },
            constraints: exercise.constraints,
            clue: exercise.clue,
            tags: exercise.tags,
            author: exercise.author,
            description: exercise.description,
            solution: exercise.solution
          })
          setSelectedCategory({ label: exercise.category.name, value: exercise.category.id })
          setSelectedTags(exercise.tags)
        } else {
          toast.error('No se pudo recargar la nota.', {
            duration: 5000,
            style: {
              backgroundColor: '#ff0000',
              color: '#ffffff'
            }
          })
        }
      }
      fetchExercise()
    } else {
      methods.reset()
      setSelectedCategory(null)
    }
  }
  const dataValidate = () => {
    const data = methods.getValues()
    const missingFields = []
    const invalidFields: string[] = []

    // Validación de campos obligatorios
    if (!data.name) missingFields.push('Nombre del ejercicio')
    if (data.category.length === 0) missingFields.push('Categoría')
    if (data.difficulty.length === 0) missingFields.push('Nivel de dificultad')
    if (data.tags.length === 0) missingFields.push('Etiquetas')
    if (!data.description) missingFields.push('Descripción del problema')

    // Mostrar errores si hay campos faltantes o inválidos
    if (missingFields.length > 0) {
      toast.error(`Favor de llenar los datos de: ${missingFields.join(', ')}`, {
        duration: 5000,
        style: {
          textAlign: 'justify',
          backgroundColor: '#ff0000',
          color: '#ffffff'
        }
      })
      return
    }

    if (invalidFields.length > 0) {
      toast.error(`Los siguientes campos no deben exceder 255 caracteres: ${invalidFields.join(', ')}`, {
        duration: 5000,
        style: {
          textAlign: 'justify',
          backgroundColor: '#ff0000',
          color: '#ffffff'
        }
      })
      return
    }

    setShowConfirm(true)
  }
  return (
    <>
      {showConfirm && (
        <ConfirmDenyComponent
          onConfirm={() => {
            setShowConfirm(false)
            methods.handleSubmit(onSubmit)()
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
      <form
        onSubmit={e => {
          e.preventDefault()
        }}
        className={`margin-auto md:mx-auto max-w-7xl md:px-4 w-full h-full lg:px-8 lg:w-11/12 lg:h-auto 
    min-h-screen place-items-center justify-between py-10`}>
        <BasicPanelComponent backgroundColor='bg-white dark:bg-dark-primary'>
          <div className='relative'>
            <div className='absolute top-0 right-0 flex gap-1 p-2'>
              <div
                className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration:200 rounded'
                title='Restablecer formulario'>
                <button
                  type='button'
                  onClick={clearForm}
                  className='text-inherit'>
                  <ArrowUturnLeftIcon className='h-6 w-6' />
                </button>
              </div>
              <div
                className='p-2 hover:bg-gray-100 dark:hover:bg-red-700 transition-colors duration:200 rounded'
                title='Cerrar formulario'>
                <button
                  onClick={props.onClose}
                  className='text-inherit'>
                  <XMarkIcon className='h-6 w-6' />
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
              {props.id ? 'Editar ejercicio' : 'Crear ejercicio'}
            </TextComponent>
          </div>
          <div className='grid grid-cols-1 items-start lg:grid-cols-2 lg:gap-16'>
            <div className='w-full flex flex-col gap-2'>
              <TextFieldComponent
                labelText='Nombre del ejercicio*'
                register={methods.register}
                fieldName='name'
                id='name'
                necessary={true}
                type='text'
                auto='off'
              />
              <Controller
                defaultValue={[]}
                control={methods.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputSelectorCreateComponent
                    label='Categoría*'
                    id='category'
                    ref={selectRef}
                    onChange={val => {
                      field.onChange(val)
                      setSelectedCategory(val)
                    }}
                    options={categories.map(item => {
                      return { label: item.name, value: item.id }
                    })}
                    handleCreate={handleCreateCategory}
                    selectedOption={field.value}
                  />
                )}
                name='category'
              />
              <Controller
                name='tags'
                defaultValue={[]}
                control={methods.control}
                render={({ field }) => (
                  <TagSelectorComponent
                    id='tagSelector2'
                    options={tags}
                    selectedTags={field.value}
                    onChange={val => field.onChange(val)}
                    label='Etiquetas*'
                  />
                )}
                rules={{ required: true }}
              />
              <Controller
                defaultValue={[]}
                control={methods.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputSelectorComponent
                    label='Nivel de dificultad*'
                    id='difficulty'
                    onChange={val => field.onChange(val)}
                    options={difficulty.map(item => {
                      return { label: item.name, value: item.id }
                    })}
                    selectedOption={field.value}
                  />
                )}
                name='difficulty'
              />
              <TextAreaComponent
                labelText='Restricciones'
                register={methods.register}
                fieldName='constraints'
                id='constraints'
                necessary={false}
              />

              <TextFieldComponent
                labelText='Pista'
                register={methods.register}
                fieldName='clue'
                id='clue'
                necessary={false}
                type='text'
                auto='off'
              />
              <TextFieldComponent
                labelText='Autor'
                register={methods.register}
                fieldName='author'
                id='author'
                necessary={false}
                type={'username'}
                auto='off'
              />
            </div>
            <div className='w-full flex flex-col gap-2'>
              <Controller
                name='description'
                defaultValue=''
                control={methods.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <MarkdownAreaComponent
                    value={field.value}
                    onChange={newValue => field.onChange(newValue)}
                    labelText='Descripción del problema*'
                    className='p-2'
                  />
                )}
              />
              <Controller
                name='solution'
                defaultValue=''
                control={methods.control}
                render={({ field }) => (
                  <MarkdownAreaComponent
                    value={field.value}
                    onChange={newValue => field.onChange(newValue)}
                    labelText='Solución del problema'
                    className='p-2'
                  />
                )}
              />
            </div>
          </div>
          <div className='flex flex-col items-center'>
            <SubmitComponent
              text={props.id ? 'Actualizar ejercicio' : 'Crear ejercicio'}
              action={dataValidate}
            />
          </div>
        </BasicPanelComponent>
      </form>
    </>
  )
}

export default CreateExcerciseComponent
