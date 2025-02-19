'use client'
import React, { Dispatch, SetStateAction, useState } from 'react'
import ThreeDotComponent from '../dropdowns/ThreeDotComponent'
import { IProfileTableItem, AllTabs } from '@/constants/types'
import { TextComponent } from '../text/TextComponent'
import TagComponent from '../tags/TagComponent'
import useExcerciseStore from '@/store/useExcerciseStore'
import useNoteStore from '@/store/useNoteStore'
import useNewsStore from '@/store/useNewsStore'
import useUtilsStore from '@/store/useUtilsStore'
import useStore from '@/store/useStore'
import { toast } from 'sonner'
import DisplayReportComponent from '../cards/DisplayReportComponent'

interface Option {
  name: string
  action: (id: string, itemType: string, href?: string) => void
  style: string
  href?: string
}

interface IProfileTableComponentProps {
  data: IProfileTableItem[]
  itemType: string
  update: boolean
  setUpdate: Dispatch<SetStateAction<boolean>>
}

const ProfileTableComponent = (props: Readonly<IProfileTableComponentProps>) => {
  const deleteExercise = useExcerciseStore(state => state.deleteExercise)
  const deleteNote = useNoteStore(state => state.deleteNote)
  const deleteNews = useNewsStore(state => state.deleteNews)
  const deleteCategory = useUtilsStore(state => state.deleteCategory)
  const deleteTag = useUtilsStore(state => state.deleteTag)
  const deleteTimeLimit = useUtilsStore(state => state.deleteTimeLimit)
  const deleteMemoryLimit = useUtilsStore(state => state.deleteMemoryLimit)
  const deleteDifficulty = useUtilsStore(state => state.deleteDifficulty)
  const deleteUser = useStore(state => state.deleteUser)
  
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null)

  const handleRedirect = (id: string, itemType: string, href?: string) => {
    window.location.href = `/${href}/${id}`
  }

  const handleShowReport = (id: string, itemType: string) => {
    setSelectedReportId(id)
  }

  const handleEdit = (id: string, itemType: string) => {
    toast.success("le picó en editar" + id + itemType, { duration: 5000, style: { backgroundColor: 'green', color: 'white' }})
  }

  //TODO saca el toast.success del switch y ponlo afuera
  const handleDelete = async (id: string) => {
    let response;
    switch(props.itemType) {
      case AllTabs.EXERCISES:
        response = await deleteExercise(id)
        break;
      case AllTabs.NOTES:
        response = await deleteNote(id)
        break;
      case AllTabs.NEWS:
        response = await deleteNews(id)
        break;
      case AllTabs.CATEGORIES:
        response = await deleteCategory(id)
        break;
      case AllTabs.TAGS:
        response = await deleteTag(id)
        break;
      case AllTabs.TIME:
        response = await deleteTimeLimit(id)
        break;
      case AllTabs.MEMORY:
        response = await deleteMemoryLimit(id)
        break;
      case AllTabs.DIFFICULTY:
        response = await deleteDifficulty(id)
        break;
      case AllTabs.ACCOUNT:
        response = await deleteUser(id)
        break;
      default: 
        response = { message: 'Error desconocido' }
      }
      if ('statusCode' in response && response.statusCode === 200) {
        toast.success(response.message, { duration: 5000, style: { backgroundColor: 'green', color: 'white' } })
      }
    props.setUpdate(!props.update)
  }

  const options: Option[] = [
    {
      name: 'Ver',
      action: handleRedirect,
      style: 'hover:bg-secondary flex',
      href: 'ticket'
    },
    {
      name: 'Editar',
      action: handleEdit,
      style: 'hover:bg-secondary flex'
    },
    {
      name: 'Eliminar',
      action: handleDelete,
      style: 'hover:bg-red-600 flex'
    },
    {
      name: 'Ver',
      action: handleShowReport,
      style: 'hover:bg-secondary flex'
    }
]

const setCurrentOptions = (id: string, itemType: string) => {
  switch(itemType) {
    case AllTabs.REPORTS:
      return [options[3]]
    case AllTabs.CHANGES:
      return [options[0]]
    default:
      return [options[1], options[2]]
  }
}

  const tableData =
    props.data.length !== 0 ? (
      props.data.map(item => (
        <tr
          key={item.index}
          className='cursor-pointer hover:bg-slate-200'>
          <td
            className={`whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 
        dark:text-dark-accent sm:pl-6 lg:pl-8 w-full justify-between items-center`}>
            <TextComponent>{item.title}</TextComponent>
            {item.tagName && item.color && (
              <div className='max-w-min'>
                <TagComponent
                  color={item.color}
                  tagName={item.title}
                  showIcon={false}
                />
              </div>
            )}
          </td>
          <td className={`whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium 
            text-gray-900 dark:text-dark-accent sm:pl-6 lg:pl-8 justify-between items-center`}>
            <ThreeDotComponent
              id={item.id}
              itemType={props.itemType}
              options={setCurrentOptions(item.id, props.itemType)}
            />
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td
          className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 
      dark:text-dark-accent sm:pl-6 lg:pl-8 w-full justify-between items-center'>
          <TextComponent>¡Ups! No hay elementos para mostrar</TextComponent>
        </td>
      </tr>
    )

  return (
    <div>
      {selectedReportId && (
        <DisplayReportComponent
          id={selectedReportId}
          onClose={() => setSelectedReportId(null)}
        />
      )}
      <table className='min-w-full border-separate border-spacing-0'>
        <thead>
          <tr>
            <th
              scope='col'
              className='sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 
                      text-left text-sm font-semibold text-gray-500 backdrop-blur 
                      backdrop-filter sm:pl-6 lg:pl-8'>
              TÍTULO
            </th>
            <th
              scope='col'
              className='sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 
                      text-left text-sm font-semibold text-gray-500 backdrop-blur 
                      backdrop-filter sm:pl-6 lg:pl-8'></th>
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
    </div>
  )
}

export default ProfileTableComponent
