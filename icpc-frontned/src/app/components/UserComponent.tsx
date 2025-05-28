'use client'
import { UserIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { TextComponent } from '@/app/components/text/TextComponent'
import { enumTextTags } from '@/constants/types'
import { useRouter } from 'next/navigation'
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

/*
Input: a list of options with id, name and href; and a boolean to determine if the user is logged in
Output: a user icon that acts as a dropdown menu with the options passed
Return value: a dropdown menu with the user options as a component
Function: sets a dropdown menu with the user options
Variables: verified, options { id, name, href }
Date: 12 - 04 - 2024
Author: Gerardo Omar Rodriguez Ramirez
*/

export default function UserComponent({ options, verified }: Readonly<IUserProps>) {
  const router = useRouter()
  const optionStyle =
    'hover:text-secondary hover:bg-gray-100 px-4 py-2 dark:text-accent  dark:hover:text-complementary dark:hover:bg-secondary'

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  const logout = useStore(state => state.logout)

  const handleLogout = async () => {
    await logout()
    if (window.location.pathname === '/profile') {  
      router.push('/')
    }
  }
  
  return verified ? (
    <Menu
      as='div'
      className='relative flex'>
      {({ open }) => (
        <>
          <Menu.Button>
            {open ? (
              <XMarkIcon
                className='block h-6 w-6 m-2'
                aria-hidden='true'
              />
            ) : (
              <UserIcon className='h-10 w-10' />
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
              className={`absolute right-4 mt-8 w-56 origin-top-right rounded-md bg-white 
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
                        onClick={handleLogout}>
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
  ) : (
    <TextComponent
      tag={enumTextTags.p}
      sizeFont='s12'
      className='hover:text-secondary dark:text-dark-accent dark:hover:text-dark-complementary'>
      Iniciar sesión
    </TextComponent>
  )
}
