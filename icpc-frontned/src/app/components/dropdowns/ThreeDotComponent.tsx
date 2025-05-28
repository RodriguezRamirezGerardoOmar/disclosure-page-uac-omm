'use client'
import { Menu, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import React, { Fragment, useState } from 'react'
import DisplayReportComponent from '../cards/DisplayReportComponent'

interface Option {
  name: string
  action: (id: string, itemType: string, href?: string) => void
  style: string
  href?: string
}

interface IThreeDotComponentProps {
  id: string
  itemType: string
  options: Option[]
}

/*
Input: id (item identifier), itemType (type of item), options (array of menu options with actions, styles, and optional href)
Output: a three-dot dropdown menu with clickable options for the given item
Return value: a component used to display a contextual menu for actions on an item
Function: renders a three-dot menu button that toggles a dropdown with options, each option triggers its action and closes the menu
Variables: id, itemType, options, open, setOpen, openReportModal, setOpenReportModal
Date: 28 - 05 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

const ThreeDotComponent = (props: Readonly<IThreeDotComponentProps>) => {
  const [open, setOpen] = useState(false)
  const [openReportModal, setOpenReportModal] = useState(false)

  return props.options ? (
    <div>
      <Menu
        as='div'
        className='relative inline-block text-left mx-3 my-3'>
        <EllipsisVerticalIcon
          onClick={() => {
            setOpen(!open)
          }}
          className='block h-6 w-6'
        />
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
          show={open}>
          {/* Condition: If open is true, the dropdown menu with options is displayed */}
          <MenuItems
            onMouseLeave={() => setOpen(false)}
            className={`absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white 
                  dark:bg-primary shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10`}>
            <div className='py-1 grid grid-cols-1'>
              {props.options.map(option => (
                <MenuItem
                  key={option.name}
                  as='div'
                  className={option.style}>
                  <button
                    onClick={() => {
                      option.action(props.id, props.itemType, option.href)
                      setOpen(false)
                    }}
                    className='text-left w-full h-full px-4 py-1'>
                    {option.name}
                  </button>
                </MenuItem>
              ))}
            </div>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  ) : (
    <></>
  )
}

export default ThreeDotComponent
