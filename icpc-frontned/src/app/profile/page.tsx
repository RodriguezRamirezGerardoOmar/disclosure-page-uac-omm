'use client'
import { useForm } from 'react-hook-form'
import { ButtonComponent } from '../components/buttons/ButtonComponent'
import TextFieldComponent from '../components/forms/TextFieldComponent'
import TabComponent from '../components/tabs/TabComponent'
import { NewspaperIcon, ArchiveBoxIcon, ListBulletIcon, BookmarkIcon } from '@heroicons/react/20/solid'
import useAuthStore from '@/store/useStore'
import { useCallback, useEffect, useState } from 'react'
import useNewsStore from '@/store/useNewsStore'
import { Categories, Exercise, News, Note, Tags, AllTabs } from '@/constants/types'
import ProfileTableComponent from '../components/tables/ProfileTableComponent'
import useExcerciseStore from '@/store/useExcerciseStore'
import useNoteStore from '@/store/useNoteStore'
import useUtilsStore from '@/store/useUtilsStore'

const myTabs = [
  { name: 'Ejercicios', href: '#', icon: ListBulletIcon, current: true },
  { name: 'Apuntes', href: '#', icon: BookmarkIcon, current: false },
  { name: 'Noticias', href: '#', icon: NewspaperIcon, current: false },
  { name: 'Reportes', href: '#', icon: ArchiveBoxIcon, current: false },
]
const adminTabs = [
  { name: 'Cambios', href: '#', icon: ArchiveBoxIcon, current: false },
  { name: 'Categoría', href: '#', icon: ListBulletIcon, current: false },
  { name: 'Etiqueta', href: '#', icon: BookmarkIcon, current: false },
  { name: 'Tiempo', href: '#', icon: NewspaperIcon, current: false },
  { name: 'Memoria', href: '#', icon: ArchiveBoxIcon, current: false },
  { name: 'Dificultad', href: '#', icon: ArchiveBoxIcon, current: false },
  { name: 'Cuentas', href: '#', icon: ArchiveBoxIcon, current: false }
]

function Page() {
  const methods = useForm()

  const user = useAuthStore(state => state.user)
  const getProfile = useAuthStore(state => state.getProfile)

  const [ tableData, setTableData ] = useState<News[] | Note[] | Exercise[] | Categories[] | Tags[] | Time[] | Memory[] | Difficulty[] | Account[]>([])
  const [ mode, setMode ] = useState('exercises')
  const getNews = useNewsStore.getState().getNews
  const getExercises = useExcerciseStore.getState().getExerciseList
  const getNotes = useNoteStore.getState().getList
  const getCategories = useUtilsStore.getState().getCategories
  const getTags = useUtilsStore.getState().getTags
  const getTime = useUtilsStore.getState().getTime
  const getMemory = useUtilsStore.getState().getMemory
  const getDifficulty = useUtilsStore.getState().getDifficulty
  const getAccount = useUtilsStore.getState().getAccount

  const handleChange = useCallback(async (data: string) => {
    const tab = data
    switch (tab){
      case AllTabs.EXERCISES:
        const exercises: Exercise[] = await getExercises([],"","")
        setTableData(exercises)
        setMode('exercises')
        break;
      case AllTabs.NOTES:
        const notes: Note[] = await getNotes([],"")
        setTableData(notes)
        setMode('notes')
        break;
      case AllTabs.NEWS:
        const news: News[] = await getNews()
        setTableData(news)
        setMode('news')
        break;
      case AllTabs.REPORTS:
        break;
      case AllTabs.CHANGES:
        break;
      case AllTabs.CATEGORIES:
        const categories: Categories[] = await getCategories()
        setTableData(categories)
        setMode('categories')
        break;
      case AllTabs.TAGS:
        const tags: Tags[] = await getTags()
        setTableData(tags)
        setMode('Tags')
        break;
      case AllTabs.TIME:
        const time: Time[] = await getTime()
        setTableData(time)
        setMode('time')
        break;
      case AllTabs.MEMORY:
        const memory: Memory[] = await getMemory()
        setTableData(memory)
        setMode('memory')
        break;
      case AllTabs.DIFFICULTY:
        const difficulty: Difficulty[] = await getDifficulty()
        setTableData(difficulty)
        setMode('difficulty')
        break;
      case AllTabs.ACCOUNT:
        const account: Account[] = await getAccount()
        setTableData(account)
        setMode('account')
        break;
    }
  }, [getExercises, getNews, getNotes])

  useEffect(() => {
    getProfile()
    handleChange(mode)
  }, [getProfile, handleChange, mode])

  return (
    <div>
      <div className=''>
        <main className='mt-14'>
          <div className='divide-y divide-white/5'>
            <div className='grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8'>
              <div>
                <h2 className='text-base font-semibold leading-7 dark:text-white'>Información personal</h2>
                <p className='mt-1 text-sm leading-6 text-gray-400'>
                  Usa tu correo institucional.
                </p>
              </div>

              <form className='md:col-span-2'>
                <div className='grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6'>
                  <div className='col-span-full flex items-center gap-x-8'>
                    <img
                      // eslint-disable-next-line max-len
                      src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                      alt=''
                      className='h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover'
                    />
                    <div>
                      <ButtonComponent
                        text='Cambiar foto de perfil'
                        buttonType='button_outline'
                        icon={false}
                      />
                      <p className='mt-2 text-xs leading-5 text-gray-400'>JPG, GIF or PNG. 1MB max.</p>
                    </div>
                  </div>

                  <div className='sm:col-span-3'>
                    <div className='mt-2'>
                      <TextFieldComponent
                        id='first-name'
                        fieldName='first-name'
                        labelText='Nombre'
                        register={methods.register}
                        necessary={false}
                        type='text'
                        placeholder={user?.name}
                      />
                    </div>
                  </div>

                  <div className='sm:col-span-3'>
                    <div className='mt-2'>
                      <TextFieldComponent
                        id='last-name'
                        fieldName='last-name'
                        labelText='Apellidos'
                        register={methods.register}
                        necessary={false}
                        type='text'
                        placeholder={user?.lastName}
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
                        placeholder={user?.email}
                      />
                    </div>
                  </div>

                  <div className='col-span-full'>
                    <div className='mt-2'>
                      <TextFieldComponent
                        id='user-name'
                        fieldName='user-name'
                        labelText='Nombre de usuario'
                        register={methods.register}
                        necessary={false}
                        type='text'
                        placeholder={user?.userName}
                      />
                    </div>
                  </div>
                </div>

                <div className='mt-8 flex'>
                  <ButtonComponent
                    text='Guardar'
                    buttonType='button'
                    icon={false}
                  />
                </div>
              </form>
            </div>
            <div className='mx-10'>
              <TabComponent myTabs={myTabs} adminTabs={adminTabs} handleChange={handleChange} />
            </div>
            <div className='mx-10'>
              <ProfileTableComponent data={tableData} itemType={mode}/>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Page
