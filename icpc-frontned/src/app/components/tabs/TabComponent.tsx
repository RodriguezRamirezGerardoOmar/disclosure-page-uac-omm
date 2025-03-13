import { useState } from 'react'
import CreateExerciseComponent from '../modals/CreateExcerciseComponent'
import CreateNoteComponent from '../modals/CreateNoteComponent'
import CreateNewsComponent from '../modals/CreateNewsComponent'
import { ButtonComponent } from '../buttons/ButtonComponent'
import CreateCategoryComponent from '../modals/CreateCategoryComponent'
import CreateDifficultyComponent from '../modals/CreateDifficultyComponent'
import CreateTimeLimitComponent from '../modals/CreateTimeComponent'
import CreateMemoryComponent from '../modals/CreateMemoryComponent'
import CreateTagComponent from '../modals/CreateTagComponent'
import CreateUserComponent from '../modals/CreateUserComponent'
import { useForm, FieldValues } from 'react-hook-form'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function TabComponent({
  myTabs,
  adminTabs,
  isAdmin,
  handleChange
}: Readonly<{
  readonly myTabs: ReadonlyArray<{
    href: string | undefined
    name: string
    current?: boolean
  }>
  readonly adminTabs: ReadonlyArray<{
    href: string | undefined
    name: string
    current?: boolean
  }>
  handleChange: (tabName: string) => void
  isAdmin: boolean
}>) {
  const tabs = myTabs.concat(adminTabs)
  const accountTab = tabs.find(tab => tab.name === 'Cuentas')
  const filteredAdminTabs = adminTabs.filter(tab => tab.name !== 'Cuentas')
  const [showModal, setShowModal] = useState(false)
  const [showCreateButton, setShowCreateButton] = useState(true)
  const [modalComponent, setModalComponent] = useState<JSX.Element | null>(null)
  const [activeTab, setActiveTab] = useState(tabs.find(tab => tab.current)?.name)
  const methods = useForm<FieldValues>()
  const onCreateDifficulty = (DifficultyName: string) => {
    // Implementa la lógica para manejar la creación de una dificultad
  }
  const onCreateTag = (tagName: string) => {
    // Implementa la lógica para manejar la creación de una etiqueta
  }
  const onCreateTimeLimit = (time: number) => {
    // Implementa la lógica para manejar la creación de un límite de tiempo
  }
  const onCreateMemory = (memoryName: string) => {
    // Implementa la lógica para manejar la creación de un límite de memoria
  }

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName)
    handleChange(tabName)

    if (
      tabName === 'Apuntes' ||
      tabName === 'Noticias' ||
      tabName === 'Ejercicios' ||
      tabName === 'Categoría' ||
      tabName === 'Etiqueta' ||
      tabName === 'Tiempo' ||
      tabName === 'Memoria' ||
      tabName === 'Dificultad' ||
      tabName === 'Cuentas'
    ) {
      setShowCreateButton(true)
      if (tabName === 'Apuntes') {
        setModalComponent(<CreateNoteComponent onClose={handleModalClose} />)
      } else if (tabName === 'Noticias') {
        setModalComponent(<CreateNewsComponent onClose={handleModalClose} />)
      } else if (tabName === 'Ejercicios') {
        setModalComponent(<CreateExerciseComponent onClose={handleModalClose} />)
      } else if (tabName === 'Categoría') {
        setModalComponent(<CreateCategoryComponent onClose={handleModalClose} />)
      } else if (tabName === 'Etiqueta') {
        setModalComponent(
          <CreateTagComponent
            methods={methods}
            onCreateTag={onCreateTag}
            onClose={handleModalClose}
          />
        )
      } else if (tabName === 'Tiempo') {
        setModalComponent(
          <CreateTimeLimitComponent
            methods={methods}
            onCreateTimeLimit={onCreateTimeLimit}
            onClose={handleModalClose}
          />
        )
      } else if (tabName === 'Memoria') {
        setModalComponent(
          <CreateMemoryComponent
            methods={methods}
            onCreateMemory={onCreateMemory}
            onClose={handleModalClose}
          />
        )
      } else if (tabName === 'Dificultad') {
        setModalComponent(
          <CreateDifficultyComponent
            methods={methods}
            onCreateDifficulty={onCreateDifficulty}
            onClose={handleModalClose}
          />
        )
      } else if (tabName === 'Cuentas') {
        setModalComponent(
          <CreateUserComponent
            onClose={handleModalClose}
          />
        )
      }
    } else {
      setShowCreateButton(false)
      setModalComponent(null)
    }
  }

  const handleModalOpen = () => {
    if (activeTab === 'Apuntes') {
      setModalComponent(<CreateNoteComponent onClose={handleModalClose} />)
    } else if (activeTab === 'Noticias') {
      setModalComponent(<CreateNewsComponent onClose={handleModalClose} />)
    } else if (activeTab === 'Ejercicios') {
      setModalComponent(<CreateExerciseComponent onClose={handleModalClose} />)
    } else if (activeTab === 'Categoría') {
      setModalComponent(<CreateCategoryComponent onClose={handleModalClose} />)
    } else if (activeTab === 'Etiqueta') {
      setModalComponent(
        <CreateTagComponent
          methods={methods}
          onCreateTag={onCreateTag}
          onClose={handleModalClose}
        />
      )
    } else if (activeTab === 'Tiempo') {
      setModalComponent(
        <CreateTimeLimitComponent
          methods={methods}
          onCreateTimeLimit={onCreateTimeLimit}
          onClose={handleModalClose}
        />
      )
    } else if (activeTab === 'Memoria') {
      setModalComponent(
        <CreateMemoryComponent
          methods={methods}
          onCreateMemory={onCreateMemory}
          onClose={handleModalClose}
        />
      )
    } else if (activeTab === 'Dificultad') {
      setModalComponent(
        <CreateDifficultyComponent
          methods={methods}
          onCreateDifficulty={onCreateDifficulty}
          onClose={handleModalClose}
        />
      )
    } else if (activeTab === 'Cuentas') {
      setModalComponent(
        <CreateUserComponent
          onClose={handleModalClose}
        />
      )
    }
    setShowModal(true)
  }

  const handleModalClose = () => {
    setShowModal(false)
    setModalComponent(null)
  }

  return (
    <div>
      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
          <div className='rounded-lg p-6 w-full max-h-[90%] overflow-y-auto'>{modalComponent}</div>
        </div>
      )}

      <div className='sm:hidden'>
        <label
          htmlFor='tabs'
          className='sr-only'>
          Select a tab
        </label>
        <select
          id='tabs'
          name='tabs'
          className='block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
          value={activeTab}
          onChange={e => handleTabChange(e.target.value)}>
          {isAdmin
            ? tabs.map(tab => (
                <option
                  key={tab.name}
                  value={tab.name}>
                  {tab.name}
                </option>
              ))
            : myTabs.map(tab => (
                <option
                  key={tab.name}
                  value={tab.name}>
                  {tab.name}
                </option>
              ))}
        </select>
      </div>
      <div className='hidden lg:block'>
        <div className='border-b border-gray-200'>
          <div className='flex flex-row gap-8'>
            <div
              className=' flex flex-row space-x-2'
              aria-label='Tabs'>
              {myTabs.map(tab => (
                <a
                  key={tab.name}
                  href={tab.href}
                  className={classNames(
                    tab.name === activeTab
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent dark:text-white hover:border-gray-300 hover:text-gray-700',
                    'group inline-flex items-center border-b-2 py-2 px-1 text-xs font-medium'
                  )}
                  onClick={e => {
                    e.preventDefault()
                    handleTabChange(tab.name)
                    handleChange(tab.name)
                  }}
                  aria-current={tab.name === activeTab ? 'page' : undefined}>
                  <span>{tab.name}</span>
                </a>
              ))}
            </div>
            {isAdmin && (
              <div
                className='bg-primary rounded-md flex flex-row space-x-2'
                aria-label='Tabs'>
                {filteredAdminTabs.map(tab => (
                  <a
                    key={tab.name}
                    href={tab.href}
                    className={classNames(
                      tab.name === activeTab
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-white hover:border-gray-300 hover:text-gray-700',
                      `group inline-flex items-center border-b-2 py-2 px-1 text-xs font-medium`
                    )}
                    onClick={e => {
                      e.preventDefault()
                      handleTabChange(tab.name)
                      handleChange(tab.name)
                    }}
                    aria-current={tab.name === activeTab ? 'page' : undefined}>
                    <span>{tab.name}</span>
                  </a>
                ))}
              </div>
            )}
            {isAdmin && (
              <div
                className='bg-complementary rounded-md flex flex-row space-x-2'
                aria-label='Tabs'>
                {accountTab && (
                  <a
                    href={accountTab.href}
                    className={classNames(
                      accountTab.name === activeTab
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-white hover:border-gray-300 hover:text-gray-700',
                      `group inline-flex items-center border-b-2 py-2 px-1 text-xs font-medium`
                    )}
                    onClick={e => {
                      e.preventDefault()
                      handleTabChange(accountTab.name)
                      handleChange(accountTab.name)
                    }}
                    aria-current={accountTab.name === activeTab ? 'page' : undefined}>
                    <span>{accountTab.name}</span>
                  </a>
                )}
              </div>
            )}
            {showCreateButton && (
              <ButtonComponent
                text='Crear'
                buttonType='button'
                onClick={handleModalOpen}
                className='ml-auto'
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
