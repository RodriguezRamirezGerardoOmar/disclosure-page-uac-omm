'use client'
import { Menu, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import React, { Fragment } from 'react'

interface IThreeDotComponentProps {
  id: string
  itemType: string
  handleEdit: (id: string, itemType: string) => void
  handleDelete: (id: string, itemType: string) => void
}

const ThreeDotComponent = (props: Readonly<IThreeDotComponentProps>) => {
  const [ open, setOpen ] = React.useState(false)
  return (
    <Menu
      as='div'
      className='relative inline-block text-left mx-3 my-3'>
      <EllipsisVerticalIcon onClick={() => setOpen(!open)} className='block h-6 w-6' />
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
        show={open}>
        <MenuItems
          className={`absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white 
                  dark:bg-primary shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10`}>
          <div className='py-1 grid grid-cols-1'>
            <MenuItem >
              <button className='hover:bg-secondary flex px-4 py-1' onClick={() => props.handleEdit(props.id, props.itemType)}>Editar</button>
            </MenuItem>
            <MenuItem>
              <button className='hover:bg-red-600 flex px-4 py-1' onClick={() => props.handleDelete(props.id, props.itemType)}>Eliminar</button>
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  )
}

export default ThreeDotComponent
