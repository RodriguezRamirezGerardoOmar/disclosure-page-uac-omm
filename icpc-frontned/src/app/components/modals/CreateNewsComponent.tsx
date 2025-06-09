'use client'
import React, { useEffect, useRef } from 'react'
import { FieldValues, Controller, useForm, SubmitHandler } from 'react-hook-form'
import { BasicPanelComponent } from '../panels/BasicPanelComponent'
import { IApiResponse, TResponseBasicError, enumTextTags } from '@/constants/types'
import LogoComponent from '../LogoComponent'
import { TextComponent } from '../text/TextComponent'
import TextFieldComponent from '../forms/TextFieldComponent'
import SubmitComponent from '../forms/SubmitComponent'
import ImageInputComponent from '../forms/ImageInputComponent'
import MarkdownAreaComponent from '../forms/MarkdownAreaComponent'
import useNewsStore from '@/store/useNewsStore'
import useUtilsStore from '@/store/useUtilsStore'
import { toast } from 'sonner'
import useAuthStore from '@/store/useStore'
import { ArrowUturnLeftIcon, XMarkIcon } from '@heroicons/react/20/solid'
import ConfirmDenyComponent from '../buttons/Confirm&DenyComponent'

interface CreateNewsComponentProps {
  id?: string
  onClose: () => void
}

