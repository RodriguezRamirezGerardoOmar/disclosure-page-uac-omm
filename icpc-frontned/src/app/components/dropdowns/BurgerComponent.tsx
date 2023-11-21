'use client'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid'
import { TextComponent } from '../TextComponent'
import { enumTextSizes, enumTextTags } from '@/constants/types'
import Link from 'next/link'

interface IDropdownProps {
  options: {
    id: number
    name: string
    href: string
  }[]
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function BurgerComponent({ options }: Readonly<IDropdownProps>) {
  return (
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
              <Bars3Icon
                className='block h-6 w-6'
                aria-hidden='true'
              />
            )}
          </Menu.Button>
          {open && (
            <div>
              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'>
                <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-primary shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                  <div className='py-1 grid grid-cols-1'>
                    {options.map(option => (
                      <Menu.Item key={option.id}>
                        {({ active }) => (
                          <Link
                            href={option.href}
                            className='hover:text-secondary hover:bg-gray-100 px-2 py-2 dark:text-accent  dark:hover:text-complementary dark:hover:bg-secondary'>
                            <TextComponent
                              sizeFont={enumTextSizes.s12}
                              tag={enumTextTags.p}
                              className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'flex py-3')}>
                              {option.name}
                            </TextComponent>
                          </Link>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </div>
          )}
        </>
      )}
    </Menu>
  )
}
