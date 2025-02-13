'use client'
import React, { useEffect, useState, useRef } from 'react'
import { BasicPanelComponent } from '../panels/BasicPanelComponent'
import LogoComponent from '../LogoComponent'
import { TextComponent } from '../text/TextComponent'
import { Categories, enumTextTags, Tags, Option } from '@/constants/types'
import TextFieldComponent from '../forms/TextFieldComponent'
import { FieldValues, Controller, useForm, SubmitHandler } from 'react-hook-form'
import TextAreaComponent from '../forms/TextAreaComponent'
import MarkdownAreaComponent from '../forms/MarkdownAreaComponent'
import SubmitComponent from '../forms/SubmitComponent'
import TagSelectorComponent from '../forms/TagSelectorComponent'
import useUtilsStore from '@/store/useUtilsStore'
import useNoteStore from '@/store/useNoteStore'
import InputSelectorCreateComponent from '../dropdowns/InputSelectorCreateComponent'
import { toast } from 'sonner'
import useAuthStore from '@/store/useStore'

interface CreateNotesComponentProps {
  id?: string
  onClose: () => void
}

const CreateNoteComponent = (props: CreateNotesComponentProps) => {
  const methods = useForm<FieldValues>()
  const getTags = useUtilsStore(state => state.getTags)
  const tagList = useUtilsStore(state => state.tags)
  const getCategories = useUtilsStore(state => state.getCategories)
  const categoriesList = useUtilsStore(state => state.categories)
  const createNote = useNoteStore(state => state.createNote)
  const updateNote = useNoteStore(state => state.updateNote)
  const createCategory = useUtilsStore(state => state.createCategory)

  const selectRef = useRef<{ clear: () => void }>(null)
  const [tags, setTags] = useState<Tags[]>(tagList)
  const [categories, setCategories] = useState<Categories[]>(categoriesList)
  const [selectedTags, setSelectedTags] = useState<Tags[]>([]) // Controlar tags seleccionados
  const [selectedCategory, setSelectedCategory] = useState<Option | null>(null) // Controlar categoría seleccionada
  const [update, setUpdate] = useState<boolean>(false)
  const getNotesArticle = useNoteStore(state => state.getNote)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        // Carga datos sin ID
        getTags().then(response => {
          setTags(response)
        })
        getCategories().then(response => {
          setCategories(response)
        })

        // Si hay un ID, cargar los datos de la nota
        if (props.id) {
          const note = await getNotesArticle(props.id)
          if (note) {
            methods.reset({
              title: note.title,
              description: note.body,
              content: note.body,
              category: { label: note.category.name, value: note.category.id },
              tags: note.tags
            })
            setSelectedCategory({ label: note.category.name, value: note.category.id })
            setSelectedTags(note.tags)
          } else {
            toast.error('No se encontró la nota con el ID proporcionado.', {
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

    fetchNotes()
  }, [props.id, methods, getTags, getCategories, getNotesArticle])

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

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    // Función para procesar la respuesta de las operaciones
    const processResponse = async (response: any) => {
      if (response && typeof response === 'object') {
        if (response.statusCode === 201) {
          toast.success(response.message, {
            duration: 5000,
            style: {
              backgroundColor: 'green',
              color: '#ffffff'
            }
          });
        } 
      }
    }

    // Objeto base con los datos comunes
    const noteData = {
      title: String(data.title),
      description: String(data.description),
      body: String(data.content),
      categoryId: { name: data.category.label, id: data.category.value },
      tags: data.tags,
      isVisible: useAuthStore.getState().user?.role === 'admin',
      userAuthor: String(useAuthStore.getState().user?.userName),
      role: String(useAuthStore.getState().user?.role)
    }

    // Si hay un ID, actualizar la nota existente
    if (props.id) {
      const response = await updateNote(noteData, props.id)
      await processResponse(response)
    }
    // Si no hay ID, crear una nueva nota
    else {
      const response = await createNote(noteData)
      await processResponse(response)
    }
  }

  const clearForm = () => {
    if (props.id) {
      // Si hay un ID, recarga los datos originales
      const fetchNote = async () => {
        const note = await getNotesArticle(props.id!)
        if (note) {
          methods.reset({
            title: note.title,
            category: { label: note.category.name, value: note.category.id },
            tags: note.tags,
            description: note.body,
            content: note.body
          })
          setSelectedCategory({ label: note.category.name, value: note.category.id })
          setSelectedTags(note.tags)
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
      fetchNote()
    } else {
      // Si no hay ID, limpia completamente el formulario
      methods.reset()
      setSelectedCategory(null)
    }
  }

  return (
    <form
      onSubmit={methods.handleSubmit(onSubmit)}
      className={`margin-auto md:mx-auto max-w-7xl md:px-4 w-full h-full lg:px-8 lg:w-2/3 lg:h-auto 
    min-h-screen place-items-center justify-between py-10`}>
      <BasicPanelComponent backgroundColor='bg-white dark:bg-dark-primary'>
        <div className="relative">
          <button onClick={props.onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <div className='flex flex-col items-center'>
          <LogoComponent size={100} />
          <TextComponent
            tag={enumTextTags.h1}
            sizeFont='s16'
            className='dark:text-dark-accent'>
            {props.id ? 'Editar apunte' : 'Crear apunte'}
          </TextComponent>
          <TextFieldComponent
            labelText='Título del apunte'
            register={methods.register}
            fieldName='title'
            auto='off'
            id='title'
            necessary={true}
            type='text'
          />
          <Controller
            defaultValue={[]}
            control={methods.control}
            rules={{ required: true }}
            render={({ field }) => (
              <InputSelectorCreateComponent
                label='Categoría'
                id='category'
                ref={selectRef} // Conectar referencia correctamente
                onChange={val => {
                  field.onChange(val)
                  setSelectedCategory(val) // Actualiza el estado controlado
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
            defaultValue={[] as Tags[]}
            control={methods.control}
            render={({ field }) => (
              <TagSelectorComponent
                id='tagSelector2'
                options={tags}
                selectedTags={field.value}
                onChange={val => field.onChange(val)}
              />
            )}
            rules={{ required: true }}
          />
          <TextAreaComponent
            labelText='Descripción'
            register={methods.register}
            fieldName='description'
            id='description'
            necessary={true}
          />
          <Controller
            name='content'
            defaultValue=''
            control={methods.control}
            rules={{ required: true }}
            render={({ field }) => (
              <MarkdownAreaComponent
                value={field.value}
                onChange={newValue => field.onChange(newValue)}
                labelText='Contenido'
                className='p-2'
              />
            )}
          />
          <SubmitComponent text={props.id ? 'Actualizar apunte' : 'Crear apunte'} />
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
      </BasicPanelComponent>
    </form>
  )
}

export default CreateNoteComponent