/*
Input: id (optional, id of the news to edit), onClose (callback to close the modal)
Output: a modal form to create or edit a news article, with fields for title, image, and content, plus validation and feedback
Return value: a modal component used to create a new news article or edit an existing one
Function: fetches news data if editing, handles form state and submission, manages image upload, 
shows success/error toasts, and allows resetting or closing the form
Variables: id, onClose, methods, createNews, getNewsArticle, createImage, updateImage, updateNews, imageInputRef, 
coverImage, showConfirm, onSubmit, dataValidate, clearForm
Date: 28 - 05 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

const CreateNewsComponent = (props: CreateNewsComponentProps) => {
  const methods = useForm<FieldValues>()
  const createNews = useNewsStore(state => state.createNews)
  const getNewsArticle = useNewsStore(state => state.getNewsArticle)
  const createImage = useUtilsStore(
    (state: { createImage: (image: File) => Promise<IApiResponse<{}> | TResponseBasicError> }) => state.createImage
  )
  const updateImage = useUtilsStore(state => state.updateImage)
  const updateNews = useNewsStore(state => state.updateNews)
  const imageInputRef = useRef<{ resetImageInput: (id?: string) => void } | null>(null)
  const [coverImage, setCoverImage] = React.useState('')
  const [showConfirm, setShowConfirm] = React.useState(false)

  useEffect(() => {
    if (props.id) {
      const fetchNews = async () => {
        const news = await getNewsArticle(props.id!)
        // Condition: If news is found, reset form and set cover image; otherwise, show error toast
        if (news) {
          methods.reset({
            title: news.title,
            file: process.env.NEXT_PUBLIC_API_URL + 'api/v1/image/' + news.imageId.id,
            content: news.body
          })
          setCoverImage(news.imageId.id)
        } else {
          toast.error('No se encontró la noticia con el ID proporcionado.', {
            duration: 5000,
            style: {
              backgroundColor: '#ff0000',
              color: '#ffffff'
            }
          })
        }
      }
      fetchNews()
    }
  }, [props.id, methods, getNewsArticle])

  const onSubmit: SubmitHandler<FieldValues> = async formData => {
    const processResponse = async (uploadedImage: any) => {
      // Condition: If image upload returns data, process news creation/update; otherwise, show error toast
      if ('data' in uploadedImage) {
        const imageId = uploadedImage.data?.imageId?.id || uploadedImage.data?.id
        if (!imageId) {
          toast.error('Error al obtener el ID de la imagen', {
            duration: 5000,
            style: {
              backgroundColor: '#ff0000',
              color: '#ffffff'
            }
          })
          return
        }
        // Condition: If editing, update news; otherwise, create news
        const response = props.id
          ? await updateNews(
              {
                title: String(formData.title),
                imageId: imageId,
                body: String(formData.content),
                userAuthor: String(useAuthStore.getState().user?.userName),
                role: String(useAuthStore.getState().user?.role)
              },
              props.id
            )
          : await createNews({
              title: String(formData.title),
              imageId: imageId,
              body: String(formData.content),
              userAuthor: String(useAuthStore.getState().user?.userName),
              role: String(useAuthStore.getState().user?.role)
            })
        // Condition: If response has 'id', show success toast and close; if 'message', show error toast
        if (response) {
          const toastOptions = {
            duration: 5000,
            style: {
              backgroundColor: 'id' in response ? 'green' : '#ff0000',
              color: '#ffffff'
            }
          }
          if ('id' in response) {
            toast.success(props.id ? 'Noticia Actualizada' : 'Noticia creada con éxito.', toastOptions)
            props.onClose()
          } else if ('message' in response) {
            toast.error(response.message, toastOptions)
          }
        } else {
          toast.error('Error al crear la noticia.', {
            duration: 5000,
            style: {
              backgroundColor: '#ff0000',
              color: '#ffffff'
            }
          })
        }
      } else if ('message' in uploadedImage) {
        toast.error(uploadedImage.message as string, {
          duration: 5000,
          style: {
            backgroundColor: '#ff0000',
            color: '#ffffff'
          }
        })
      }
    }
    // Condition: If file is a string, use existing image; otherwise, upload new image
    if (typeof formData.file === 'string') {
      processResponse({ data: { id: (await getNewsArticle(props.id!)).imageId.id } })
    } else {
      const uploadedImage = props.id ? await updateImage(formData.file, props.id) : await createImage(formData.file)
      processResponse(uploadedImage)
    }
  }

  const dataValidate = () => {
    const data = methods.getValues()
    const missingFields = []
    // Condition: Check for missing required fields and show error toast if any are missing
    if (!data.title) missingFields.push('Título')
    if (!data.content) missingFields.push('Cuerpo de la noticia')
    if (!data.file) missingFields.push('Archivo de imagen')
    if (missingFields.length > 0) {
      toast.error(`Favor de llenar los datos de: ${missingFields.join(', ')}`, {
        duration: 5000,
        style: {
          backgroundColor: '#ff0000',
          color: '#ffffff'
        }
      })
      return
    }
    setShowConfirm(true)
  }

  const clearForm = () => {
    // Condition: If editing, reload news and reset form; otherwise, reset form and image
    if (props.id) {
      const fetchNews = async () => {
        const news = await getNewsArticle(props.id!)
        if (news) {
          methods.reset({
            title: news.title,
            file: process.env.NEXT_PUBLIC_API_URL + 'api/v1/image/' + news.imageId.id,
            content: news.body
          })
          setCoverImage(news.imageId.id)
          imageInputRef.current?.resetImageInput(news.imageId.id)
        } else {
          toast.error('No se pudo recargar la noticia.', {
            duration: 5000,
            style: {
              textAlign: 'justify',
              backgroundColor: '#ff0000',
              color: '#ffffff'
            }
          })
        }
      }
      fetchNews()
    } else {
      methods.reset()
      setCoverImage('')
      imageInputRef.current?.resetImageInput()
    }
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
        className={`margin-auto md:mx-auto max-w-7xl md:px-4 w-full h-full lg:px-8 lg:w-2/3 lg:h-auto 
    min-h-screen place-items-center justify-between py-10`}>
        <BasicPanelComponent backgroundColor='bg-white dark:bg-dark-primary'>
          <div className='relative'>
            <div className='absolute top-0 right-0 flex gap-1 p-2'>
              <div
                className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 rounded'
                title='Restablecer formulario'>
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
              {props.id ? 'Editar noticia' : 'Crear noticia'}
            </TextComponent>

            <TextFieldComponent
              labelText='Título*'
              fieldName='title'
              id='title'
              register={methods.register}
              necessary={true}
              auto='off'
              type='text'
              className='m-4'
            />
            <Controller
              name='file'
              defaultValue={null}
              control={methods.control}
              rules={{ required: true }}
              render={({ field }) => (
                <ImageInputComponent
                  ref={imageInputRef}
                  value={field.value}
                  register={methods.register}
                  onChange={field.onChange}
                  fieldName='file'
                  cover={coverImage}
                />
              )}
            />
            <Controller
              name='content'
              defaultValue=''
              control={methods.control}
              render={({ field }) => (
                <MarkdownAreaComponent
                  value={field.value}
                  onChange={newValue => field.onChange(newValue)}
                  labelText='Cuerpo de la noticia*'
                  className='p-2'
                />
              )}
            />
            <SubmitComponent
              text={props.id ? 'Actualizar noticia' : 'Crear noticia'}
              action={dataValidate}
            />
          </div>
        </BasicPanelComponent>
      </form>
    </>
  )
}

export default CreateNewsComponent
