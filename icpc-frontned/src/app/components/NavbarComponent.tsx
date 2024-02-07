'use client'
import { Disclosure } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { TextComponent } from '@/app/components/text/TextComponent'
import { enumTextTags } from '@/constants/types'
import BurgerComponent from './dropdowns/BurgerComponent'
import Link from 'next/link'
import LogoComponent from './LogoComponent'
import UserComponent from './UserComponent'
import useStore from '@/store/useStore'

const routes = [
  {
    id: 1,
    name: 'Inicio',
    href: '/'
  },
  {
    id: 2,
    name: 'Apuntes',
    href: '/notelist'
  },
  {
    id: 3,
    name: 'Ejercicios',
    href: '/exercises'
  },
  {
    id: 4,
    name: 'Noticias',
    href: '/newslist'
  },
  {
    id: 5,
    name: 'Acerca de nosotros',
    href: '/about'
  }
]


export default function NavbarComponent() {

// se puede usar el hook useStore para verificar si el usuario está logueado
const verified = useStore(state => state.token !== null);

  return (
    <Disclosure
      as='nav'
      className='bg-white dark:bg-dark-primary shadow fixed top-0 w-full z-50'>
      <div className='mx-auto max-w-7xl px-2 sm:px-4 lg:px-8'>
        <div className='flex h-16 justify-between'>
          <div className='flex px-2 lg:px-0'>
            <div className='flex flex-shrink-0 items-center'>
              <Link href='/'>
                <LogoComponent size={40} />
              </Link>
            </div>
            <div className='hidden items-center lg:ml-6 lg:flex lg:space-x-8'>
              {routes.map(route => (
                <Link
                  href={route.href}
                  key={route.id}
                  className='hover:text-secondary dark:text-dark-accent dark:hover:text-dark-complementary'>
                  <TextComponent
                    tag={enumTextTags.p}
                    sizeFont='s14'
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
                  className='w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-black ring-1 ring-inset ring-gray-300 focus:ring-indigo-600'
                  placeholder='Search'
                  type='search'
                />
              </div>
            </div>
          </div>
          <div className='flex items-center lg:hidden'>
            {/* Mobile menu button */}
            <BurgerComponent
              options={routes}
              verified={verified}
            />
          </div>
          <div className='hidden lg:ml-4 lg:flex lg:items-center'>
            {/* Profile dropdown */}
            <Link
              href={verified ? '#' : '/login'}
              className='hover:text-base-accent dark:text-dark-accent dark:hover:text-complementary'>
              <UserComponent options={routes} verified={verified} />
            </Link>
          </div>
        </div>
      </div>
    </Disclosure>
  )
}
