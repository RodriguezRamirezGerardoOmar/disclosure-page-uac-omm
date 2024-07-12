import { useState } from 'react'

/*
Input: a list of strings that define CSS classes
Output: a single string of Tailwind CSS
Return value: a string with the CSS classes
Function: joins multiple strings into a single string
Variables: classes
Date: 21 - 03 - 2024
Author: Gerardo Omar Rodriguez Ramirez
*/

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

/*
Input: a list of tabs with icon, href, name and a boolean to identify the currently selected tab
Output: a set of tabs to select different sections of a page
Return value: a set of tab buttons as a component
Function: creates a set of tab buttons to navigate through different sections of a page
Variables: icon, href, name, current
Date: 11 - 04 - 2024
Author: Gerardo Omar Rodriguez Ramirez
*/

// Update type annotation of the 'tabs' parameter
export default function TabComponent({
  tabs, handleChange
}: Readonly<{
  readonly tabs: ReadonlyArray<{
    icon: any
    href: string | undefined
    name: string
    current?: boolean
  }>, handleChange: (tabName: string) => void
}>) {
  const [activeTab, setActiveTab] = useState(tabs.find(tab => tab.current)?.name)

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName)
  }

  return (
    <div>
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
          {tabs.map(tab => (
            <option
              key={tab.name}
              value={tab.name}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>
      <div className='hidden sm:block'>
        <div className='border-b border-gray-200'>
          <nav
            className='-mb-px flex space-x-8'
            aria-label='Tabs'>
            {tabs.map(tab => (
              <a
                key={tab.name}
                href={tab.href}
                className={classNames(
                  tab.name === activeTab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium'
                )}
                onClick={e => {
                  e.preventDefault()
                  handleTabChange(tab.name)
                  handleChange(tab.name)
                }}
                aria-current={tab.name === activeTab ? 'page' : undefined}>
                <tab.icon
                  className={classNames(
                    tab.name === activeTab ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500',
                    '-ml-0.5 mr-2 h-5 w-5'
                  )}
                  aria-hidden='true'
                />
                <span>{tab.name}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
