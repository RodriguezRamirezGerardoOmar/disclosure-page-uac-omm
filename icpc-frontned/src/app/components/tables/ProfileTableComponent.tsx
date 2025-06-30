'use client'
import React, { useState, Dispatch, SetStateAction } from 'react'
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
import CreateCategoryComponent from '../modals/CreateCategoryComponent'
import CreateDifficultyComponent from '../modals/CreateDifficultyComponent'
import CreateTagComponent from '../modals/CreateTagComponent'
import CreateExcerciseComponent from '../modals/CreateExcerciseComponent'
import CreateNoteComponent from '../modals/CreateNoteComponent'
import CreateNewsComponent from '../modals/CreateNewsComponent'
import CreateUserComponent from '../modals/CreateUserComponent'
import { useForm } from 'react-hook-form'
import DisplayReportComponent from '../cards/DisplayReportComponent'
import ConfirmDenyComponent from '../buttons/Confirm&DenyComponent'

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
  onClose: () => void
}

/*
Input: data (array of items to display in the table), itemType (type of items), update (boolean to trigger updates), 
setUpdate (function to update state), onClose (callback to close modals)
Output: a table displaying items with actions (view, edit, delete), and modals for creating/editing/deleting items
Return value: a component used to manage and display a list of items with contextual actions and modals
Function: renders a table of items, provides contextual menu actions, manages modal state for CRUD operations, 
and handles feedback and confirmation dialogs
Variables: data, itemType, update, setUpdate, onClose, methods, all modal state variables, confirmDelete, deleteId, 
deleteItemType, active*Id, delete* functions, hasPendingTicket, selectedReportId, options, setCurrentOptions, and all handler functions
Date: 28 - 05 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

const ProfileTableComponent = (props: Readonly<IProfileTableComponentProps>) => {
  const methods = useForm()
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [isDifficultyModalOpen, setIsDifficultyModalOpen] = useState(false)
  const [isTagModalOpen, setIsTagModalOpen] = useState(false)
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false)
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false)
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false)
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleteItemType, setDeleteItemType] = useState<string | null>(null)
  const [activeCategoryId, setActiveCategoryId] = useState<string | undefined>(undefined)
  const [activeDifficultyId, setActiveDifficultyId] = useState<string | undefined>(undefined)
  const [activeMemoryId, setActiveMemoryId] = useState<string | undefined>(undefined)
  const [activeTimeId, setActiveTimeId] = useState<string | undefined>(undefined)
  const [activeTagId, setActiveTagId] = useState<string | undefined>(undefined)
  const [activeExerciseId, setActiveExerciseId] = useState<string | undefined>(undefined)
  const [activeNoteId, setActiveNoteId] = useState<string | undefined>(undefined)
  const [activeNewsId, setActiveNewsId] = useState<string | undefined>(undefined)
  const [activeUserId, setActiveUserId] = useState<string | undefined>(undefined)
  const deleteExercise = useExcerciseStore(state => state.deleteExercise)
  const deleteNote = useNoteStore(state => state.deleteNote)
  const deleteNews = useNewsStore(state => state.deleteNews)
  const deleteCategory = useUtilsStore(state => state.deleteCategory)
  const deleteTag = useUtilsStore(state => state.deleteTag)
  const deleteDifficulty = useUtilsStore(state => state.deleteDifficulty)
  const deleteUser = useStore(state => state.deleteUser)
  const hasPendingTicket = useUtilsStore(state => state.hasPendingTicket)

  const [selectedReportId, setSelectedReportId] = useState<string | null>(null)

  const handleRedirect = (id: string, itemType: string, href?: string) => {
    window.location.href = `/${href}/${id}`
  }

  const handleShowReport = (id: string, itemType: string) => {
    setSelectedReportId(id)
  }

  const handleEdit = async (id: string, itemType: string) => {
    try {
      if (itemType === 'Noticias' || itemType === 'Ejercicios' || itemType === 'Apuntes') {
        const response = await hasPendingTicket(id, itemType)

        if (response === true) {
          toast.error('Ya existe una modificación en espera para este ítem.', {
            duration: 5000,
            style: { backgroundColor: 'red', color: 'white' }
          })
          return
        }
        switch (itemType) {
          case AllTabs.EXERCISES:
            setActiveExerciseId(id)
            setIsExerciseModalOpen(true)
            break
          case AllTabs.NOTES:
            setActiveNoteId(id)
            setIsNoteModalOpen(true)
            break
          case AllTabs.NEWS:
            setActiveNewsId(id)
            setIsNewsModalOpen(true)
            break
        }
      } else {
        switch (itemType) {
          case AllTabs.CATEGORIES:
            setActiveCategoryId(id)
            setIsCategoryModalOpen(true)
            break
          case AllTabs.DIFFICULTY:
            setActiveDifficultyId(id)
            setIsDifficultyModalOpen(true)
            break
          case AllTabs.TAGS:
            setActiveTagId(id)
            setIsTagModalOpen(true)
            break
          case AllTabs.ACCOUNT:
            setActiveUserId(id)
            setIsUserModalOpen(true)
            break
          default:
            console.error('Tipo de ítem no reconocido:', itemType)
        }
      }
      props.setUpdate(!props.update)
    } catch (error) {
      console.error('Error al verificar el estado del ticket:', error)
      toast.error('Error al verificar el estado del ticket.', {
        duration: 5000,
        style: { backgroundColor: 'red', color: 'white' }
      })
    }
  }

  const handleDelete = async (id: string, itemType: string) => {
    if (itemType === 'Noticias' || itemType === 'Ejercicios' || itemType === 'Apuntes') {
      const response = await hasPendingTicket(id, itemType)

      if (response === true) {
        toast.error('Hay una solicitud de modificación en espera para este ítem.', {
          duration: 5000,
          style: { backgroundColor: 'red', color: 'white' }
        })
        return
      }
    }
    setDeleteId(id)
    setDeleteItemType(props.itemType)
    setConfirmDelete(true)
  }

  const confirmDeleteAction = async () => {
    let response
    switch (deleteItemType) {
      case AllTabs.EXERCISES:
        response = await deleteExercise(deleteId!)
        break
      case AllTabs.NOTES:
        response = await deleteNote(deleteId!)
        break
      case AllTabs.NEWS:
        response = await deleteNews(deleteId!)
        break
      case AllTabs.CATEGORIES:
        response = await deleteCategory(deleteId!)
        break
      case AllTabs.TAGS:
        response = await deleteTag(deleteId!)
        break
      case AllTabs.DIFFICULTY:
        response = await deleteDifficulty(deleteId!)
        break
      case AllTabs.ACCOUNT:
        response = await deleteUser(deleteId!)
        break
    }

    if ('id' in response!) {
      toast.success(`Solicitud de eliminación enviada`, { duration: 5000, style: { backgroundColor: 'green', color: 'white' } })
    }

    setConfirmDelete(false)
    setDeleteId(null)
    setDeleteItemType(null)
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
  switch (itemType) {
    case AllTabs.REPORTS:
      // "View" for reports (verify changes)
      return [options[3]]

    case AllTabs.CHANGES:
      // "View" for changes
      return [options[0]]

    case AllTabs.EXERCISES:
      return [
        // "View" to redirect to the item
        { ...options[0], href: 'exercises' },
        // "Edit"
        options[1],
        // "Delete"
        options[2]
      ]

    case AllTabs.NOTES:
      return [
        // "View" to redirect to the item
        { ...options[0], href: 'note' },
        // "Edit"
        options[1],
        // "Delete"
        options[2]
      ]

    case AllTabs.NEWS:
      return [
        // "View" to redirect to the item
        { ...options[0], href: 'news' },
        // "Edit"
        options[1],
        // "Delete"
        options[2]
      ]

    default:
      // "Edit", "Delete" for other items
      return [options[1], options[2]]
  }
}

  return (
    <div>
      {selectedReportId && (
        <DisplayReportComponent
          id={selectedReportId}
          onClose={() => {
            setSelectedReportId(null)
            props.setUpdate(!props.update)
          }}
        />
      )}
      {confirmDelete && (
        <ConfirmDenyComponent
          onConfirm={confirmDeleteAction}
          onCancel={() => setConfirmDelete(false)}
        />
      )}
      {isCategoryModalOpen && (
        <CreateCategoryComponent
          onClose={() => {
            setIsCategoryModalOpen(false)
            props.setUpdate(!props.update)
          }}
          categoryId={activeCategoryId}
        />
      )}
      {isDifficultyModalOpen && (
        <CreateDifficultyComponent
          onClose={() => {
            setIsDifficultyModalOpen(false)
            props.setUpdate(!props.update)
          }}
          difficultyId={activeDifficultyId}
          methods={methods}
          onCreateDifficulty={(difficultyName: string) => {}}
        />
      )}
      {isTagModalOpen && (
        <CreateTagComponent
          onClose={() => {
            setIsTagModalOpen(false)
            props.setUpdate(!props.update)
          }}
          tagId={activeTagId}
          methods={methods}
          onCreateTag={(tagName: string) => {}}
        />
      )}
      {isExerciseModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
          <div className='rounded-lg p-6 w-full max-h-[90%] overflow-y-auto'>
            <CreateExcerciseComponent
              onClose={() => {
                setIsExerciseModalOpen(false)
                props.setUpdate(!props.update)
              }}
              id={activeExerciseId}
            />
          </div>
        </div>
      )}
      {isNoteModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
          <div className='rounded-lg p-6 w-full max-h-[90%] overflow-y-auto'>
            <CreateNoteComponent
              onClose={() => {
                setIsNoteModalOpen(false)
                props.setUpdate(!props.update)
              }}
              id={activeNoteId}
            />
          </div>
        </div>
      )}
      {isNewsModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
          <div className='rounded-lg p-6 w-full max-h-[90%] overflow-y-auto'>
            <CreateNewsComponent
              onClose={() => {
                setIsNewsModalOpen(false)
                props.setUpdate(!props.update)
              }}
              id={activeNewsId}
            />
          </div>
        </div>
      )}
      {isUserModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
          <div className='rounded-lg p-6 w-full max-h-[90%] overflow-y-auto'>
            <CreateUserComponent
              onClose={() => {
                setIsUserModalOpen(false)
                props.setUpdate(!props.update)
              }}
              id={activeUserId}
            />
          </div>
        </div>
      )}
      <div className='relative lg:px-16'>
        <table className='w-full table-fixed border-separate border-spacing-0 z-10'>
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
                className='w-20 sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 
                text-right text-sm font-semibold text-gray-500 backdrop-blur 
                backdrop-filter sm:pl-6 lg:pl-8'></th>
            </tr>
          </thead>
          <tbody>
            {props.data.length !== 0 ? (
              // Condition: If there are items, map and render each row; otherwise, show empty message
              props.data.map(item => (
                <tr
                  key={item.index}
                  className='cursor-pointer hover:bg-slate-200'>
                  <td
                    className={`whitespace-nowrap max-w-[200px] overflow-hidden text-ellipsis py-4 pl-4 pr-3 text-sm font-medium text-gray-900 
                    dark:text-dark-accent sm:pl-6 lg:pl-8`}>
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
                    {item.level && <TextComponent>{item.level}</TextComponent>}
                  </td>
                  <td
                    className={`text-right whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium 
                    text-gray-900 dark:text-dark-accent sm:pl-6 lg:pl-8`}>
                    <ThreeDotComponent
                      id={item.id}
                      itemType={props.itemType}
                      options={setCurrentOptions(item.id, props.itemType)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              // Condition: If no items, show empty message row
              <tr>
                <td
                  className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 
                  dark:text-dark-accent sm:pl-6 lg:pl-8 w-full justify-between items-center'>
                  <TextComponent>¡Ups! No hay elementos para mostrar</TextComponent>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProfileTableComponent
