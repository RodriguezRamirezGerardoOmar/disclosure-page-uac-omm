'use client'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import TextFieldComponent from '../components/forms/TextFieldComponent'
import TabComponent from '../components/tabs/TabComponent'
import { NewspaperIcon, ArchiveBoxIcon, ListBulletIcon, BookmarkIcon } from '@heroicons/react/20/solid'
import useAuthStore, { IUser } from '@/store/useStore'
import { useCallback, useEffect, useState } from 'react'
import useNewsStore from '@/store/useNewsStore'
import {
  Categories,
  Exercise,
  News,
  Note,
  Tags,
  AllTabs,
  Difficulties,
  IProfileTableItem,
  Report,
  Ticket
} from '@/constants/types'
import ProfileTableComponent from '../components/tables/ProfileTableComponent'
import useExcerciseStore from '@/store/useExcerciseStore'
import useNoteStore from '@/store/useNoteStore'
import useUtilsStore from '@/store/useUtilsStore'
import LogoComponent from '../components/LogoComponent'
import SubmitComponent from '../components/forms/SubmitComponent'
import { toast } from 'sonner'

/*
Input: none (static profile page, no props or parameters)
Output: a page displaying user profile information, editable form, tab navigation, and a table of items based on the selected tab
Return value: a page component used to manage and display user profile data and related items (exercises, notes, news, reports, etc.)
Function: fetches and updates user profile data, manages tab state, fetches and displays data for the selected tab, and provides forms for editing user info
Variables: methods, user, getProfile, tableData, mode, update, currentUser, all data fetching functions, handleSubmitUserInfo, handleChange
Date: 28 - 05 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

const myTabs = [
  { name: 'Ejercicios', href: '#', icon: ListBulletIcon, current: true },
  { name: 'Apuntes', href: '#', icon: BookmarkIcon, current: false },
  { name: 'Noticias', href: '#', icon: NewspaperIcon, current: false },
  { name: 'Reportes', href: '#', icon: ArchiveBoxIcon, current: false }
]
const adminTabs = [
  { name: 'Cambios', href: '#', icon: ArchiveBoxIcon, current: false },
  { name: 'Categoría', href: '#', icon: ListBulletIcon, current: false },
  { name: 'Etiqueta', href: '#', icon: BookmarkIcon, current: false },
  { name: 'Dificultad', href: '#', icon: ArchiveBoxIcon, current: false },
  { name: 'Cuentas', href: '#', icon: ArchiveBoxIcon, current: false }
]

function Page() {
  const methods = useForm()

  const user = useAuthStore(state => state.user)
  const getProfile = useAuthStore(state => state.getProfile)

  const [tableData, setTableData] = useState<IProfileTableItem[]>([])
  const [mode, setMode] = useState(AllTabs.EXERCISES)
  const [update, setUpdate] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<IUser>(user!)
  const getNews = useNewsStore.getState().getNews
  const getExercises = useExcerciseStore.getState().getExerciseList
  const getNotes = useNoteStore.getState().getList
  const getCategories = useUtilsStore.getState().getCategories
  const getTags = useUtilsStore.getState().getTags
  const getDifficulty = useUtilsStore.getState().getDifficulties
  const getUsers = useAuthStore.getState().getUsers
  const getOpenReports = useUtilsStore.getState().getOpenReports
  const getPendingTickets = useUtilsStore.getState().getPendingTickets
  const updateUser = useAuthStore(state => state.updateUser)

  const handleSubmitUserInfo: SubmitHandler<FieldValues> = async (data: any) => {
    try {
      const result = await updateUser(user!.id, {
        ...data,
        role: user!.role,
        editorId: user!.id,
        password: null,
        passwordVerify: null
      })
      if ('id' in result) {
        setCurrentUser(result) 
        useAuthStore.setState({ user: result }) 
        toast.success('¡Información actualizada!', {
          duration: 5000,
          style: { backgroundColor: 'green', color: '#ffffff' }
        })
      }
      setUpdate(!update)
    } catch (error: any) {
      console.error('Error al actualizar:', error) 
      toast.error(error.message || 'Error al actualizar', {
        duration: 5000,
        style: { backgroundColor: 'red', color: '#ffffff' }
      })
    }
  }

  const handleChange = useCallback(
    async (data: string) => {
      const tab = data
      switch (tab) {
        case AllTabs.EXERCISES:
          const exercises: Exercise[] = await getExercises([], '', '')
          const mappedExercises: IProfileTableItem[] = exercises.map((exercise, index) => {
            return { title: exercise.title, index, id: exercise.id }
          })
          setTableData(mappedExercises)
          setMode(AllTabs.EXERCISES)
          break
        case AllTabs.NOTES:
          const notes: Note[] = await getNotes([], '')
          const mappedNotes = notes.map((note, index) => {
            return { index, ...note }
          })
          setTableData(mappedNotes)
          setMode(AllTabs.NOTES)
          break
        case AllTabs.NEWS:
          const news: News[] = await getNews()
          const mappedNews = news.map((newsArticle, index) => {
            return { index, title: newsArticle.title, id: newsArticle.id }
          })
          setTableData(mappedNews)
          setMode(AllTabs.NEWS)
          break
        case AllTabs.REPORTS:
          const reports: Report[] = await getOpenReports()
          const mappedReports = reports.map((report, index) => {
            return { index, title: report.summary, id: report.id }
          })
          setTableData(mappedReports)
          setMode(AllTabs.REPORTS)
          break
        case AllTabs.CHANGES:
          const tickets: Ticket[] = await getPendingTickets()
          const mappedTickets = tickets.map((ticket, index) => {
            return { index, title: ticket.commentId.body, id: ticket.id }
          })
          setTableData(mappedTickets)
          setMode(AllTabs.CHANGES)
          break
        case AllTabs.CATEGORIES:
          const categories: Categories[] = await getCategories()
          const mappedCategories = categories.map((category, index) => {
            return { index: index, title: category.name, id: category.id }
          })
          setTableData(mappedCategories)
          setMode(AllTabs.CATEGORIES)
          break
        case AllTabs.TAGS:
          const tags: Tags[] = await getTags()
          const mappedTags = tags.map((tag, index) => {
            return { index, title: tag.name, id: tag.id, color: tag.color, tagName: tag.name }
          })
          setTableData(mappedTags)
          setMode(AllTabs.TAGS)
          break
        case AllTabs.DIFFICULTY:
          const difficulty: Difficulties[] = await getDifficulty()
          const mappedDifficulty = difficulty.map((difficulty, index) => {
            return { index, title: difficulty.name, id: difficulty.id, level: difficulty.level }
          })
          setTableData(mappedDifficulty)
          setMode(AllTabs.DIFFICULTY)
          break
        case AllTabs.ACCOUNT:
          const account: IUser[] = await getUsers()
          const mappedAccount = account.map((account, index) => {
            return { index, title: account.userName, id: account.id }
          })
          setTableData(mappedAccount)
          setMode(AllTabs.ACCOUNT)
          break
      }
    },
    [
      getCategories,
      getDifficulty,
      getExercises,
      getNews,
      getNotes,
      getTags,
      getUsers,
      getOpenReports,
      getPendingTickets
    ]
  )

  useEffect(() => {
    getProfile()
    handleChange(mode)
  }, [getProfile, handleChange, mode, update])

  return (
    <div>
      <div className=''>
        <main className='mt-14'>
          <div className='divide-y divide-white/5'>
            <div className='grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8'>
              <div>
                <h2 className='text-base font-semibold leading-7 dark:text-white'>Información personal</h2>
                <p className='mt-1 text-sm leading-6 text-gray-400'>
                  En esta página puedes ver y cambiar los datos de tu cuenta.
                  Más abajo encontrarás la tabla desde la cual puedes crear nuevos ejercicios, apuntes o noticias.
                </p>
              </div>

              <form
                className='md:col-span-2'
                onSubmit={methods.handleSubmit(handleSubmitUserInfo)}>
                <div className='grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6'>
                  <div className='col-span-full flex items-center gap-x-8'>
                    <LogoComponent size={96} />
                  </div>
                  <div className='sm:col-span-3'>
                    <div className='mt-2'>
                      <TextFieldComponent
                        id='name'
                        fieldName='name'
                        labelText='Nombre'
                        register={methods.register}
                        necessary={false}
                        type='text'
                        placeholder={currentUser ? currentUser.name : 'Nombre'}
                      />
                    </div>
                  </div>

                  <div className='sm:col-span-3'>
                    <div className='mt-2'>
                      <TextFieldComponent
                        id='last-name'
                        fieldName='lastName'
                        labelText='Apellidos'
                        register={methods.register}
                        necessary={false}
                        type='text'
                        placeholder={currentUser ? currentUser.lastName : 'Apellidos'}
                      />
                    </div>
                  </div>

                  <div className='col-span-full'>
                    <div className='mt-2'>
                      <TextFieldComponent
                        id='email'
                        fieldName='email'
                        labelText='Correo Electrónico'
                        register={methods.register}
                        necessary={false}
                        type='email'
                        placeholder={currentUser ? currentUser.email : 'Correo Electrónico'}
                      />
                    </div>
                  </div>

                  <div className='col-span-full'>
                    <div className='mt-2'>
                      <TextFieldComponent
                        id='user-name'
                        fieldName='userName'
                        labelText='Nombre de usuario'
                        register={methods.register}
                        necessary={false}
                        type='text'
                        placeholder={currentUser ? currentUser.userName : 'Nombre de usuario'}
                      />
                    </div>
                  </div>
                </div>

                <div className='mt-8 flex'>
                  <SubmitComponent
                    text='Guardar'
                    action={methods.handleSubmit(handleSubmitUserInfo)}
                  />
                </div>
              </form>
            </div>
            <div className='mx-10'>
              <TabComponent
                myTabs={myTabs}
                adminTabs={adminTabs}
                handleChange={handleChange}
                isAdmin={user?.role === 'admin'}
                updateTable={() => setUpdate(!update)}
              />
            </div>
            <div className='mx-10 sm:padding-full'>
              <ProfileTableComponent
                data={tableData}
                itemType={mode}
                update={update}
                setUpdate={setUpdate}
                onClose={() => {}}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Page
