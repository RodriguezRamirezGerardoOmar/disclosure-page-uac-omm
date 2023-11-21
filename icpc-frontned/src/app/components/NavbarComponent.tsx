'use client'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon, UserIcon } from '@heroicons/react/20/solid'
import { TextComponent } from './TextComponent'
import { enumTextSizes, enumTextTags } from '@/constants/types'
import BurgerComponent from './dropdowns/BurgerComponent'
import Link from 'next/link'
import LogoComponent from './LogoComponent'
import UserComponent from './UserComponent'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const routes = [
  {
    id: 1,
    name: 'Inicio',
    href: '#'
  },
  {
    id: 2,
    name: 'Iniciar sesión',
    href: '#'
  },
  {
    id: 3,
    name: 'Apuntes',
    href: '#'
  },
  {
    id: 4,
    name: 'Ejercicios',
    href: '#'
  },
  {
    id: 5,
    name: 'Noticias',
    href: '#'
  },
  {
    id: 6,
    name: 'Acerca de nosotros',
    href: '#'
  }
]

export default function NavbarComponent() {
  return (
    <Disclosure
      as='nav'
      className='bg-white dark:bg-primary shadow fixed top-0 w-full'>
      {({ open }) => (
        <div className='mx-auto max-w-7xl px-2 sm:px-4 lg:px-8'>
          <div className='flex h-16 justify-between'>
            <div className='flex px-2 lg:px-0'>
              <div className='flex flex-shrink-0 items-center'>
                <LogoComponent size={40} />
              </div>
              <div className='hidden items-center lg:ml-6 lg:flex lg:space-x-8'>
                {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                {routes.map(route => (
                  <Link
                    href={route.href}
                    key={route.id}
                    className='hover:text-accent dark:text-accent dark:hover:text-complementary'>
                    <TextComponent
                      tag={enumTextTags.p}
                      sizeFont={enumTextSizes.s12}
                      className='flex items-center border-b-2 border-transparent px-1 pt-1'>
                      {route.name}
                    </TextComponent>
                  </Link>
                ))}
              </div>
            </div>
            <div className='flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end'>
              <div className='w-full max-w-lg lg:max-w-xs'>
                <label
                  htmlFor='search'
                  className='sr-only'>
                  Search
                </label>
                <div className='relative'>
                  <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                    <MagnifyingGlassIcon
                      className='h-5 w-5 text-gray-400'
                      aria-hidden='true'
                    />
                  </div>
                  <input
                    id='search'
                    name='search'
                    className='block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    placeholder='Search'
                    type='search'
                  />
                </div>
              </div>
            </div>
            <div className='flex items-center lg:hidden'>
              {/* Mobile menu button */}
              <BurgerComponent options={routes} />
            </div>
            <div className='hidden lg:ml-4 lg:flex lg:items-center'>
              {/* Profile dropdown */}
              <Link
                href={'#'}
                className='hover:text-accent dark:text-accent dark:hover:text-complementary'>
                <UserComponent verified={true} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </Disclosure>
  )
}