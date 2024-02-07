'use client'
import { UserIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { TextComponent } from '@/app/components/text/TextComponent'
import { enumTextTags } from '@/constants/types'
import Link from 'next/link'
import useStore from '@/store/useStore'

interface IUserProps {
  verified: boolean
  options: {
    id: number
    name: string
    href: string
  }[]
}

export default function UserComponent({ options, verified }: Readonly<IUserProps>) {
  const optionStyle =
    'hover:text-secondary hover:bg-gray-100 px-4 py-2 dark:text-accent  dark:hover:text-complementary dark:hover:bg-secondary'

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  // al oprimir el botón de cerrar sesión, se debe ejecutar el hook useStore para eliminar el token de la sesión
  const logout = useStore(state => state.logout)
  return verified ? (
    <>
      <Menu
        as='div'
        className='relative inline-block text-left mx-3 my-3'>
        {({ open }) => (
          <>
            <Menu.Button>
              {open ? (
                <XMarkIcon
                  className='block h-6 w-6'
                  aria-hidden='true'
                />
              ) : (
                <UserIcon className='h-10 w-10 rounded-full' />
              )}
            </Menu.Button>
            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'>
              <Menu.Items
                className={`absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white 
                  dark:bg-primary shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}>
                <div className='py-1 grid grid-cols-1'>
                  {options.map(option => (
                    <Menu.Item key={option.id}>
                      {({ active }) => (
                        <Link
                          href={option.href}
                          className={optionStyle}>
                          <TextComponent
                            sizeFont='s12'
                            tag={enumTextTags.p}
                            className={classNames(active ? 'dark:bg-secondary' : 'dark:text-dark-accent', 'flex py-1')}>
                            {option.name}
                          </TextComponent>
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                  {verified ? (
                    <>
                      <Menu.Item>
                        <Link
                          className={optionStyle}
                          href='/profile'>
                          <TextComponent
                            sizeFont='s12'
                            tag={enumTextTags.p}
                            className={`hover:text-secondary dark:hover:bg-secondary
                            dark:hover:text-complementary dark:text-dark-accent text-gray-700 flex py-1`}>
                            Mi perfil
                          </TextComponent>
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <Link
                          className={optionStyle}
                          href='#'
                          onClick={() => {
                            logout()
                          }}>
                          <TextComponent
                            sizeFont='s12'
                            tag={enumTextTags.p}
                            className={`hover:text-secondary dark:hover:bg-secondary
                            dark:hover:text-complementary dark:text-dark-accent text-gray-700 flex py-1`}>
                            Cerrar sesión
                          </TextComponent>
                        </Link>
                      </Menu.Item>
                    </>
                  ) : (
                    <Menu.Item>
                      <Link
                        className={optionStyle}
                        href='/login'>
                        <TextComponent
                          sizeFont='s12'
                          tag={enumTextTags.p}
                          className={`hover:text-secondary dark:hover:bg-secondary
                            dark:hover:text-complementary dark:text-dark-accent text-gray-700 flex py-1`}>
                          Iniciar sesión
                        </TextComponent>
                      </Link>
                    </Menu.Item>
                  )}
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </>
  ) : (
    <TextComponent
      tag={enumTextTags.p}
      sizeFont='s12'
      className='hover:text-secondary dark:text-dark-accent dark:hover:text-dark-complementary'>
      Iniciar sesión
    </TextComponent>
  )
}
