import React, { Dispatch, SetStateAction } from 'react'
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

  const handleEdit = (id: string, itemType: string) => {
    console.log('Le picó en Editar', id, itemType)
  }
  const handleDelete = async (id: string) => {
    let response;
    switch(props.itemType) {
      case AllTabs.EXERCISES:
        response = await deleteExercise(id)
        if ('statusCode' in response && response.statusCode === 200) {
          toast.success(response.message, { duration: 5000, style: { backgroundColor: 'green', color: 'white' } })
        }
        console.log('Borró un ejercicio', id)
        break;
      case AllTabs.NOTES:
        response = await deleteNote(id)
        if ('statusCode' in response && response.statusCode === 200) {
          toast.success(response.message, { duration: 5000, style: { backgroundColor: 'green', color: 'white' } })
        }
        console.log(response)
        break;
      case AllTabs.NEWS:
        response = await deleteNews(id)
        if ('statusCode' in response && response.statusCode === 200) {
          toast.success(response.message, { duration: 5000, style: { backgroundColor: 'green', color: 'white' } })
        }
        console.log('Borró una noticia', id)
        break;
      case AllTabs.CATEGORIES:
        response = await deleteCategory(id)
        if ('statusCode' in response && response.statusCode === 200) {
          toast.success(response.message, { duration: 5000, style: { backgroundColor: 'green', color: 'white' } })
        }
        console.log('Borró una categoría', id)
        break;
      case AllTabs.TAGS:
        response = await deleteTag(id)
        if ('statusCode' in response && response.statusCode === 200) {
          toast.success(response.message, { duration: 5000, style: { backgroundColor: 'green', color: 'white' } })
        }
        console.log('Borró una tag', id)
        break;
      case AllTabs.TIME:
        response = await deleteTimeLimit(id)
        if ('statusCode' in response && response.statusCode === 200) {
          toast.success(response.message, { duration: 5000, style: { backgroundColor: 'green', color: 'white' } })
        }
        console.log('Borró un límite de tiempo', id)
        break;
      case AllTabs.MEMORY:
        response = await deleteMemoryLimit(id)
        if ('statusCode' in response && response.statusCode === 200) {
          toast.success(response.message, { duration: 5000, style: { backgroundColor: 'green', color: 'white' } })
        }
        console.log('Borró un límite de memoria', id)
        break;
      case AllTabs.DIFFICULTY:
        response = await deleteDifficulty(id)
        if ('statusCode' in response && response.statusCode === 200) {
          toast.success(response.message, { duration: 5000, style: { backgroundColor: 'green', color: 'white' } })
        }
        console.log('Borró una dificultad', id)
        break;
      case AllTabs.ACCOUNT:
        response = await deleteUser(id)
        if ('statusCode' in response && response.statusCode === 200) {
          toast.success(response.message, { duration: 5000, style: { backgroundColor: 'green', color: 'white' } })
        }
        console.log('Borró un usuario', id)
        break;
      default:
        console.log('No se encontró el tipo de item')
        break;
      }
    props.setUpdate(!props.update)
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
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              id={item.id}
              itemType={props.itemType}
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
  )
}

export default ProfileTableComponent
